<header>
  <div class="top">
    <h2>
      <a href={link} rel="prefetch">{title}</a>
    </h2>
    <p class="date">{formattedDate}</p>
  </div>

  <div class="outcome">
    <p class="desired">
      <em class="underline">Desired</em> outcome:
      <span class="icon margin">😍</span>
      <strong class="margin uppercase">{desiredOutcome} vote</strong>
    </p>

    <p class="actual">
      <em class="underline">Actual</em> outcome:
      <span class="icon margin">
        {#if desiredOutcome === outcome}
          😍
        {:else}
          ☠️
        {/if}
      </span>
      <strong class="margin uppercase">
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

  .top {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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

  .date {
    flex-grow: 1;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  .outcome {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  .desired,
  .actual {
    color: hsl(0,0%,100%);
    display: flex;
    flex-wrap: wrap;
    padding-top: var(--baseline);
    transform: translateY(-1px);
  }

  .desired {
    padding-right: var(--gutter);
  }

  em {
    font-style: inherit;
    margin-right: calc(var(--baseline) / 4);
  }

  .margin {
    margin-left: calc(var(--gutter) * 0.25);
  }

  .uppercase {
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