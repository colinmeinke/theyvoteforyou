<div class="outer" in:fade="{{delay:300}}" out:fade="{{duration:300}}">
  <div class="inner">
    <h1>{status}</h1>
    <p>{error.message}</p>
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

  p {
    color: hsl(0,0%,100%);
  }
</style>

<script>
  import {fade} from 'svelte/transition'
  export let status
  export let error
</script>