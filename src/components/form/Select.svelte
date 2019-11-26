<div>
  <label for={id}>{label}</label>
  <select id={id} bind:value={value} on:change={handleChange}>
    {#each options as option}
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
  export let id
  export let label
  export let options = []
  export let value
  export let handleChange = () => {}
</script>