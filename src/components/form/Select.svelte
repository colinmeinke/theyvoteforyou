<div
  in:hide|local={{duration:transitionDuration, easing: cubicOut}}
  out:hide|local={{duration:transitionDuration, easing: cubicIn}}
>
  <label for={id}>{label}</label>
  <select id={id} bind:value={value} on:change={handleChange} {disabled}>
    {#each options as option (option)}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style>
  div {
    display: flex;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  label {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeSmall);
    font-weight: bold;
    margin-top: var(--baseline);
  }

  select {
    background-color: hsl(0,0%,8%);
    flex-grow: 1;
    margin-left: calc(var(--gutter) * 0.5);
    height: calc(var(--baseline) * 4);
    transform: translateX(-2px);
  }
</style>

<script>
  import {hide} from '../../helpers'
  import {cubicOut, cubicIn} from 'svelte/easing'
  import {fade} from 'svelte/transition'

  export let id
  export let label
  export let options = []
  export let value
  export let handleChange = () => {}
  export let disabled = false
  export let transitionDuration = 300
</script>