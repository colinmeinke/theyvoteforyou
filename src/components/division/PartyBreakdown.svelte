{#each Object.keys(items) as key (key)}
  <p>{key} <strong>{items[key]}</strong></p>
{/each}

<style>
  strong {
    padding-left: calc(var(--gutter) * 0.25);
  }
</style>

<script>
  export let items = {}
</script>