<header>
  <div class="a">
    <h2>
      <a href={link}>{title}</a>
    </h2>
    <p>{formattedDate}</p>
  </div>

  <div class="b">
    <p>
      <span class="icon">😍</span>
      <span><span class="underline">Desired</span> outcome:</span>
      <strong>{desiredOutcome} vote</strong>
    </p>

    <p>
      <span class="icon">
        {#if desiredOutcome === outcome}
          😍
        {:else}
          ☠️
        {/if}
      </span>
      <span><span class="underline">Actual</span> outcome:</span>
      <strong>
        {outcome}
        {#if outcome !== 'tied'}vote{/if}
      </strong>
    </p>
  </div>
</header>

<style>
  header {
    color: hsl(0,0%,100%);
    padding-bottom: calc(var(--baseline) * 2);
    padding-top: calc(var(--baseline) * 3);
    position: relative;
  }

  @media screen and (min-width: 1000px) {
    header {
      padding-top: calc(var(--baseline) * 4);
    }
  }

  .a {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .a p {
    flex-grow: 1;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  .b {
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  .b p {
    color: hsl(0,0%,100%);
  }

  h2 {
    flex-basis: 0;
    flex-grow: 999999;
    font-size: var(--fontSizeMedium);
    line-height: calc(var(--baseline) * 4);
    min-width: 80%;
    padding-right: calc(var(--gutter) * 1);
    transform: translateY(1px);
  }

  a {
    color: hsl(0,0%,100%);
    outline: none;
  }

  a:focus {
    background-color: var(--selectedColor);
  }

  .b {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  .b > p {
    display: flex;
    flex-wrap: wrap;
    padding-top: var(--baseline);
    transform: translateY(-1px);
  }

  .b > p > *:not(:first-child) {
    margin-left: calc(var(--gutter) * 0.25);
  }

  .b > p:first-child {
    padding-right: var(--gutter);
  }

  strong {
    text-transform: uppercase;
  }
</style>

<script>
  import {formatDate} from '../../helpers'
  import Categories from '../Categories.svelte'
  import Category from '../Category.svelte'

  export let link
  export let title
  export let date
  export let outcome
  export let desiredOutcome

  const formattedDate = formatDate(new Date(date))
</script>