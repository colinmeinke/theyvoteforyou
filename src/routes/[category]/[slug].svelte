<svelte:head>
  <title>{selectedCategory.divisionTitle} | {selectedCategory.title}</title>
  <meta name="description" content="{description}" />
  <link
    rel="canonical"
    href={`https://theyvoteforyou.uk/${selectedCategory.handle}/${slug}`}
  />
</svelte:head>

<div in:fade={{delay:300, duration:300}} out:fade={{duration:300}}>
  <form class="settings" on:submit|preventDefault>
    <Settings breakpoint={1000}>
      <CheckboxGroup
        id="parties"
        label="Select parties to compare:"
        options={partyOptions}
        selectedOptions={selectedParties}
        handleChange={handlePartyChange}
      />

      <Checkbox
        id="currentParties"
        label="Show results based on MPs current party?"
        bind:value={currentParties}
        handleChange={() => {mpRepaint = !mpRepaint; partyRepaint = !partyRepaint}}
      />

      <Checkbox
        id="currentMps"
        label="Only show current MPs?"
        bind:value={currentMps}
        handleChange={() => {partyRepaint = !partyRepaint}}
      />

      <Checkbox
        id="breakdown"
        label="Show exact breakdown?"
        bind:value={breakdown}
      />

      <Select
        id="resultFormat"
        label="Select result format:"
        options={resultFormatOptions}
        bind:value={resultFormat}
        handleChange={() => {partyRepaint = !partyRepaint}}
      />

      <Select
        id="orderBy"
        label="Order by:"
        options={orderByOptions}
        bind:value={orderBy}
      />
    </Settings>
  </form>

  <div class="main">
    <DivisionDetailHeader
      title={selectedCategory.divisionTitle}
      {description}
      link="https://www.publicwhip.org.uk/division.php?date={division.date}&number={division.number}"
      date={division.date}
      outcome={division.outcome}
      desiredOutcome={selectedCategory.desiredOutcome}
      categories={division.categories}
      selectedCategory={selectedCategory}
    />

    <section>
      <DivisionPartiesHeader />

      <Grid>
        {#each filteredParties as {party, yes, no, abstained, didNotVote, other, desiredOutcome, undesiredOutcome} (party)}
          <li
            class="flex"
            in:receive|local={{key: party}}
            out:send|local={{key: party}}
            animate:flip={{duration: 300}}
          >
            <Card category={party} repaint={partyRepaint}>
              <h3 slot="title">{party}</h3>
              <div slot="content">
                {#if breakdown}
                  <DivisionPartyBreakdown items={{
                    [yes.title]: `${round(yes[resultFormat])}${suffix}`,
                    [no.title]: `${round(no[resultFormat])}${suffix}`,
                    [abstained.title]: `${round(abstained[resultFormat])}${suffix}`,
                    [didNotVote.title]: `${round(didNotVote[resultFormat])}${suffix}`,
                    [other.title]: `${round(other[resultFormat])}${suffix}`,
                  }} />
                {:else}
                  <PartyOutcome
                    good={`${round(desiredOutcome[resultFormat])}${suffix}`}
                    bad={`${round(undesiredOutcome[resultFormat])}${suffix}`}
                  />
                {/if}
              </div>
            </Card>
          </li>
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
        {#each filteredMps as {id, name, vote, party, constituency} (id)}
          <li class="flex">
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
          </li>
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
      padding-bottom: calc(var(--baseline) * 6);
    }
  }

  .main {
    flex-basis: 0;
    flex-grow: 999999;
    min-width: calc(100% / 3 * 2);
    padding-bottom: calc(var(--baseline) * 6);
    padding-left: calc(var(--gutter) / 2);
    padding-right: calc(var(--gutter) / 2);
  }

  .flex {
    display: flex;
  }
</style>

<script context="module">
  export async function preload({params: {category, slug}}) {
    try {
      const [date] = slug.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)
      const [number] = slug.substr(11).match(/^[0-9]+/)
      const res = await this.fetch(`data/divisions/${date}-${number}.json`)
      const division = await res.json()

      if (!division.categories.map(({handle}) => handle).includes(category)) {
        throw new Error(`Division ${date} ${number} does not include category "${category}"`)
      }

      return {category, slug, division}
    } catch (err) {
      this.error(404, 'Not found')
    }
  }
</script>

<script>
  import {fade} from 'svelte/transition'
  import {flip} from 'svelte/animate'
  import {
    orderParties,
    getMpsFromVotes,
    getPartiesFromMps,
    round,
    switchItems
  } from '../../helpers'
  import Card from '../../components/Card.svelte'
  import Grid from '../../components/Grid.svelte'
  import PartyOutcome from '../../components/PartyOutcome.svelte'
  import DivisionDetailHeader from '../../components/division/DetailHeader.svelte'
  import DivisionPartiesHeader from '../../components/division/PartiesHeader.svelte'
  import DivisionPartyBreakdown from '../../components/division/PartyBreakdown.svelte'
  import DivisionMpsHeader from '../../components/division/MpsHeader.svelte'
  import DivisionMp from '../../components/division/Mp.svelte'
  import Settings from '../../components/form/Settings.svelte'
  import Checkbox from '../../components/form/Checkbox.svelte'
  import CheckboxGroup from '../../components/form/CheckboxGroup.svelte'
  import Select from '../../components/form/Select.svelte'

  export let category
  export let slug
  export let division

  const [send, receive] = switchItems()
  const resultFormatOptions = ['Percentage', 'Vote Count']
  const orderByOptions = ['Highest Percentage', 'Highest Vote Count', 'A-Z']
  const mpsFilterByOptions = ['All', 'Yes', 'No', 'Abstained', 'Did Not Vote']
  const selectedCategory = division.categories.find(({handle}) => handle === category)
  const description = `Which parties voted to ${selectedCategory.divisionTitle.charAt(0).toLowerCase()}${selectedCategory.divisionTitle.slice(1)}?`
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
  $: partyOptions = partiesAZ.map(party => ({value: party, title: party}))
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

  const handlePartyChange = e => {
    if (e.target.checked) {
      selectedParties = [...selectedParties, e.target.value]
    } else {
      selectedParties = selectedParties.filter(v => v !== e.target.value)
    }

    mpRepaint = !mpRepaint
  }
</script>