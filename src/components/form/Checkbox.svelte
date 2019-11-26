<div>
  <input
    name={id}
    id={id}
    type="checkbox"
    bind:checked={value}
    on:change={handleChange}
  />
  <label for={id}>
    {#if value}
      <svg
        transition:fade|local={{duration:300}}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
      >
        <path fill="#FFF" fill-rule="evenodd" d="M5 10l9-10 2 2L5 14 0 9l2-2z"/>
      </svg>
    {/if}
    {label}
  </label>
</div>

<style>
  div {
    align-items: center;
    display: flex;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    position: relative;
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
  export let value
  export let handleChange = () => {}
</script>