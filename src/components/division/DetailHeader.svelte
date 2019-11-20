<header>
  <div class="top">
    <h1>
      {title}
    </h1>
    <p class="date">{formattedDate}</p>
  </div>

  {#if description}
    <p class="description">
      {description}
      {#if link}
        <a href={link} target="_blank" class="more">View more detail</a>
      {/if}
    </p>
  {/if}

  {#if categories}
    <div class="categories">
      <Categories>
        {#each categories as category}
          <Category
            selected={selectedCategory && category.handle === selectedCategory.handle}
            href={`${category.handle}`}
          >
            {category.title}
          </Category>
        {/each}
      </Categories>
    </div>
  {/if}

  <div class="outcome">
    <p class="desired">
      <span class="icon">😍</span>
      <span class="margin"><span class="underline">Desired</span> outcome:</span>
      <strong class="margin uppercase">{desiredOutcome} vote</strong>
    </p>

    <p class="actual">
      <span class="icon">
        {#if desiredOutcome === outcome}
          😍
        {:else}
          ☠️
        {/if}
      </span>
      <span class="margin"><span class="underline">Actual</span> outcome:</span>
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

  header::after {
    background-color: hsla(0,0%,100%,0.2);
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  .top {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  h1 {
    flex-basis: 0;
    flex-grow: 999999;
    font-size: var(--fontSizeLarge);
    line-height: calc(var(--baseline) * 4);
    min-width: 80%;
    padding-right: calc(var(--gutter) * 1);
    transform: translateY(-2px);
  }

  .date {
    flex-grow: 1;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  .description {
    color: hsl(0,0%,100%);
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  .more {
    color: hsl(0,0%,100%);
    display: inline-block;
    outline: none;
    padding-left: calc(var(--gutter) * 0.25);
    padding-right: calc(var(--gutter) * 0.25 + 9px);
    position: relative;
    transition: background-color 0.3s ease-in-out;
  }

  .more::before,
  .more::after {
    content: '';
    position: absolute;
  }

  .more::before {
    border-right: 1px solid hsl(0,0%,100%);
    border-top: 1px solid hsl(0,0%,100%);
    right: 1px;
    top: 1px;
    width: 6px;
    height: 6px;
  }

  .more::after {
    right: 4px;
    top: 4px;
    width: 5px;
    height: 5px;
    border: 1px solid hsl(0,0%,100%);
  }

  .more:focus {
    background-color: var(--selectedColor);
  }

  .categories {
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 1.5);
  }

  .outcome {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  .desired,
  .actual {
    display: flex;
    flex-wrap: wrap;
    padding-top: var(--baseline);
    transform: translateY(-1px);
  }

  .desired {
    padding-right: var(--gutter);
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
  export let description
  export let date
  export let outcome
  export let desiredOutcome
  export let categories
  export let selectedCategory

  const formattedDate = formatDate(new Date(date))
</script>