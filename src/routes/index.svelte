<svelte:head>
  <title>They Vote For You</title>
  <meta name="description" content="They want you to vote for them, But do they vote for you?" />
  <link rel="canonical" href={`https://theyvoteforyou.uk`} />
</svelte:head>

<svelte:window on:resize={updateTransitions} />

<div
  class="inner"
  in:fade={{delay: 300, duration: 300}}
  out:fade={{duration: 300}}
  bind:this={containerEl}
  style="--transitionDuration:{transitionDuration / 1000}s; --transitionOutDelay:{transitionOutDelay / 1000}s;"
>
  <form
    class:splash={!comparing}
    class:settings={comparing}
    on:submit|preventDefault={handleSubmit}
    bind:this={asideEl}
  >
    {#if !comparing}
      <h1
        in:titleTransition|local={{
          delay: transitionOutDelay,
          duration: transitionDuration,
          easing: cubicOut,
        }}
        out:titleTransition|local={{
          duration: transitionDuration,
          easing: cubicIn,
        }}
        bind:this={titleEl}
      >
        They want you to vote for them.
        But do <strong>they vote for you?</strong>
      </h1>
    {/if}

    <Settings breakpoint={1000} allowHide={comparing && !transitioning}>
      <CheckboxGroup
        id="categories"
        label="Select the issues that matter to you:"
        options={categoryOptions}
        selectedOptions={selectedCategories}
        handleChange={handleCategoryChange}
        drawAttention={highlightCategorySelect}
        fancy={fancyCheckboxes}
        {transitionDuration}
      />

      {#if comparing}
        <div
          in:hide|local={{
            delay: transitionDuration,
            duration: 300,
            easing: cubicOut,
          }}
          out:hide|local={{duration: 300, easing: cubicIn}}
        >
          <CheckboxGroup
            id="parties"
            label="Select parties to compare:"
            options={partyOptions}
            selectedOptions={selectedParties}
            handleChange={handlePartyChange}
            {transitionDuration}
          />

          <Checkbox
            id="currentParties"
            label="Show results based on MPs current party?"
            bind:value={currentParties}
            handleChange={() => partyRepaint = !partyRepaint}
          />

          <Checkbox
            id="currentMps"
            label="Only show current MPs?"
            bind:value={currentMps}
            handleChange={() => partyRepaint = !partyRepaint}
          />

          <Select
            id="resultFormat"
            label="Select result format:"
            options={resultFormatOptions}
            bind:value={resultFormat}
            handleChange={() => partyRepaint = !partyRepaint}
          />

          <Select
            id="orderBy"
            label="Order by:"
            options={orderByOptions}
            bind:value={orderBy}
            handleChange={() => partyRepaint = !partyRepaint}
          />
        </div>
      {:else}
        <button
          in:hide|local={{
            delay: transitionOutDelay,
            duration: transitionDuration,
            easing: cubicOut,
          }}
          out:hide|local={{duration: transitionDuration, easing: cubicIn}}
          type="submit"
        >
          Compare parties
        </button>
      {/if}
    </Settings>
  </form>

  {#if comparing}
    <div
      class="main"
      in:mainTransition|local={{
        duration: transitionDuration,
        easing: cubicOut,
      }}
      out:mainTransition|local={{
        delay: transitionOutDelay,
        duration: transitionDuration,
        easing: cubicIn,
      }}
      on:introend={updateTransitions}
      on:outroend={updateTransitions}
    >
      <div
        class="content"
        in:contentTransition|local={{
          duration: transitionDuration,
          easing: cubicOut,
        }}
        out:contentTransition|local={{
          delay: transitionOutDelay,
          duration: transitionDuration,
          easing: cubicOut,
        }}
      >
        <section>
          <header class="header">
            <h1 class="title">Overall</h1>

            <p class="best">
              The best
              {#if bestParties.length > 1}parties are{:else}party is{/if}
              {@html bestPartiesString}.
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
            {#each filteredOverallParties as {party, desiredOutcome, undesiredOutcome} (party)}
              <li
                class="flex"
                in:receive|local={{key: party}}
                out:send|local={{key: party}}
                animate:flip={{duration: 300}}
              >
                <Card category={party} repaint={partyRepaint}>
                  <div slot="title">{party}</div>
                  <div slot="content">
                    <PartyOutcome
                      good={`${round(desiredOutcome[resultFormat])}${suffix}`}
                      bad={`${round(undesiredOutcome[resultFormat])}${suffix}`}
                    />
                  </div>
                </Card>
              </li>
            {/each}
          </Grid>
        </section>

        {#each filteredCategoryParties as {handle, title, description, parties} (handle)}
          <section class="gap">
            <CategorySummaryHeader {title} {description} link={`/${handle}`}/>

            <Grid>
              {#each parties as {party, desiredOutcome, undesiredOutcome} (party)}
                <li
                  class="flex"
                  in:receive|local={{key: party}}
                  out:send|local={{key: party}}
                  animate:flip={{duration: 300}}
                >
                  <Card category={party} repaint={partyRepaint}>
                    <h3 slot="title">{party}</h3>
                    <div slot="content">
                      <PartyOutcome
                        good={`${round(desiredOutcome[resultFormat])}${suffix}`}
                        bad={`${round(undesiredOutcome[resultFormat])}${suffix}`}
                      />
                    </div>
                  </Card>
                </li>
              {/each}
            </Grid>
          </section>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .inner {
    flex-grow: 1;
  }

  @media screen and (max-width: 999px) {
    .inner {
      align-items: center;
    }
  }

  @media screen and (min-width: 1000px) {
    .inner {
      justify-content: center;
    }
  }

  form {
    padding-left: calc(var(--gutter) / 2);
    padding-right: calc(var(--gutter) / 2);
    transition: all var(--transitionDuration) ease-in-out;
  }

  @media screen and (min-width: 1000px) {
    form {
      padding-bottom: calc(var(--baseline) * 6);
    }
  }

  .splash {
    --maxWidth: calc(6 * (var(--column) + var(--gutter)));
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: var(--maxWidth);
    padding-bottom: calc(var(--baseline) * 6);
    padding-top: calc(var(--baseline) * 6);
    transition: all calc(var(--transitionDuration) / 2) var(--transitionOutDelay) ease-in-out;
    width: 100%;
  }

  @media screen and (min-width: 1000px) {
    .splash {
      padding-bottom: calc(var(--baseline) * 14);
      padding-top: calc(var(--baseline) * 14);
    }
  }

  .settings {
    flex-basis: 100%;
    flex-grow: 1;
    width: 100%;
  }

  @media screen and (min-width: 1000px) {
    .settings {
      --maxWidth: calc(3 * (var(--column) + var(--gutter)));
      max-width: var(--maxWidth);
    }
  }

  .main {
    flex-grow: 99999;
    padding-bottom: calc(var(--baseline) * 6);
    width: 100%;
  }

  @media screen and (min-width: 1000px) {
    .main {
      --maxWidth: calc(9 * (var(--column) + var(--gutter)));
      max-width: var(--maxWidth);
    }
  }

  .content {
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
    margin-top: calc(var(--baseline) * 2.5);
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

  .flex {
    display: flex;
  }
</style>

<script context="module">
  export async function preload() {
    try {
      const res = await this.fetch(`data/categories.json`)
      const categories = await res.json()

      const expandedCategories = await Promise.all(categories.map(async category => {
        const divisions = await Promise.all(
          category.divisions.map(handle => new Promise(async res => {
            const r = await this.fetch(`data/divisions/${handle}.json`)
            const division = await r.json()
            res(division)
          }))
        )

        return {...category, divisions}
      }))

      return {categories: expandedCategories}
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
    round,
    switchItems,
    hide,
  } from '../helpers'
  import {onMount} from 'svelte'
  import {fade, slide} from 'svelte/transition'
  import {flip} from 'svelte/animate'
  import {cubicIn, cubicOut} from 'svelte/easing'
  import Categories from '../components/Categories.svelte'
  import Category from '../components/Category.svelte'
  import CategorySummaryHeader from '../components/CategorySummaryHeader.svelte'
  import Grid from '../components/Grid.svelte'
  import Card from '../components/Card.svelte'
  import PartyOutcome from '../components/PartyOutcome.svelte'
  import Settings from '../components/form/Settings.svelte'
  import CheckboxGroup from '../components/form/CheckboxGroup.svelte'
  import Checkbox from '../components/form/Checkbox.svelte'
  import Select from '../components/form/Select.svelte'

  export let categories

  const [send, receive] = switchItems()
  const resultFormatOptions = ['Percentage', 'Vote Count']
  const orderByOptions = ['Highest Percentage', 'Highest Vote Count', 'A-Z']
  const categoryOptions = categories.map(({handle, title}) => ({value: handle, title}))
  const transitionDuration = 600
  const transitionOutDelay = 300
  let showTitle = true
  let selectedCategories = []
  let selectedParties = ['Conservatives', 'Labour', 'Liberal Democrats']
  let currentMps = true
  let currentParties = true
  let resultFormat = resultFormatOptions[0]
  let orderBy = orderByOptions[0]
  let categoriesWithOverall = []
  let overallParties = []
  let partiesAZ = []
  let partyOptions = []
  let availableParties = []
  let filteredOverallParties = []
  let highestPercentage = 0
  let bestParties = []
  let bestPartiesString = ''
  let filteredCategoryParties = []
  let settingsChange
  let partyRepaint = false
  let comparing = false
  let highlightCategorySelectInterval
  let highlightCategorySelect = false
  let mainTransition = () => {}
  let contentTransition = () => {}
  let titleTransition = () => {}
  let containerEl
  let asideEl
  let titleEl
  let splashWidth = 0
  let titleHeight = 0
  let titleWidth = 0
  let transitioning = false
  let fancyCheckboxes = true

  $: suffix = resultFormat === 'Percentage' ? '%' : ''
  $: filteredCategories = categories.filter(({handle}) => selectedCategories.includes(handle))

  $: categoriesWithOverall = filteredCategories.map(({divisions, ...category}) => {
    const ds = divisions.map(({handle, title, date, categories, outcome, votes}) => {
      const {desiredOutcome} = categories.find(({handle}) => category.handle)
      const mps = getMpsFromVotes(votes, currentMps, currentParties)
      const parties = getPartiesFromMps(mps, desiredOutcome)
      return {handle, title, date, desiredOutcome, outcome, parties}
    })

    const parties = orderParties(getPartiesFromDivisions(ds), orderBy)

    return {...category, parties}
  })

  $: overallParties = Object.entries(categoriesWithOverall.reduce((parties, category) => {
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

    return parties
  }, {})).map(([party, props]) => ({party, ...props}))

  $: partiesAZ = Array.from(new Set(overallParties.map(({party}) => party))).sort()
  $: partyOptions = partiesAZ.map(party => ({value: party, title: party}))
  $: availableParties = partiesAZ.filter(party => selectedParties.includes(party))

  $: filteredOverallParties = orderParties(overallParties.filter(({party}) => (
    availableParties.includes(party)
  )), orderBy)

  $: highestPercentage = filteredOverallParties.reduce((highest, {desiredOutcome}) => (
    desiredOutcome['Percentage'] > highest ? desiredOutcome['Percentage'] : highest
  ), 0)

  $: bestParties = filteredOverallParties
    .filter(({desiredOutcome}) => desiredOutcome['Percentage'] > highestPercentage - 10)
    .map(({party}) => party)

  $: bestPartiesString = bestParties.reduce((string, party, i) => (
    `${string}${i === 0 ? '' : `${i === bestParties.length - 1 ? ' and ' : ', '}`}<strong>${party}</strong>`
  ), '')

  $: filteredCategoryParties = categoriesWithOverall.map(({title, handle, description, parties}) => ({
    title,
    handle,
    description,
    parties: orderParties(parties.filter(({party}) => availableParties.includes(party)), orderBy)
  }))

  const handleCategoryChange = e => {
    if (e.target.checked) {
      selectedCategories = [...selectedCategories, e.target.value]
    } else {
      selectedCategories = selectedCategories.filter(v => v !== e.target.value)
    }

    if (!selectedCategories.length && comparing) {
      transitioning = true
      comparing = false
      window.setTimeout(() => transitioning = false, transitionDuration)
      window.setTimeout(() => fancyCheckboxes = true, transitionOutDelay)
    }

    partyRepaint = !partyRepaint
  }

  const handlePartyChange = e => {
    if (e.target.checked) {
      selectedParties = [...selectedParties, e.target.value]
    } else {
      selectedParties = selectedParties.filter(v => v !== e.target.value)
    }
  }

  const handleSubmit = () => {
    window.clearInterval(highlightCategorySelectInterval)

    if (selectedCategories.length) {
      highlightCategorySelect = false
      transitioning = true
      fancyCheckboxes = false
      comparing = true
      window.setTimeout(() => transitioning = false, transitionDuration)
    } else {
      highlightCategorySelect = true

      highlightCategorySelectInterval = window.setInterval(() => {
        highlightCategorySelect = false
      }, 3000);
    }
  }

  const createMainTransition = easing => {
    const largeScreen = window.innerWidth >= 1000

    return (node, {delay = 0, duration = 300, easing = cubicOut}) => {
      const style = getComputedStyle(node)
      const height = parseFloat(style.height)
      const width = parseFloat(style.width)

      return {
        delay,
        duration,
        css: t => `
          width: ${width * (largeScreen ? easing(t) : 1)}px;
          max-width: ${width * (largeScreen ? easing(t) : 1)}px;
          height: ${height * easing(t)}px;
        `
      }
    }
  }

  const createTitleTransition = () => {
    const width = window.innerWidth >= 1000
      ? titleWidth
      : parseFloat(getComputedStyle(containerEl).width)

    return (node, {delay = 0, duration = 300, easing = cubicOut}) => {
      const transform = getComputedStyle(node).transform

      return {
        delay,
        duration,
        css: t => `
          opacity: ${easing(t)};
          height: ${titleHeight * easing(t)}px;
          transform: ${transform} scale(${easing(t)});
          transform-origin: left;
          overflow: hidden;
          width: ${width}px;
        `
      }
    }
  }

  const createContentTransition = () => {
    const viewportWidth = window.innerWidth
    const containerWidth = parseFloat(getComputedStyle(containerEl).width)
    const offset = viewportWidth >= 1000
      ? (containerWidth - (Math.min(splashWidth, containerWidth))) / 2
      : 0
    const width = viewportWidth >= 1000
      ? containerWidth - 360
      : containerWidth

    return (node, {delay = 0, duration = 300, easing = cubicOut}) => ({
      delay,
      duration,
      css: t => `
        opacity: ${easing(t)};
        width: ${width}px;
        transform: translateX(${offset - offset * easing(t)}px);
      `
    })
  }

  const updateTransitions = () => {
    if (!comparing) {
      splashWidth = parseFloat(getComputedStyle(asideEl).width)
      titleHeight = parseFloat(getComputedStyle(titleEl).height)
      titleWidth = parseFloat(getComputedStyle(titleEl).width)
    }

    mainTransition = createMainTransition()
    contentTransition = createContentTransition()
    titleTransition = createTitleTransition()
  }

  onMount(updateTransitions)
</script>