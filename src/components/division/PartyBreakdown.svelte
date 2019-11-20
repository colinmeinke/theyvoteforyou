{#each Object.keys(items) as key}
  <p class="flex"><span>{key}</span> <strong>{items[key]}</strong></p>
{/each}

<style>
  p {
    display: flex;
  }

  p > :not(:first-child) {
    padding-left: calc(var(--gutter) * 0.25);
  }
</style>

<script>
  export let items = {}
</script>