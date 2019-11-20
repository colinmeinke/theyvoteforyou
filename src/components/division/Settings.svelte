<svelte:window on:resize={() => !userPressedButton && updateShow()} />

<aside>
  <button
    type="button"
    on:click={() => {userPressedButton = true; show = !show}}
  >
    {`${show ? 'Hide' : 'Show'} Settings`}
  </button>

  {#if show}
    <form transition:slide|local>
      <div transition:fade|local class="a">
        <h2>Select parties to compare:</h2>

        {#each parties as party}
          <div>
            <input
              type="checkbox"
              id={`party${party.replace(' ', '')}`}
              value={party}
              checked={selectedParties.includes(party)}
              on:change={handlePartyUpdate}
            />
            <label for={`party${party.replace(' ', '')}`}>{party}</label>
          </div>
        {/each}
      </div>

      <div transition:fade|local class="b">
        <input
          id="currentParties"
          type="checkbox"
          bind:checked={currentParties}
          on:change={handleCurrentPartiesChange}
        />
        <label for="currentParties">Show results based on MPs current party?</label>
      </div>

      <div transition:fade|local class="c">
        <input
          id="currentMps"
          type="checkbox"
          bind:checked={currentMps}
          on:change="{handleCurrentMpsChange}"
        />
        <label for="currentMps">Only show current MPs?</label>
      </div>

      <div transition:fade|local class="d">
        <input id="breakdown" type="checkbox" bind:checked={breakdown} />
        <label for="breakdown">Show exact breakdown?</label>
      </div>

      <div transition:fade|local class="e">
        <label for="resultFormat">Select result format:</label>
        <select
          id="resultFormat"
          bind:value={resultFormat}
          on:change={handleResultFormatChange}
        >
          {#each resultFormatOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </div>

      <div transition:fade|local class="f">
        <label for="orderBy">Order by:</label>
        <select id="orderBy" bind:value={orderBy}>
          {#each orderByOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </div>
    </form>
  {/if}
</aside>

<style>
  aside {
    padding-top: calc(var(--baseline) * 1);
    position: sticky;
    top: 0;
  }

  @media screen and (min-width: 1000px) {
    aside {
      padding-top: calc(var(--baseline) * 2);
    }
  }

  div {
    display: flex;
  }

  .a {
    border-bottom: 1px solid hsla(0,0%,100%,0.2);
    flex-direction: column;
    padding-bottom: calc(var(--baseline) * 1.5 - 1px);
    padding-top: calc(var(--baseline) * 1);
  }

  @media screen and (min-width: 1000px) {
    .a {
      padding-top: calc(var(--baseline) * 2);
    }
  }

  .a div {
    align-items: center;
    display: flex;
  }

  .b,
  .c,
  .d {
    align-items: center;
    display: flex;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  .b {
    padding-top: calc(var(--baseline) * 1.5);
  }

  .e,
  .f {
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  h2 {
    color: hsl(0,0%,100%);
    padding-bottom: calc(var(--baseline) * 1);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  label {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeSmall);
    font-weight: bold;
  }

  input {
    font-size: var(--fontSizeMedium);
    margin: 0;
    margin-right: calc(var(--gutter) * 0.25);
    transform: translateY(-1px);
  }

  input + label {
    padding-left: calc(var(--gutter) * 0.25);
    padding-right: calc(var(--gutter) * 0.25);
  }

  #resultFormat,
  #orderBy {
    flex-grow: 1;
    margin-left: calc(var(--gutter) * 0.5);
  }

  button {
    background-color: hsl(0,0%,8%);
    border: none;
    border-radius: 3px;
    border: 1px solid hsl(0,0%,18%);
    box-shadow: 0 0 1px black;
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeSmall);
    font-weight: bold;
    letter-spacing: 0.025rem;
    line-height: calc(var(--baseline) * 2);
    padding: calc(var(--baseline) * 0.5 - 1px) var(--baseline);
    transition: all 0.3s ease-in-out;
    transform: translateY(-2px) translateX(-1px);
  }

  button:hover,
  button:focus {
    background-color: var(--selectedColor);
    cursor: pointer;
    outline: none;
  }
</style>

<script>
  import {fade, slide} from 'svelte/transition'
  import {onMount} from 'svelte'

  export let breakpoint = 1000
  export let parties = []
  export let selectedParties = []
  export let handlePartyUpdate = () => {}
  export let currentParties = true
  export let handleCurrentPartiesChange = () => {}
  export let currentMps = true
  export let handleCurrentMpsChange = () => {}
  export let breakdown = false
  export let resultFormat = ''
  export let resultFormatOptions = []
  export let handleResultFormatChange = () => {}
  export let orderBy = ''
  export let orderByOptions = []

  let userPressedButton = false
  let show = true

  const updateShow = () => {show = window.innerWidth >= breakpoint}

  onMount(updateShow)
</script>