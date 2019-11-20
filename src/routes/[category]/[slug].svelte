<svelte:head>
  <title>{division.title} | {division.categories[0].title}</title>
  <link
    rel="canonical"
    href={`https://theyvoteforyou.uk/divisions/${division.categories[0].handle}/${slug}`}
  />
</svelte:head>

<div in:fade="{{delay:300}}" out:fade="{{duration:300}}">
  <div class="settings">
    <DivisionSettings
      breakpoint={1000}
      parties={partiesAZ}
      {selectedParties}
      {handlePartyUpdate}
      bind:currentParties={currentParties}
      handleCurrentPartiesChange={() => {mpRepaint = !mpRepaint; partyRepaint = !partyRepaint}}
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
    <DivisionDetailHeader
      title={division.title}
      description={division.description}
      link={division.link}
      date={division.date}
      outcome={division.outcome}
      desiredOutcome={selectedCategory.desiredOutcome}
      categories={division.categories}
      selectedCategory={selectedCategory}
    />

    <section>
      <DivisionPartiesHeader />

      <Grid>
        {#each filteredParties as {party, yes, no, abstained, didNotVote, other, desiredOutcome, undesiredOutcome}}
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

    <section>
      <DivisionMpsHeader
        count={filteredMps.length}
        total={division.votes.length}
        filterByOptions={mpsFilterByOptions}
        handleFilterByChange={() => {mpRepaint = !mpRepaint}}
        bind:filterBy={mpsFilterBy}
      />

      <Grid>
        {#each filteredMps as {id, name, vote, party, constituency}}
          <GridItem>
            <Card category={party} repaint={mpRepaint}>
              <h2 slot="title">{name}</h2>
              <div slot="content">
                <DivisionMp
                  vote={`${['yes', 'no'].includes(vote.handle) ? 'Voted ' : ''}${vote.title}`}
                  good={vote.handle === selectedCategory.desiredOutcome}
                  {party}
                  {constituency}
                />
              </div>
            </Card>
          </GridItem>
        {/each}
      </Grid>
    <section>
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
  }
</style>

<script context="module">
  export async function preload({params: {category, slug}}) {
    try {
      const res = await this.fetch(`data/divisions/${slug}.json`)
      const division = await res.json()

      if (!division.categories.map(({handle}) => handle).includes(category)) {
        throw new Error(`Division "${slug}" does not include category "${category}"`)
      }

      return {category, slug, division}
    } catch (err) {
      this.error(404, 'Not found')
    }
  }
</script>

<script>
  import {orderParties, getMpsFromVotes, getPartiesFromMps} from '../../helpers'
  import Card from '../../components/Card.svelte'
  import Grid from '../../components/Grid.svelte'
  import GridItem from '../../components/GridItem.svelte'
  import DivisionDetailHeader from '../../components/division/DetailHeader.svelte'
  import DivisionSettings from '../../components/division/Settings.svelte'
  import DivisionPartiesHeader from '../../components/division/PartiesHeader.svelte'
  import DivisionPartyBreakdown from '../../components/division/PartyBreakdown.svelte'
  import DivisionPartyOutcome from '../../components/division/PartyOutcome.svelte'
  import DivisionMpsHeader from '../../components/division/MpsHeader.svelte'
  import DivisionMp from '../../components/division/Mp.svelte'
  import {fade} from 'svelte/transition'

  export let category
  export let slug
  export let division

  const resultFormatOptions = ['Percentage', 'Vote Count']
  const orderByOptions = ['Highest Percentage', 'Highest Vote Count', 'A-Z']
  const mpsFilterByOptions = ['All', 'Yes', 'No', 'Abstained', 'Did Not Vote']

  let selectedCategory = division.categories.find(({handle}) => handle === category)
  let selectedParties = ['Conservatives', 'Labour', 'Liberal Democrats']
  let currentParties = true
  let currentMps = true
  let breakdown = false
  let resultFormat = resultFormatOptions[0]
  let orderBy = orderByOptions[0]
  let mpsFilterBy = mpsFilterByOptions[0]

  // Required to force a repaint in Card component
  // due to a rendering bug in Chrome
  let partyRepaint = false
  let mpRepaint = false

  $: suffix = resultFormat === 'Percentage' ? '%' : ''
  $: mps = getMpsFromVotes(division.votes, currentMps, currentParties)
  $: parties = getPartiesFromMps(mps, selectedCategory.desiredOutcome)
  $: partiesAZ = parties.map(({party}) => party).sort()
  $: availableParties = partiesAZ.filter(party => selectedParties.includes(party))

  $: filteredMps = mps
    .filter(({party}) => availableParties.includes(party))
    .filter(({vote}) => mpsFilterBy === 'All' || vote.title === mpsFilterBy)
    .sort((a, b) => {
      const surnameA = a.name.split(' ').pop()
      const surnameB = b.name.split(' ').pop()

      if (surnameA > surnameB) {
        return 1
      }

      return -1
    })

  $: filteredParties = orderParties(
    parties.filter(({party}) => availableParties.includes(party)),
    orderBy,
    selectedCategory.desiredOutcome
  )

  const handlePartyUpdate = e => {
    if (e.target.checked) {
      selectedParties = [...selectedParties, e.target.value]
    } else {
      selectedParties = selectedParties.filter(v => v !== e.target.value)
    }

    mpRepaint = !mpRepaint
  }
</script>