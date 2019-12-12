<svelte:window
  on:click={() => searchResults = []}
  on:keydown={(e) => {if (e.key === 'Escape') {searchResults = []}}}
/>

{#if constituency}
  <div
    class="container"
    in:hide|local={{duration: 300, easing: cubicOut}}
    out:hide|local={{duration: 300, easing: cubicIn}}
  >
    <h2 class="label">Show competative parties in:</h2>
    <div class="selected">
      <h3 class="chosen">{constituency.name}</h3>
      <button
        class="clear"
        type="button"
        aria-label="Clear selected constituency"
        on:click={handleClear}
      >
        x
      </button>
    </div>
    <p>
      Based on 2017 election results.
    </p>
  </div>
{:else}
  <div
    class="container"
    in:hide|local={{duration: 300, easing: cubicOut}}
    out:hide|local={{duration: 300, easing: cubicIn}}
  >
    <label class="label" for="constituency">
      Find your constituency (optional)
    </label>

    <div class="wrapper">
      <input
        id="constituency"
        placeholder="Search by postcode or name"
        type="text"
        on:keyup={handleSearch}
      />

      {#if searchResults.length}
        <ul class="results" transition:slide={{duration: 300}}>
          {#each searchResults as result (result.constituency.name)}
            <li animate:flip|local={{duration: 300}}>
              <button
                class="option"
                type="button" 
                on:click={() => {handleUpdate(result.constituency); searchResults = []}}
              >
                {result.constituency.name}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <p>
      Providing your consituency means we will show the parties that are
      competative in your area based on 2017 election results.
    </p>
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    padding-bottom: var(--baseline);
    padding-top: var(--baseline);
  }

  .label {
    color: hsl(0,0%,100%);
    padding-top: calc(var(--baseline) * 0.5);
    padding-bottom: calc(var(--baseline) * 0.5);
  }

  .selected {
    display: flex;
    margin-top: var(--baseline);
  }

  .chosen {
    background-color: hsl(0,0%,0%);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    color: hsl(0,0%,100%);
    font-weight: bold;
    line-height: calc(var(--baseline) * 2);
    padding: calc(var(--baseline) * 0.5) calc(var(--gutter) / 4) calc(var(--baseline) * 0.5) calc(var(--gutter) / 2);
  }

  .clear {
    border: none;
    border-left: 1px solid hsl(0,0%,10%);
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    background-color: hsl(0,0%,0%);
    color: hsl(0,0%,100%);
    font-size: inherit;
    line-height: calc(var(--baseline) * 2);
    margin: 0;
    padding: calc(var(--baseline) * 0.5) calc(var(--gutter) / 2);
    outline: none;
    transition: background-color 0.3s ease-in-out;
  }

  button:hover,
  button:focus {
    background-color: var(--selectedColor);
    cursor: pointer;
  }

  p {
    color: hsl(0,0%,70%);
    font-size: var(--fontSizeSmall);
    margin-bottom: calc(var(--baseline) * 1.5);
    margin-top: calc(var(--baseline) * 1.5);
  }

  input {
    background-color: hsl(0,0%,8%);
    border: none;
    border-radius: 2px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,5%,0.5);
    color: hsl(0,0%,100%);
    font-size: inherit;
    font-family: inherit;
    height: calc(var(--baseline) * 4);
    margin-top: var(--baseline);
    padding-left: calc(var(--gutter));
    padding-right: calc(var(--gutter));
    outline: none;
    width: 100%;
  }

  input:focus {
    background-color: hsl(0,0%,0%);
  }

  ::-webkit-input-placeholder {
   color: hsl(0,0%,70%);
  }

  :-moz-placeholder { /* Firefox 18- */
    color: hsl(0,0%,70%);
  }

  ::-moz-placeholder {  /* Firefox 19+ */
    color: hsl(0,0%,70%);
  }

  :-ms-input-placeholder {  
    color: hsl(0,0%,70%);
  }

  .wrapper {
    position: relative;
    width: 100%;
  }

  ul {
    background-color: hsl(0,0%,100%);
    box-shadow: 2px 2px 2px hsla(0,0%,0%,0.5);
    left: 0;
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1;
  }

  .option {
    background-color: transparent;
    border: none;
    font-size: inherit;
    margin: 0;
    outline: none;
    padding: var(--baseline) var(--gutter);
    text-align: left;
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  li:not(:last-child) .option {
    border-bottom: 1px solid hsl(0,0%,90%);
    padding-bottom: calc(var(--baseline) - 1px);
  }

  .option:hover,
  .option:focus {
    color: hsl(0,0%,100%);
  }
</style>

<script>
  import {flip} from 'svelte/animate'
  import {slide} from 'svelte/transition'
  import {cubicIn, cubicOut} from 'svelte/easing'
  import {hide} from '../../helpers'

  export let constituencies = []
  export let constituency = null
  export let handleClear = () => ({})
  export let handleUpdate = () => ({})

  let searchResults = []
  let searchTimeout

  $: names = constituencies.map(({name}) => name)

  const isPostcodeLike = v => v.match(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/)
  const isNameLike = v => v.match(/^[^0-9]{3,}$/)

  const onsFromPostcode = async (input, scotland = false) => {
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${scotland ? 'scotland/' : ''}${input.replace(/\s/g,'')}`)
      const {result: {codes: {parliamentary_constituency: ons}}} = await res.json()
      return ons
    } catch (err) {
      return !scotland ? onsFromPostcode(input, true) : false
    }
  }

  const matchScore = (target, search) => {
    let score = target.includes(search) ? (search.length / (target.length / 100)) : 0

    if (score > 0 && target.startsWith(search)) {
      score *= 3
    }

    return score
  }

  const handleSearch = e => {
    if (e.key === 'Escape') {
      return
    }

    window.clearTimeout(searchTimeout)

    searchTimeout = window.setTimeout(async () => {
      const value = e.target.value
      const results = []

      if (isPostcodeLike(value)) {
        const ons = await onsFromPostcode(value)

        searchResults = ons
          ? [{
            constituency: constituencies.find(c => c.ons === ons),
            score: 100,
          }]
          : []
      } else if (isNameLike(value)) {
        searchResults = names
          .map((name, i) => [i, matchScore(name.toLowerCase(), value.toLowerCase())])
          .filter(([,score]) => score > 0)
          .map(([i, score]) => ({constituency: constituencies[i], score}))
          .sort((a, b) => a.score > b.score ? -1 : 1)
      } else {
        searchResults = []
      }
    }, 500)
  }
</script>