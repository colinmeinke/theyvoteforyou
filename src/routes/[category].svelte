<svelte:head>
  <title>{category.title}</title>
  <meta name="description" content="{category.description}" />
  <link rel="canonical" href={`https://theyvoteforyou.uk/${category.handle}`} />
</svelte:head>

<div in:fade="{{delay:300}}" out:fade="{{duration:300}}">
  <div class="settings">
    <DivisionSettings
      breakpoint={1000}
      parties={partiesAZ}
      {selectedParties}
      {handlePartyUpdate}
      bind:currentParties={currentParties}
      bind:currentMps={currentMps}
      handleCurrentMpsChange={() => {partyRepaint = !partyRepaint}}
      bind:breakdown={breakdown}
      bind:resultFormat={resultFormat}
      resultFormatOptions={resultFormatOptions}
      handleResultFormatChange={() => {partyRepaint = !partyRepaint}}
      orderByOptions={orderByOptions}
      bind:orderBy={orderBy}
    />
  </div>

  <div class="main">
    <header class="header">
      <h1 class="title">{category.title}</h1>
      <p class="description">{category.description}</p>
    </header>

    <section>
      <header class="overview">
        <h2 class="subheader">Overall</h2>
        <p class="best">
          The best
          {#if bestParties.length > 1}parties are{:else}party is{/if}
          {@html bestPartiesString}.
        </p>
        <p class="criteria">
          Based on
          <strong>{#if resultFormat === 'Percentage'}percentage{:else}vote count{/if}</strong>
          calculated from <strong>{divisions.length} votes</strong>.
        </p>
      </header>

      <Grid>
        {#each overallParties as {party, yes, no, abstained, didNotVote, other, desiredOutcome, undesiredOutcome}}
          <GridItem>
            <Card category={party} repaint={partyRepaint}>
              <div slot="title">{party}</div>
              <div slot="content">
                <DivisionPartyOutcome
                  good={`${desiredOutcome[resultFormat]}${suffix}`}
                  bad={`${undesiredOutcome[resultFormat]}${suffix}`}
                />
              </div>
            </Card>
          </GridItem>
        {/each}
      </Grid>
    </section>

    {#each filteredDs as {handle, title, desiredOutcome, outcome, date, parties}}
      <section class="gap">
        <DivisionSummaryHeader
          {title}
          {date}
          {outcome}
          {desiredOutcome}
          link={`/${category.handle}/${handle}`}
        />

        <Grid>
          {#each parties as {party, yes, no, abstained, didNotVote, other, desiredOutcome, undesiredOutcome}}
            <GridItem>
              <Card category={party} repaint={partyRepaint}>
                <h3 slot="title">{party}</h3>
                <div slot="content">
                  {#if breakdown}
                    <DivisionPartyBreakdown items={{
                      [yes.title]: `${yes[resultFormat]}${suffix}`,
                      [no.title]: `${no[resultFormat]}${suffix}`,
                      [abstained.title]: `${abstained[resultFormat]}${suffix}`,
                      [didNotVote.title]: `${didNotVote[resultFormat]}${suffix}`,
                      [other.title]: `${other[resultFormat]}${suffix}`,
                    }} />
                  {:else}
                    <DivisionPartyOutcome
                      good={`${desiredOutcome[resultFormat]}${suffix}`}
                      bad={`${undesiredOutcome[resultFormat]}${suffix}`}
                    />
                  {/if}
                </div>
              </Card>
            </GridItem>
          {/each}
        </Grid>
      </section>
    {/each}
  </div>
</div>

<style>
  .settings {
    padding-left: calc(var(--gutter) / 2);
    padding-right: calc(var(--gutter) / 2);
    width: 100%;
  }

  @media screen and (min-width: 1000px) {
    .settings {
      --maxWidth: calc(3 * (var(--column) + var(--gutter)));
      max-width: var(--maxWidth);
    }
  }

  .main {
    flex-basis: 0;
    flex-grow: 999999;
    min-width: calc(100% / 3 * 2);
    padding-left: calc(var(--gutter) / 2);
    padding-right: calc(var(--gutter) / 2);
    color: white;
  }

  .header {
    color: hsl(0,0%,100%);
    padding-bottom: calc(var(--baseline) * 2);
    padding-top: calc(var(--baseline) * 3);
    position: relative;
  }

  @media screen and (min-width: 1000px) {
    .header {
      padding-top: calc(var(--baseline) * 4);
    }
  }

  .header::after {
    background-color: hsla(0,0%,100%,0.2);
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  .title {
    font-size: var(--fontSizeLarge);
    line-height: calc(var(--baseline) * 4);
    transform: translateY(-2px);
  }

  .description,
  .best {
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  .description {
    padding-bottom: calc(var(--baseline) * 0.5);
  }

  .criteria {
    color: hsl(0,0%,90%);
    font-size: var(--fontSizeSmall);
    padding-bottom: calc(var(--baseline) * 0.5);
  }

  .overview {
    color: hsl(0,0%,100%);
    padding-bottom: calc(var(--baseline) * 1);
    padding-top: calc(var(--baseline) * 2);
  }

  .subheader {
    font-size: var(--fontSizeMedium);
    line-height: calc(var(--baseline) * 4);
    transform: translateY(1px);
  }

  .gap {
    padding-top: calc(var(--baseline) * 5);
  }
</style>

<script context="module">
  export async function preload({params: {category: handle}}) {
    try {
      const res = await this.fetch(`data/categories.json`)
      const categories = await res.json()
      const category = categories.find(c => c.handle === handle)

      if (!category) {
        throw new Error(`No categories with handle "${handle}""`)
      }

      const divisions = await Promise.all(
        category.divisions.map(handle => new Promise(async resolve => {
          const r = await this.fetch(`data/divisions/${handle}.json`)
          const division = await r.json()
          resolve(division)
        }))
      )

      return {category, divisions}
    } catch (err) {
      this.error(404, 'Not found')
    }
  }
</script>

<script>
  import {fade} from 'svelte/transition'
  import {getMpsFromVotes, getPartiesFromMps, getPartiesFromDivisions, orderParties} from '../helpers'
  import Grid from '../components/Grid.svelte'
  import GridItem from '../components/GridItem.svelte'
  import Card from '../components/Card.svelte'
  import DivisionSummaryHeader from '../components/division/SummaryHeader.svelte'
  import DivisionPartyBreakdown from '../components/division/PartyBreakdown.svelte'
  import DivisionPartyOutcome from '../components/division/PartyOutcome.svelte'
  import DivisionSettings from '../components/division/Settings.svelte'

  export let category
  export let divisions

  const resultFormatOptions = ['Percentage', 'Vote Count']
  const orderByOptions = ['Highest Percentage', 'Highest Vote Count', 'A-Z']

  let selectedParties = ['Conservatives', 'Labour', 'Liberal Democrats']
  let currentMps = true
  let currentParties = true
  let resultFormat = resultFormatOptions[0]
  let orderBy = orderByOptions[0]
  let partyRepaint = false
  let breakdown = false

  $: suffix = resultFormat === 'Percentage' ? '%' : ''

  $: ds = divisions.map(({handle, title, date, categories, outcome, votes}) => {
    const {desiredOutcome} = categories.find(({handle}) => category.handle)
    const mps = getMpsFromVotes(votes, currentMps, currentParties)
    const parties = getPartiesFromMps(mps, desiredOutcome)
    return {handle, title, date, desiredOutcome, outcome, parties}
  })

  $: partiesAZ = Array.from(
    new Set(ds
      .map(({parties}) => parties.map(({party}) => party))
      .reduce((acc, x) => acc.concat(x), [])
    )
  ).sort()

  $: availableParties = partiesAZ.filter(party => selectedParties.includes(party))

  $: filteredDs = ds
    .map(d => ({
      ...d,
      parties: orderParties(
        d.parties.filter(({party}) => availableParties.includes(party)),
        orderBy,
        d.desiredOutcome
      ),
    }))
    .sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1
      }

      return 1
    })

  $: overallParties = orderParties(getPartiesFromDivisions(filteredDs), orderBy)

  $: highestPercentage = overallParties.reduce((highest, {desiredOutcome}) => (
    desiredOutcome['Percentage'] > highest ? desiredOutcome['Percentage'] : highest
  ), 0)

  $: highestVoteCount = overallParties.reduce((highest, {desiredOutcome}) => (
    desiredOutcome['Vote Count'] > highest ? desiredOutcome['Vote Count'] : highest
  ), 0)

  $: bestParties = overallParties
    .filter(({desiredOutcome}) => {
      if (resultFormat === 'Percentage') {
        return desiredOutcome['Percentage'] > highestPercentage - 10
      } else {
        return desiredOutcome['Vote Count'] > highestVoteCount - 25
      }
    })
    .map(({party}) => party)

  $: bestPartiesString = bestParties.reduce((string, party, i) => (
    `${string}${i === 0 ? '' : `${i === bestParties.length - 1 ? ' and ' : ', '}`}<strong>${party}</strong>`
  ), '')

  const handlePartyUpdate = e => {
    if (e.target.checked) {
      selectedParties = [...selectedParties, e.target.value]
    } else {
      selectedParties = selectedParties.filter(v => v !== e.target.value)
    }
  }
</script>