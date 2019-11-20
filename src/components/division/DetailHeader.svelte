<header>
  <div class="a">
    <h1>
      {#if !description && link}<a href={link}>{title}</a>{:else}{title}{/if}
    </h1>
    <p>{formattedDate}</p>
  </div>

  {#if description}
    <div class="b">
      <p>
        {description}
        {#if link}<a href={link} target="_blank">View more detail</a>{/if}
      </p>
    </div>
  {/if}

  {#if categories}
    <div class="c">
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

  <div class="d">
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

  header::after {
    background-color: hsla(0,0%,100%,0.2);
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
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

  .b a {
    display: inline-block;
    padding-left: calc(var(--gutter) * 0.25);
    padding-right: calc(var(--gutter) * 0.25 + 9px);
    position: relative;
  }

  .b a::before,
  .b a::after {
    content: '';
    position: absolute;
  }

  .b a::before {
    border-right: 1px solid hsl(0,0%,100%);
    border-top: 1px solid hsl(0,0%,100%);
    right: 1px;
    top: 1px;
    width: 6px;
    height: 6px;
  }

  .b a::after {
    right: 4px;
    top: 4px;
    width: 5px;
    height: 5px;
    border: 1px solid hsl(0,0%,100%);
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

  a {
    color: hsl(0,0%,100%);
    outline: none;
  }

  a:focus {
    background-color: var(--selectedColor);
  }

  .c {
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 1.5);
  }

  .d {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  .d > p {
    display: flex;
    flex-wrap: wrap;
    padding-top: var(--baseline);
    transform: translateY(-1px);
  }

  .d > p > *:not(:first-child) {
    margin-left: calc(var(--gutter) * 0.25);
  }

  .d > p:first-child {
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
  export let description
  export let date
  export let outcome
  export let desiredOutcome
  export let categories
  export let selectedCategory

  const formattedDate = formatDate(new Date(date))
</script>