<svelte:head>
  <title>They Vote For You</title>
  <meta name="description" content="They want you to vote for them, But do they vote for you?" />
  <link rel="canonical" href={`https://theyvoteforyou.uk`} />
</svelte:head>

<div class="inner" in:fade={{delay:300, duration:300}} out:fade={{duration:300}}>
  <form
    class:splash={!comparing}
    class:settings={comparing}
    on:submit|preventDefault={handleSubmit}
  >
    {#if !comparing}
      <h1>
        They want you to vote for them.
        But do <strong>they vote for you?</strong>
      </h1>
    {/if}

    <Settings breakpoint={1000} allowHide={comparing}>
      <CheckboxGroup
        id="categories"
        label="Select the issues that matter to you:"
        options={categoryOptions}
        selectedOptions={selectedCategories}
        handleChange={handleCategoryChange}
        drawAttention={highlightCategorySelect}
        fancy={!comparing}
      />

      {#if comparing}
        {#await partyOptions then options}
          <CheckboxGroup
            id="parties"
            label="Select parties to compare:"
            options={options}
            selectedOptions={selectedParties}
            handleChange={handlePartyChange}
          />
        {/await}

        <Checkbox
          id="currentParties"
          label="Show results based on MPs current party?"
          bind:value={currentParties}
          handleChange={() => {partyRepaint = !partyRepaint}}
        />

        <Checkbox
          id="currentMps"
          label="Only show current MPs?"
          bind:value={currentMps}
          handleChange={() => {partyRepaint = !partyRepaint}}
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
      {/if}

      {#if !comparing}
        <button type="submit">
          Compare parties
        </button>
      {/if}
    </Settings>
  </form>

  {#if comparing}
    <div class="main" in:fly|local={{x:500, duration:300}}>
      {#await filteredOverallParties then parties}
        <section in:fade={{duration:300}}>
          <header class="header">
            <h1 class="title">Overall</h1>

            <p class="best">
              The best
              {#await bestParties then parties}
                {#if parties.length > 1}parties are{:else}party is{/if}
              {/await}
              {#await bestPartiesString then partiesString}
                {@html partiesString}.
              {/await}
            </p>

            <p class="criteria">
              Based on
              <strong>average percentage</strong> from
              <strong>
                {selectedCategories.length}
                issue{#if selectedCategories.length !== 1}s{/if}.
              </strong>
            </p>
          </header>

          <Grid>
            {#each parties as {party, desiredOutcome, undesiredOutcome}}
              <GridItem>
                <Card category={party} repaint={partyRepaint}>
                  <div slot="title">{party}</div>
                  <div slot="content">
                    <PartyOutcome
                      good={`${round(desiredOutcome[resultFormat])}${suffix}`}
                      bad={`${round(undesiredOutcome[resultFormat])}${suffix}`}
                    />
                  </div>
                </Card>
              </GridItem>
            {/each}
          </Grid>
        </section>
      {/await}

      {#await filteredCategories then cats}
        {#each cats as {handle, title, description, parties}}
          <section class="gap" in:fade={{duration:300}}>
            <CategorySummaryHeader {title} {description} link={`/${handle}`}/>

            <Grid>
              {#each parties as {party, desiredOutcome, undesiredOutcome}}
                <GridItem>
                  <Card category={party} repaint={partyRepaint}>
                    <h3 slot="title">{party}</h3>
                    <div slot="content">
                      <PartyOutcome
                        good={`${round(desiredOutcome[resultFormat])}${suffix}`}
                        bad={`${round(undesiredOutcome[resultFormat])}${suffix}`}
                      />
                    </div>
                  </Card>
                </GridItem>
              {/each}
            </Grid>
          </section>
        {/each}
      {/await}
    </div>
  {/if}
</div>

<style>
  .inner {
    flex-grow: 1;
  }

  form {
    padding-left: calc(var(--gutter) / 2);
    padding-right: calc(var(--gutter) / 2);
  }

  .splash {
    --maxWidth: calc(6 * (var(--column) + var(--gutter)));
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    max-width: var(--maxWidth);
    margin-left: auto;
    margin-right: auto;
    padding-top: calc(var(--baseline) * 6);
    text-align: center;
    width: 100%;
  }

  .settings {
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

  .header {
    color: hsl(0,0%,100%);
    padding-bottom: var(--baseline);
    padding-top: calc(var(--baseline) * 3);
    position: relative;
  }

  @media screen and (min-width: 1000px) {
    .header {
      padding-top: calc(var(--baseline) * 4);
    }
  }

  h1 {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeLarge);
    line-height: calc(var(--baseline) * 4);
    transform: translateY(-1px);
  }

  .best {
    color: hsl(0,0%,100%);
    padding-top: calc(var(--baseline) * 0.5);
  }

  .criteria {
    color: hsl(0,0%,90%);
    font-size: var(--fontSizeSmall);
    padding-bottom: calc(var(--baseline) * 0.5);
    transform: translateY(1px);
  }

  @keyframes buttonAnimation {
    0% {
        background-color: hsl(0,90%,40%);
        box-shadow: -1px -1px hsl(0,90%,60%);
        text-shadow: 0px -1px hsl(0,20%,15%);
    }
    25% {
        background-color: hsl(90,90%,40%);
        box-shadow: -1px -1px hsl(90,90%,60%);
        text-shadow: 0px -1px hsl(90,20%,15%);
    }
    50% {
        background-color: hsl(180,90%,40%);
        box-shadow: -1px -1px hsl(180,90%,60%);
        text-shadow: 0px -1px hsl(180,20%,15%);
    }
    75% {
        background-color: hsl(270,90%,40%);
        box-shadow: -1px -1px hsl(270,90%,60%);
        text-shadow: 0px -1px hsl(270,20%,15%);
    }
    100% {
        background-color: hsl(360,90%,40%);
        box-shadow: -1px -1px hsl(360,90%,60%);
        text-shadow: 0px -1px hsl(360,20%,15%);
    }
  }

  button {
    animation: buttonAnimation 15s linear infinite;
    background-color: hsl(0,90%,50%);
    border: none;
    border-radius: 3px;
    box-shadow: -1px -1px hsl(0,90%,60%);
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeDefault);
    font-weight: bold;
    letter-spacing: 0.05rem;
    line-height: calc(var(--baseline) * 2);
    margin-bottom: calc(var(--baseline) * 1.5);
    margin-top: calc(var(--baseline) * 1.5);
    padding: var(--baseline) var(--gutter);
    text-shadow: 0px -1px hsl(0,20%,15%);
    transform: translateX(2px) translateY(-2px);
    transition: all 0.3s ease-in-out;
  }

  button:hover,
  button:focus {
    animation: none;
    background-color: var(--selectedColor);
    box-shadow: -1px -1px hsl(200,90%,70%);
    cursor: pointer;
    outline: none;
    text-shadow: 0px -1px hsl(200,20%,15%);
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
      return {categories}
    } catch (err) {
      this.error(500, err)
    }
  }
</script>

<script>
  import {
    getMpsFromVotes,
    getPartiesFromMps,
    getPartiesFromDivisions,
    orderParties,
    round
  } from '../helpers'
  import {fade, fly, slide} from 'svelte/transition'
  import Categories from '../components/Categories.svelte'
  import Category from '../components/Category.svelte'
  import CategorySummaryHeader from '../components/CategorySummaryHeader.svelte'
  import Grid from '../components/Grid.svelte'
  import GridItem from '../components/GridItem.svelte'
  import Card from '../components/Card.svelte'
  import PartyOutcome from '../components/PartyOutcome.svelte'
  import Settings from '../components/form/Settings.svelte'
  import CheckboxGroup from '../components/form/CheckboxGroup.svelte'
  import Checkbox from '../components/form/Checkbox.svelte'
  import Select from '../components/form/Select.svelte'

  export let categories

  const resultFormatOptions = ['Percentage', 'Vote Count']
  const orderByOptions = ['Highest Percentage', 'Highest Vote Count', 'A-Z']
  const categoryOptions = categories.map(({handle, title}) => ({value: handle, title}))

  let selectedCategories = []
  let selectedParties = ['Conservatives', 'Labour', 'Liberal Democrats']
  let currentMps = true
  let currentParties = true
  let resultFormat = resultFormatOptions[0]
  let orderBy = orderByOptions[0]
  let partyRepaint = false
  let comparing = false
  let highlightCategorySelectInterval
  let highlightCategorySelect = false

  $: suffix = resultFormat === 'Percentage' ? '%' : ''

  const expandCategoryDivisions = category => new Promise(async resolve => {
    const divisions = await Promise.all(
      category.divisions.map(handle => new Promise(async res => {
        const r = await fetch(`data/divisions/${handle}.json`)
        const division = await r.json()
        res(division)
      }))
    )

    resolve({...category, divisions})
  })

  $: categoriesWithExapandedDivisions = Promise.all(categories
    .filter(({handle}) => selectedCategories.includes(handle))
    .map(expandCategoryDivisions)
  )

  $: categoriesWithOverall = categoriesWithExapandedDivisions.then(cats => (
    cats.map(({divisions, ...category}) => {
      const ds = divisions.map(({handle, title, date, categories, outcome, votes}) => {
        const {desiredOutcome} = categories.find(({handle}) => category.handle)
        const mps = getMpsFromVotes(votes, currentMps, currentParties)
        const parties = getPartiesFromMps(mps, desiredOutcome)
        return {handle, title, date, desiredOutcome, outcome, parties}
      })

      const parties = orderParties(getPartiesFromDivisions(ds), orderBy)

      return {...category, parties}
    })
  )).catch(err => err)

  $: overallParties = categoriesWithOverall.then(cats => {
    const parties = {}

    cats.forEach(category => {
      category.parties.forEach(({party, totalCount, desiredOutcome, undesiredOutcome}) => {
        if (!parties[party]) {
          parties[party] = {
            totalCount: 0,
            desiredOutcome: {'Vote Count': 0},
            undesiredOutcome: {'Vote Count': 0},
            categories: [],
          }
        }

        parties[party].totalCount += totalCount
        parties[party].desiredOutcome['Vote Count'] += desiredOutcome['Vote Count']
        parties[party].undesiredOutcome['Vote Count'] += undesiredOutcome['Vote Count']
        parties[party].categories.push({desiredOutcome, undesiredOutcome})

        parties[party].desiredOutcome['Percentage'] =
          parties[party].categories.reduce((percentage, {desiredOutcome}) => (
            percentage += desiredOutcome['Percentage']
          ), 0) / parties[party].categories.length

        parties[party].undesiredOutcome['Percentage'] =
          parties[party].categories.reduce((percentage, {undesiredOutcome}) => (
            percentage += undesiredOutcome['Percentage']
          ), 0) / parties[party].categories.length
      })
    })

    return Object.entries(parties).map(([party, props]) => ({party, ...props}))
  }).catch(err => err)

  $: partiesAZ = overallParties
    .then(parties => Array.from(new Set(parties.map(({party}) => party))).sort())
    .catch(err => err)

  $: partyOptions = partiesAZ
    .then(parties => parties.map(party => ({value: party, title: party})))
    .catch(err => err)

  $: availableParties = partiesAZ
    .then(parties => parties.filter(party => selectedParties.includes(party)))
    .catch(err => err)

  $: filteredOverallParties = Promise.all([overallParties, availableParties])
    .then(([overall, available]) => (
      orderParties(
        overall.filter(({party}) => available.includes(party)),
        orderBy
      )
    ))
    .catch(err => err)

  $: highestPercentage = filteredOverallParties.then(parties => (
    parties.reduce((highest, {desiredOutcome}) => (
      desiredOutcome['Percentage'] > highest ? desiredOutcome['Percentage'] : highest
    ), 0)
  ))

  $: bestParties = Promise.all([filteredOverallParties, highestPercentage])
    .then(([parties, highest]) => (
      parties.filter(({desiredOutcome}) => {
        return desiredOutcome['Percentage'] > highest - 10
      })
      .map(({party}) => party)
    ))

  $: bestPartiesString = bestParties.then(parties => (
    parties.reduce((string, party, i) => (
      `${string}${i === 0 ? '' : `${i === parties.length - 1 ? ' and ' : ', '}`}<strong>${party}</strong>`
    ), '')
  ))

  $: filteredCategories = Promise.all([categoriesWithOverall, availableParties])
    .then(([categories, available]) => categories.map(({title, handle, description, parties}) => ({
      title,
      handle,
      description,
      parties: orderParties(
        parties.filter(({party}) => available.includes(party)),
        orderBy
      )
    })))
    .catch(err => err)

  const handleCategoryChange = e => {
    if (e.target.checked) {
      selectedCategories = [...selectedCategories, e.target.value]
    } else {
      selectedCategories = selectedCategories.filter(v => v !== e.target.value)
    }

    if (!selectedCategories.length) {
      comparing = false
    }
  }

  const handlePartyChange = e => {
    if (e.target.checked) {
      selectedParties = [...selectedParties, e.target.value]
    } else {
      selectedParties = selectedParties.filter(v => v !== e.target.value)
    }

    partyRepaint = !partyRepaint
  }

  const handleSubmit = () => {
    window.clearInterval(highlightCategorySelectInterval)

    if (selectedCategories.length) {
      highlightCategorySelect = false
      comparing = true
    } else {
      highlightCategorySelect = true

      highlightCategorySelectInterval = window.setInterval(() => {
        highlightCategorySelect = false
      }, 3000);
    }
  }
</script>