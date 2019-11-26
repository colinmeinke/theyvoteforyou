<p>
  <span class="icon">😍</span> <strong>{good}</strong>
  <span class="icon margin">☠️</span> <strong>{bad}</strong>
</p>

<style>
  .margin {
    margin-left: var(--gutter);
  }

  .icon {
    display: inline-flex;
    margin-bottom: calc(var(--baseline) * -1);
    margin-top: calc(var(--baseline) * -1);
    transform: translateY(2px);
  }

  strong {
    padding-left: calc(var(--gutter) * 0.25);
  }
</style>

<script>
  export let good = ''
  export let bad = ''
</script>