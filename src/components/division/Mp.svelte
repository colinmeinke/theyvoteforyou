<div>
  <p class="vote">
    <span class="icon">{#if good}😍{:else}☠️{/if}</span>
    <strong>{vote}</strong>
  </p>

  <p>
    {party}{#if constituency}, {constituency}{/if}
  </p>
</div>

<style>
  .vote {
    margin-bottom: var(--baseline);
  }

  .icon {
    display: inline-flex;
    margin-bottom: calc(var(--baseline) * -1);
    margin-top: calc(var(--baseline) * -1);
    transform: translateY(2px);
  }

  strong {
    padding-left: calc(var(--gutter) * 0.25);
    text-transform: uppercase;
  }
</style>

<script>
  export let vote
  export let good
  export let party
  export let constituency
</script>