<fieldset class:fancy>
  <legend class:drawAttention>{label}</legend>

  <div class="list">
    {#each options as option}
      <div class="item">
        <input
          type="checkbox"
          name={`${id}${option.value.replace(/ /g, '')}`}
          id={`${id}${option.value.replace(/ /g, '')}`}
          value={option.value}
          checked={selectedOptions.includes(option.value)}
          on:change={handleChange}
        />

        <label for={`${id}${option.value.replace(/ /g, '')}`}>
          {#if selectedOptions.includes(option.value)}
            <svg
              transition:fade|local={{duration:300}}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
            >
              <path fill="#FFF" fill-rule="evenodd" d="M5 10l9-10 2 2L5 14 0 9l2-2z"/>
            </svg>
          {/if}
          {option.title}
        </label>
      </div>
    {/each}
  </div>
</fieldset>

<style>
  fieldset {
    border: none;
    border-bottom: 1px solid hsla(0,0%,100%,0.2);
    display: flex;
    flex-direction: column;
    margin: 0;
    min-inline-size: 0;
    margin: var(--baseline) 0 var(--baseline);
    padding: 0;
    padding-bottom: calc(var(--baseline) * 1.5 - 1px);
  }

  @media screen and (min-width: 1000px) {
    fieldset {
      margin-top: calc(var(--baseline) * 2);
    }
  }

  legend {
    color: hsl(0,0%,100%);
    padding: calc(var(--baseline) * 0.5) 0 0;
    transform: translateY(-1px);
  }

  @keyframes jumpLegend {
    0% { transform: translateY(0); }
    20% { transform: translateY(-0.8rem); }
    40% { transform: translateY(0.4rem); }
    60% { transform: translateY(-0.2rem); }
    80% { transform: translateY(0); }
  }

  .drawAttention {
    animation: jumpLegend 1.5s ease-in-out 2;
  }

  .fancy {
    border-bottom: none;
    padding-bottom: calc(var(--baseline) * 1.5);
  }

  .fancy legend {
    margin-left: auto;
    margin-right: auto;
  }

  .fancy .list {
    display: grid;
    grid-column-gap: var(--gutter);
    grid-template-columns: 1fr 1fr;
    margin-top: var(--baseline);
    text-align: left;
  }

  @media screen and (min-width: 550px) {
    .fancy .list {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media screen and (min-width: 1000px) {
    .fancy {
      margin-top: var(--baseline);
    }

    .fancy .list {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  .item {
    display: flex;
    margin-top: var(--baseline);
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    margin: 0;
  }

  label {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeSmall);
    font-weight: bold;
    margin-left: calc(var(--baseline) * 2 + var(--gutter) * 0.25);
    padding-left: calc(var(--gutter) * 0.25);
    padding-right: calc(var(--gutter) * 0.25);
    position: relative;
    transform: translateY(1px);
  }

  label::before {
    content: '';
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  label::before {
    background-color: hsl(0,0%,8%);
    border-radius: 2px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,5%,0), 1px 1px 0 hsl(0,0%,0%,0.5);
    height: calc(var(--baseline) * 2);
    left: calc(var(--gutter) * -0.25 - var(--baseline) * 2);
    top: 0;
    transform: translateX(2px);
    width: calc(var(--baseline) * 2);
  }

  input:not(:checked) + label::before {
    box-shadow: inset 2px 2px 2px hsla(0,0%,5%,0.5), 1px 1px 0 hsl(0,0%,0%,0);
  }

  input:focus + label::before,
  input:hover + label::before {
    background-color: var(--selectedColor);
  }

  input:not(:checked):focus + label::before,
  input:not(:checked):hover + label::before {
    box-shadow: inset 2px 2px 2px hsla(200,80%,30%,0.5), 1px 1px 0 hsl(0,0%,0%,0);
  }

  input:checked:focus + label::before,
  input:checked:hover + label::before {
    box-shadow: inset 2px 2px 2px hsla(200,80%,30%,0), 1px 1px 0 hsl(0,0%,0%,0.5);
  }

  svg {
    position: absolute;
    left: calc((var(--gutter) * 0.25 + var(--baseline) * 2) * -1 + 2px + ((var(--baseline) * 2 - 16px) / 2));
    top: calc((var(--baseline) * 2 - 14px) / 2);
  }
</style>

<script>
  import {fade} from 'svelte/transition'
  export let id
  export let label
  export let options = []
  export let selectedOptions = []
  export let handleChange = () => {}
  export let drawAttention = false
  export let fancy = false
</script>