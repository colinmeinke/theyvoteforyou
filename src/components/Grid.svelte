<ul>
  <slot></slot>
</ul>

<style>
  ul {
    display: grid;
    grid-auto-rows: 1fr;
    grid-column-gap: var(--gutter);
    grid-row-gap: calc(var(--baseline) * 2);
    grid-template-columns: 1fr;
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
  }

  @media screen and (min-width: 550px) {
    ul {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (min-width: 1400px) {
    ul {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>