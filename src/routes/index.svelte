<div class="outer" in:fade="{{delay:300}}" out:fade="{{duration:300}}">
  <div class="inner">
    <h1>
      They want you to vote for them,<br />
      But do they vote for you?
    </h1>

    <ul>
      {#each categories as category}
        <li>
          <a href={`/${category.handle}`}>{category.title}</a>
        </li>
      {/each}
    </ul>
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

  ul {
    list-style: none;
    margin-bottom: 0;
    margin-top: calc(var(--baseline) * 3);
    padding-left: 0;
  }

  a {
    color: hsl(0,0%,100%);
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
  export let categories
</script>