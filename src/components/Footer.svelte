<footer data-segment={segment}>
  <div class="inner">
    <h2>Browse by issue:</h2>
    <nav>
      {#each categories as category (category.handle)}
        <a href={`/${category.handle}`} rel="prefetch">{category.title}</a>
      {/each}
    </nav>
    <p>
      Politicians are notorious for saying one thing and then doing another.
      This site compiles voting records of MPs in the House of Commons to make 
      it easier to understand how political parties vote in practice.
    </p>
    <p>
      All data on this site is taken from
      <a href="http://www.data.parliament.uk" target="_blank" rel="noopener">data.parliament.uk</a>.
      You can
      <a href="https://github.com/colinmeinke/theyvoteforyou" target="_blank" rel="noopener">view the full source code</a>
      on Github.
      No cookies are used on this site.
    </p>
  </div>
</footer>

<style>
  footer {
    background-color: hsl(0,0%,9%);
    display: flex;
    justify-content: center;
    padding-bottom: calc(var(--baseline) * 2);
    padding-top: calc(var(--baseline) * 2);
  }

  .inner {
    --maxWidth: calc(12 * (var(--column) + var(--gutter)) + var(--gutter));
    display: flex;
    flex-direction: column;
    max-width: var(--maxWidth);
    padding-left: var(--gutter);
    padding-right: var(--gutter);
    width: 100%;
  }

  h2 {
    color: hsl(0,0%,70%);
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-2px);
  }

  nav {
    --maxWidth: calc(4 * (var(--column) + var(--gutter)));
    display: grid;
    grid-column-gap: var(--gutter);
    grid-template-columns: auto auto auto;
    max-width: var(--maxWidth);
  }

  @media screen and (min-width: 550px) {
    nav {
      grid-template-columns: auto auto auto auto auto;
    }
  }

  @media screen and (min-width: 1000px) {
    nav {
      grid-template-columns: auto auto auto auto auto auto auto auto;
    }
  }

  nav a {
    color: hsl(0,0%,90%);
    font-size: var(--fontSizeSmall);
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    white-space: nowrap;
  }

  a {
    transition: all 0.3s ease-in-out;
  }

  p {
    color: hsl(0,0%,70%);
    font-size: var(--fontSizeSmall);
    margin-bottom: calc(var(--baseline) * 0.5);
    margin-top: calc(var(--baseline) * 1.5);
    max-width: 1000px;
    opacity: 0.8;
  }

  p + p {
    margin-top: calc(var(--baseline) * 0.5);
  }

  p a {
    color: inherit;
    font-weight: bold;
  }

  a:hover,
  a:focus {
    color: var(--selectedColor) !important;
  }
</style>

<script>
  export let categories
  export let segment
</script>