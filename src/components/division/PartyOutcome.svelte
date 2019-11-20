<div>
  <p><span class="icon">😍</span> <strong>{good}</strong></p>
  <p><span class="icon">☠️</span> <strong>{bad}</strong></p>
</div>

<style>
  div,
  p {
    display: flex;
  }

  p:last-child {
    margin-left: var(--gutter);
  }

  p > :not(:first-child) {
    padding-left: calc(var(--gutter) * 0.25);
  }
</style>

<script>
  export let good = ''
  export let bad = ''
</script>