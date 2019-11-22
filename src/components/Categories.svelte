<ul class:center={center} class:vertical={vertical}>
  <slot></slot>
</ul>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
  }

  .vertical {
    flex-direction: column;
  }

  .center:not(.vertical) {
    justify-content: center;
  }

  .center.vertical {
    align-items: center;
  }
</style>

<script>
  export let center
  export let vertical
</script>