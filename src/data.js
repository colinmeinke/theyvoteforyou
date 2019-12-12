const fetch = require('node-fetch')
const parser = require('xml2json')
const {promises: fs} = require('fs')
const rimrafSync = require('rimraf')
const path = require('path')
const {promisify} = require('util')
const categoriesConfig = require('./config/categories')
const divisionsConfig = require('./config/divisions')
const rimraf = promisify(rimrafSync)
const xlsx = require('node-xlsx').default

const {
  normaliseConstituency,
  normaliseParty,
  normaliseName,
  normaliseVoteType,
  getPartyKey,
  partyNames,
  voteTypes,
} = require('./helpers')

const outputDir = path.join(__dirname, '..', 'static/data')
const divisionsDir = path.join(outputDir, 'divisions')

const rm = async dir => await rimraf(dir)

const request = async (url, type = 'json', timeout = 15000) => {
  console.log(`|    Requesting data from ${url}\n`)
  const t = setTimeout(() => {
    throw new Error(`${url} did not resolve after ${timeout / 1000} seconds.`)
  }, timeout)

  const response = await fetch(url)
  console.log(`|    Response received from ${url}\n`)
  clearTimeout(t)
  return await response[type]()
}

const normaliseConstituencies = ({items}, electionResults) => items
  .filter(({endedDate}) => !endedDate)
  .map(({label: {_value: name}, _about: url, gssCode: ons}) => ({
    id: parseInt(url.split('/').pop(), 10),
    ons,
    name,
    results: electionResults[ons],
  }))

const getConstituencies = async () => {
  const electionResults = getElectionResults()

  let constituencies = []
  let page = 0
  let next = true

  while (next) {
    const url = `http://lda.data.parliament.uk/constituencies.json?_pageSize=500${page ? `&_page=${page}` : ''}`
    const { result } = await request(url)
    constituencies = [...constituencies, ...normaliseConstituencies(result, electionResults)]
    next = !!result.next
    if (next) page++
  }

  return constituencies
}

const normaliseCommonsMembers = ({items}) => items.map(({
  _about: url,
  fullName: {_value: fullName},
  givenName: {_value: firstName},
  familyName: {_value: lastName},
  party: {_value: party},
  constituency: {_about: constituencyUrl}
}) => {
  const n1 = normaliseName(fullName)
  const n2 = normaliseName(`${firstName} ${lastName}`)
  const names = [n1]

  if (n1 !== n2) names.push(n2)

  return {
    id: parseInt(url.split('/').pop()),
    names: names.filter(n => n.includes(' ')),
    party: getPartyKey(normaliseParty(party)),
    constituency: parseInt(constituencyUrl.split('/').pop(), 10),
  }
})

const getCommonsMembers = async () => {
  let mps = []
  let page = 0
  let next = true

  while (next) {
    const url = `http://lda.data.parliament.uk/commonsmembers.json?_pageSize=500${page ? `&_page=${page}` : ''}`
    const { result } = await request(url)
    mps = [...mps, ...normaliseCommonsMembers(result)]
    next = !!result.next
    if (next) page++
  }

  return mps
}

const normaliseMembersData = ({Members: {Member: members}}) => {
  const activeMemberDate = new Date('2019-11-06T00:00:00')

  return members.map(({
    Member_Id: id,
    DisplayAs: displayName,
    Party:{$t: party},
    HouseEndDate: endDate,
    CurrentStatus: {IsActive: isActive},
    BasicDetails: {GivenForename: firstName, GivenSurname: lastName},
    House: house,
  }) => {
    const n1 = normaliseName(displayName)
    const n2 = normaliseName(`${firstName} ${lastName}`)
    const names = [n1]

    if (n1 !== n2) names.push(n2)

    return {
      id: parseInt(id, 10),
      names: names.filter(n => n.includes(' ')),
      party: getPartyKey(normaliseParty(party)),
      active: (isActive === 'True' || !endDate || new Date(endDate) >= activeMemberDate) && house.toLowerCase() === 'commons',
    }
  })
}

const getMembersData = async () => {
  const result = await request('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/House=Commons|Membership=All/BasicDetails', 'text')
  const json = JSON.parse(parser.toJson(result))
  const mps = normaliseMembersData(json)
  return mps
}

const mergeMps = (data1, data2) => data1.map(a => {
  const b = data2.find(b => a.id === b.id)
  return {...a, ...b}
})

const normaliseVote = (id, party, type, mps) => {
  const mp = mps.find(mp => mp.id === id)

  if (!mp) {
    console.error(`Could not find MP: ${id}`)
  }

  return {
    id,
    active: mp.active,
    constituency: mp.constituency,
    party: {
      current: normaliseParty(partyNames[mp.party]),
      atVote: normaliseParty(party),
    },
    type: normaliseVoteType(type),
  }
}

const mergeDuplicatesWhereVotedBoth = (mps, mp) => {
  const i = mps.findIndex(({id}) => id === mp.id)

  if (
    i !== -1 &&
    (
      (voteTypes[mps[i].type].handle === 'yes' && voteTypes[mp.type].handle === 'no') ||
      (voteTypes[mps[i].type].handle === 'no' && voteTypes[mp.type].handle === 'yes')
    )
  ) {
    mps[i].type = voteTypes.findIndex(({handle}) => handle === 'abstained')
  } else {
    mps.push(mp)
  }

  return mps
}

const mergeDuplicateSpeakerAndDeputies = (mps, mp) => {
  const i = mps.findIndex(({id}) => id === mp.id)

  if (i !== -1) {
    const insertedMpMarkedAsSpeakerOrDeputy = mps[i].party.atVote.includes('Speaker')
    const currentMpMarkedAsSpeakerOrDeputy = mp.party.atVote.includes('Speaker')

    if (insertedMpMarkedAsSpeakerOrDeputy || currentMpMarkedAsSpeakerOrDeputy) {
      if (currentMpMarkedAsSpeakerOrDeputy) {
        mps[i].party.atVote = mp.party.atVote
      }
    } else {
      console.log('---DUPLICATE---')
      console.log(mps[i])
      console.log(mp)
    }
  } else {
    mps.push(mp)
  }

  return mps
}

const normaliseVotes = (votes, mps) => votes.map(({
  member,
  memberPrinted: printedName,
  memberParty: party,
  type,
}) => {
  if (Array.isArray(printedName)) {
    const ids = member.map(({_about}) => parseInt(_about.split('/').pop(), 10))

    return printedName.map(({_value: name}, i) => {
      const p = Array.isArray(party) ? party[i] : party
      return normaliseVote(ids[i], p, type, mps)
    })
  } else {
    const id = parseInt(member[0]._about.split('/').pop(), 10)
    const {_value: name} = printedName

    return normaliseVote(id, party, type, mps)
  }
})
  .reduce((acc, x) => acc.concat(x), [])
  .reduce(mergeDuplicatesWhereVotedBoth, [])
  .reduce(mergeDuplicateSpeakerAndDeputies, [])
  .filter(({party, type}) => !party.atVote.includes('Speaker') || voteTypes[type].handle !== 'didNotVote')
  .map(({party, ...vote}) => ({
    ...vote,
    party: {current: getPartyKey(party.current), atVote: getPartyKey(party.atVote)},
  }))

const minimiseVotes = votes => votes.map(({id, party, constituency, active, type}) => ({
  id,
  p: [party.current, party.atVote],
  c: constituency,
  a: active,
  v: type,
}))
  
const normaliseDivision = ({
  AbstainCount: [{_value: abstain}],
  AyesCount: [{_value: yes}],
  Didnotvotecount: [{_value: didNotVote}],
  Errorvotecount: [{_value: error}],
  Noesvotecount: [{_value: no}],
  Noneligiblecount: [{_value: nonEligible}],
  Suspendedorexpelledvotescount: [{_value: suspendedOrExpelled}],
  Margin: [{_value: marginStr}],
  vote: votes,
}, mps) => {
  const margin = parseInt(marginStr, 10)

  const count = {
    yes: parseInt(yes, 10),
    no: parseInt(no, 10),
    abstained: parseInt(abstain, 10),
    didNotVote: parseInt(didNotVote, 10),
    nonEligible: parseInt(nonEligible, 10),
    suspendedOrExpelled: parseInt(suspendedOrExpelled, 10),
    error: parseInt(error, 10),
  }

  const outcome = margin > 0
    ? count.yes > count.no ? 'yes' : 'no'
    : 'tied'

  return {
    outcome,
    votes: minimiseVotes(normaliseVotes(votes, mps)),
  }
}

const getDivisions = async (divisions, mps) => (
  await Promise.all(divisions.map(async division => {
    const {result: {primaryTopic: result}} = await request(`http://lda.data.parliament.uk/commonsdivisions/${division.id}.json`)

    return {
      id: division.id,
      date: division.date,
      number: division.number,
      ...normaliseDivision(result, mps),
      categories: division.categories
        .map(category => ({
          divisionTitle: category.title,
          ...category,
          ...categoriesConfig.find(c => c.handle === category.handle),
        })),
    }
  }))
)

const sortVotes = (a, b) => {
  if (a.count > b.count) {
    return -1
  }

  return 1
}

const getElectionResults = () => {
  const data = xlsx.parse(`${__dirname}/data/election-2017.xls`)

  const totals = data
    .filter(({name}) => name === 'Administrative data')
    .map(({data}) => data)
    .reduce((acc, x) => acc.concat(x), [])
    .filter(([col1]) => !['RESULTS', 'ADMINISTRATIVE DATA'].includes(col1))
    .map(([ons,,,,total]) => ({ons, total}))
    .reduce((constituencies, {ons, total}) => {
      constituencies[ons] = total
      return constituencies
    }, {})

  const results = data
    .filter(({name}) => name === 'Results')
    .map(({data}) => data)
    .reduce((acc, x) => acc.concat(x), [])
    .filter(([col1]) => !['RESULTS', 'ONS Code'].includes(col1))
    .map(([ons,,,,,, party, count]) => ({ons, party: normaliseParty(party), count}))
    .filter(({party}) => partyNames.includes(party))
    .reduce((constituencies, {ons, party, count}) => {
      if (!constituencies[ons]) {
        constituencies[ons] = {total: totals[ons], votes: []}
      }

      constituencies[ons].votes = [...constituencies[ons].votes, {party, count}]
      constituencies[ons].votes.sort(sortVotes)

      return constituencies
    }, {})

  return results
}

;(async () => {
  try {
    const [membersData, commonsMembers] = await Promise.all([
      getMembersData(),
      getCommonsMembers(),
      rm(outputDir),
    ])

    await fs.mkdir(outputDir, {mode: 0744})
    await fs.mkdir(path.join(divisionsDir), {mode: 0744})

    const mps = mergeMps(membersData, commonsMembers)
      .map(({names, ...mp}) => ({...mp, name: names[0]}))

    await fs.writeFile(path.join(outputDir, 'mps.json'), JSON.stringify(mps))

    const constituencies = await getConstituencies()

    await fs.writeFile(path.join(outputDir, 'constituencies.json'), JSON.stringify(constituencies))

    const divisions = await getDivisions(divisionsConfig, mps)

    await Promise.all(divisions.map(async division => (
      await fs.writeFile(
        path.join(divisionsDir, `${division.date}-${division.number}.json`),
        JSON.stringify(division)
      )
    )))

    const categories = categoriesConfig.map(category => ({
      ...category,
      divisions: divisionsConfig
        .filter(division => division.categories.find(cat => cat.handle === category.handle))
        .map(division => [division.date, division.number]),
    }))

    await fs.writeFile(
      path.join(outputDir, 'categories.json'),
      JSON.stringify(categories)
    )
  } catch (err) {
    console.error(err)
  }
})()
