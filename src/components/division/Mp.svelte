<div>
  <p>
    <strong>{vote}</strong>
    <span class="icon">{#if good}😍{:else}☠️{/if}</span>
  </p>

  <p class="details">
    {party}{#if constituency}, {constituency}{/if}
  </p>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
  }

  p:first-child {
    display: flex;
    margin-bottom: var(--baseline);
  }

  p:first-child > :not(:first-child) {
    padding-left: calc(var(--gutter) * 0.25);
  }

  strong {
    text-transform: uppercase;
  }

  p:last-child {
    margin-top: auto;
  }
</style>

<script>
  export let vote
  export let good
  export let party
  export let constituency
</script>