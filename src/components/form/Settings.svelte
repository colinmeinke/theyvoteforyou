<svelte:window on:resize={() => !userPressedButton && allowHide && updateShow()} />

<aside class:sticky={sticky}>
  {#if allowHide}
    <div
      class="container"
      in:hide|local={{duration: 300, easing: cubicOut}}
      out:hide|local={{duration: 300, easing: cubicIn}}
    >
      <button
        type="button"
        on:click={() => {userPressedButton = true; show = !show}}
      >
        {`${show ? 'Hide' : 'Show'} Settings`}
      </button>
    </div>
  {/if}

  {#if show}
    <div
      in:hide|local={{duration: 300, easing: cubicOut}}
      out:hide|local={{duration: 300, easing: cubicOut}}
    >
      <slot></slot>
    </div>
  {/if}
</aside>

<style>
  aside {
    padding-top: calc(var(--baseline) * 1);
  }

  .sticky {
    max-height: 100vh;
    overflow: auto;
    position: sticky;
    top: 0;
  }

  @media screen and (min-width: 1000px) {
    aside {
      padding-top: calc(var(--baseline) * 2);
    }
  }

  .container {
    padding-bottom: calc(var(--baseline) * 2);
  }

  button {
    background-color: hsl(0,0%,8%);
    border: none;
    border-radius: 3px;
    border: 1px solid hsl(0,0%,18%);
    box-shadow: 0 0 1px black;
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeSmall);
    font-weight: bold;
    letter-spacing: 0.025rem;
    line-height: calc(var(--baseline) * 2);
    padding: calc(var(--baseline) * 0.5 - 1px) var(--baseline);
    transition: all 0.3s ease-in-out;
    transform: translateY(-2px);
  }

  button:hover,
  button:focus {
    background-color: var(--selectedColor);
    cursor: pointer;
    outline: none;
  }
</style>

<script>
  import {onMount} from 'svelte'
  import {slide} from 'svelte/transition'
  import {cubicOut, cubicIn} from 'svelte/easing'
  import {hide} from '../../helpers'

  export let breakpoint = 1000
  export let allowHide = true
  export let sticky = true

  let userPressedButton = false
  let show = true
  let mounted = false

  const updateShow = () => {show = window.innerWidth >= breakpoint}

  $: {
    if (mounted && allowHide) {
      updateShow()
    }
  }

  onMount(() => {mounted = true})
</script>