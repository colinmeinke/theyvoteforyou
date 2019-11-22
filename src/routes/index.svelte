<svelte:head>
  <title>They Vote For You</title>
  <meta name="description" content="They want you to vote for them, But do they vote for you?" />
  <link rel="canonical" href={`https://theyvoteforyou.uk`} />
</svelte:head>

<div class="outer" in:fade="{{delay:300}}" out:fade="{{duration:300}}">
  <div class="inner">
    <h1>
      They want you to vote for them,<br />
      But do they vote for you?
    </h1>

    <div class="categories">
      <Categories center={true} vertical={true}>
        {#each categories as category}
          <Category href={`${category.handle}`} vertical={true}>
            {category.title}
          </Category>
        {/each}
      </Categories>
    </div>
  </div>
</div>

<style>
  .outer {
    min-height: calc(100vh - var(--baseline) * 8);
  }

  .inner {
    margin: auto;
    text-align: center;
  }

  h1 {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeLarge);
    line-height: calc(var(--baseline) * 4);
    transform: translateY(-2px);
  }

  .categories {
    margin-top: calc(var(--baseline) * 2);
  }
</style>


<script context="module">
  export async function preload({params: {category: handle}}) {
    try {
      const res = await this.fetch(`data/categories.json`)
      const categories = await res.json()
      return {categories}
    } catch (err) {
      this.error(404, 'Not found')
    }
  }
</script>

<script>
  import {fade} from 'svelte/transition'
  import Categories from '../components/Categories.svelte'
  import Category from '../components/Category.svelte'
  export let categories
</script>