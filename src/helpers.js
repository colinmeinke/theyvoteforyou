const formatDate = date => { 
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}

const filterIgnoredParties = party => {
  const ignore = [
    /speaker/,
    /speaker\'s deputy/,
    /non-affiliated/,
    /crossbench/,
  ]

  const p = party.toLowerCase()

  return !ignore.find(rgx => p.match(rgx))
}

const normaliseConstituency = constituency => {
  if (constituency === 'Life peer') {
    return null
  }

  const c = constituency.replace(' & ', ' and ')

  switch (c) {
    case 'North Luton':
      return 'Luton North'
    default:
      return c
  }
}

const normaliseParty = party => {
  switch (party) {
    case 'Labour (Co-op)':
    case 'Independent Labour':
      return 'Labour'
    case 'Liberal Democrat':
      return 'Liberal Democrats'
    case 'Conservative':
    case 'Independent Conservative':
      return 'Conservatives'
    case 'The Independent Group for Change':
      return 'Independent Group for Change'
    case 'Green':
      return 'Green Party'
    case 'Democratic Unionist':
    case 'Democratic Unionist Party':
      return 'DUP'
    case 'Scottish National':
    case 'Scottish National Party':
      return 'SNP'
    case 'UK Independence':
    case 'UK Independence Party':
      return 'UKIP'
    case 'Ulster Unionist Party':
      return 'UUP'
    case 'Social Democratic & Labour Party':
      return 'SDLP'
    case 'Speaker of the House of Commons':
      return 'Speaker'
    case 'Chairman of Ways and Means':
    case 'First Deputy Chairman of Ways and Means':
    case 'Second Deputy Chairman of Ways and Means':
      return 'Speaker\'s deputy'
    default:
      return party
  }
}

const normaliseName = name => {
  const n = name && name
    .replace(
      /\(|\)|Mr |Ms |Mrs |Miss |Sir |Dr |Dame |Lord |Baroness |Baron | Junior|of .+/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim()

  switch (n) {
    case ('Nigel Vaz'):
      return 'Keith Vaz'
    case ('Arthur Soames'):
      return 'Nicholas Soames'
    case ('Jeremy Ashdown'):
      return 'Paddy Ashdown'
    case ('Chinyelu Onwurah'):
      return 'Chi Onwurah'
    case ('Nick Dakin'):
      return 'Nic Dakin'
    case ('Dave Watts'):
      return 'David Watts'
    case ('Margaret Coffey'):
      return 'Ann Coffey'
    case ('Chris Pincher'):
      return 'Christopher Pincher'
    case ('Nicholas Herbert'):
      return 'Nick Herbert'
    case ('Micael Dugher'):
      return 'Michael Dugher'
    case ('Robert McCrea'):
      return 'William McCrea'
    case ('Ronald Campbell'):
      return 'Ronnie Campbell'
    case ('Walter Campbell'):
      return 'Menzies Campbell'
    case ('Calum MacDonald Domhnallach'):
      return 'Calum Domhnallach'
    case ('David T. C. Davies'):
      return 'David Davies'
    default:
      return n
  }
}

const normaliseVoteType = type => {
  switch (type.split('#').pop()) {
    case 'AyeVote':
      return {
        handle: 'yes',
        title: 'Yes',
      }
    case 'NoVote':
      return {
        handle: 'no',
        title: 'No',
      }
    case 'Abstains':
      return {
        handle: 'abstained',
        title: 'Abstained',
      }
    case 'DidNotVote':
      return {
        handle: 'didNotVote',
        title: 'Did Not Vote',
      }
    default:
      console.log('----OTHER VOTE TYPE----', type)

      return {
        handle: 'other',
        title: 'Other',
      }
  }
}

const getMpsFromVotes = (votes, currentMps = true, currentParties = true) => votes
  .filter(({current, house}) => !currentMps || current && house === 'commons')
  .map(({id, names, party, constituency, current, type: vote}) => ({
    id,
    name: names[0],
    party: party[currentParties ? 'current' : 'atVote'],
    constituency,
    vote,
  }))

const initialVoteCount = JSON.stringify({
  totalCount: 0,
  yes: {title: 'Yes', 'Vote Count': 0},
  no: {title: 'No', 'Vote Count': 0},
  abstained: {title: 'Abstained', 'Vote Count': 0},
  didNotVote: {title: 'Did Not Vote', 'Vote Count': 0},
  other: {title: 'Other', 'Vote Count': 0},
})

const getPartiesFromMps = (mps, desiredOutcome) => Object.entries(mps.reduce((parties, {party, vote, good}) => {
  if (!parties[party]) {
    parties[party] = {...JSON.parse(initialVoteCount)}
  }

  parties[party][vote.handle]['Vote Count']++
  parties[party].totalCount++

  Object.keys(parties[party]).forEach(handle => {
    if (handle !== 'totalCount') {
      parties[party][handle]['Percentage'] = (parties[party][handle]['Vote Count'] / parties[party].totalCount) * 100
    }
  })

  parties[party].desiredOutcome = {...parties[party][desiredOutcome]}

  parties[party].undesiredOutcome = {
    'Vote Count': parties[party].totalCount - parties[party].desiredOutcome['Vote Count'],
    'Percentage': 100 - parties[party].desiredOutcome['Percentage'],
  }

  return parties
}, {}))
  .map(([party, props]) => ({party, ...props}))
  .filter(({party}) => filterIgnoredParties(party))

const getPartiesFromDivisions = divisions => {
  const parties = {}

  divisions.forEach(division => {
    division.parties.forEach(({party, totalCount, desiredOutcome, undesiredOutcome}) => {
      if (!parties[party]) {
        parties[party] = {
          totalCount: 0,
          desiredOutcome: {'Vote Count': 0},
          undesiredOutcome: {'Vote Count': 0},
        }
      }

      parties[party].totalCount += totalCount
      parties[party].desiredOutcome['Vote Count'] += desiredOutcome['Vote Count']
      parties[party].undesiredOutcome['Vote Count'] += undesiredOutcome['Vote Count']

      Object.keys(parties[party]).forEach(handle => {
        if (handle !== 'totalCount') {
          parties[party][handle]['Percentage'] = (parties[party][handle]['Vote Count'] / parties[party].totalCount) * 100
        }
      })
    })
  })

  return Object.entries(parties).map(([party, props]) => ({party, ...props}))
}

const orderParties = (parties, orderBy, desiredOutcome = 'desiredOutcome') => parties.sort((a, b) => {
  if (orderBy === 'Highest Percentage') {
    if (b[desiredOutcome]['Percentage'] > a[desiredOutcome]['Percentage']) {
      return 1
    } else if (b[desiredOutcome]['Percentage'] < a[desiredOutcome]['Percentage']) {
      return -1
    }
  }

  if (orderBy === 'Highest Vote Count') {
    if (b[desiredOutcome]['Vote Count'] > a[desiredOutcome]['Vote Count']) {
      return 1
    } else if (b[desiredOutcome]['Vote Count'] < a[desiredOutcome]['Vote Count']) {
      return -1
    }
  }

  if (a.party > b.party) {
    return 1
  }

  return -1
})

const round = n => n.toFixed(1).replace('.0', '')

module.exports = {
  orderParties,
  formatDate,
  normaliseConstituency,
  normaliseParty,
  normaliseName,
  normaliseVoteType,
  getMpsFromVotes,
  getPartiesFromMps,
  getPartiesFromDivisions,
  round,
}