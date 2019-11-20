<Header />

<main class="a">
  <div class="b">
    <slot></slot>
  </div>
</main>

<Footer />

{#if showLayout}
  <BaselineGrid />
{/if}

<style>
  :global(:root) {
    --baseline: 0.75rem;
    --column: calc(var(--baseline) * 8);
    --gutter: var(--baseline);
    --fontSizeSmall: 80%;
    --fontSizeMedium: 150%;
    --fontSizeLarge: 200%;
    --fontColorDark: hsl(220,20%,0%);
    --fontColorMedium: hsl(220,20%,15%);
    --fontColorLight: hsl(220,20%,35%);
    --selectedColor: hsl(200,80%,50%);
  }

  @media only screen and (min-width: 1000px) {
    :global(:root) {
      --gutter: calc(var(--baseline) * 2);
    }
  }

  @font-face {
    font-display: fallback;
    font-family: 'Source Sans Pro';
    font-weight: normal;
    src: url('/fonts/SourceSansPro-Light.otf.woff2') format('woff2');
  }

  @font-face {
    font-display: fallback;
    font-family: 'Source Sans Pro';
    font-weight: bold;
    src: url('/fonts/SourceSansPro-Semibold.otf.woff2') format('woff2');
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    background-color: hsl(0,0%,10%);
    color: hsl(220,20%,15%);
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 110%;
    font-weight: normal;
    letter-spacing: 0.025rem;
    line-height: calc(var(--baseline) * 2);
    margin: 0;
    position: relative;
  }

  :global(strong) {
    font-weight: bold;
  }

  :global(p,h1,h2,h3) {
    margin-bottom: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-top: 0;
  }

  :global(h1,h2,h3,select,input) {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  :global(#app) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  :global(#app > *) {
    width: 100%;
  }

  :global(select) {
    font-family: inherit;
    background-color: hsl(0,0%,15%);
    border-color: hsl(0,0%,0%);
    color: hsl(0,0%,100%);
  }

  :global(select:focus), :global(input:focus) {
    outline-color: var(--selectedColor);
  }

  :global(input + label) {
    transition: background-color 0.3s ease-in-out;
  }

  :global(input:focus + label) {
    background-color: var(--selectedColor);
  }

  :global(option:checked) {
    background-color: var(--selectedColor) !important;
  }
  
  
  .a {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  .b {
    --maxWidth: calc(12 * (var(--column) + var(--gutter)) + var(--gutter));
    display: flex;
    max-width: var(--maxWidth);
    flex-direction: column;
    flex-grow: 1;
    padding-left: calc(var(--gutter) / 2);
    padding-right: calc(var(--gutter) / 2);
    width: 100%;
  }

  .b > :global(div) {
    display: flex;
    width: 100%;
  }

  @media screen and (max-width: 999px) {
    .b > :global(div) {
      flex-direction: column;
    }
  }

  :global(.underline) {
    position: relative;
  }

  :global(.underline::after) {
    content: '';
    left: 0;
    right: 0;
    top: calc(100% + 2px);
    height: 2px;
    background: hsl(0,0%,100%);
    position: absolute;
  }

  :global(.icon) {
    color: hsl(0,0%,100%);
    font-size: calc(var(--baseline) * 2);
  }
</style>

<script>
  import BaselineGrid from '../components/BaselineGrid.svelte'
  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'
  import {onMount} from 'svelte'
  import {fade} from 'svelte/transition'

  let controlDown = false
  let showLayout = false

  onMount(() => {
    window.addEventListener('keydown', e => {
      if (e.key === 'Control') {
        controlDown = true
      } else if (controlDown && e.key === 'l') {
        showLayout = !showLayout
      }
    })

    window.addEventListener('keyup', e => {
      if (e.key === 'Control') {
        controlDown = false
      }
    })
  })
</script>