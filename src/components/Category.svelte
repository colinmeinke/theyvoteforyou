<li class:vertical={vertical}>
  <a {href} class:selected={selected} rel="prefetch">
    <slot></slot>
  </a>
</li>

<style>
  li {
    color: hsl(220,20%,15%);
    font-size: var(--fontSizeSmall);
    font-weight: bold;
    letter-spacing: 0.025rem;
    margin-top: var(--baseline);
  }

  li:not(.vertical) {
    margin-right: calc(var(--gutter) * 0.5);
  }

  a {
    border: 1px solid hsl(0,0%,100%);
    border-radius: 1px;
    display: block;
    line-height: calc(var(--baseline) * 2 - 2px);
    padding-left: var(--baseline);
    padding-right: var(--baseline);
    position: relative;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }

  a::after {
    bottom: 0px;
    content: '';
    left: 0px;
    position: absolute;
    top: 0px;
    transition: background-color 0.3s ease-in-out;
    width: 4px;
  }

  a:not(.selected) {
    color: hsl(0,0%,100%);
  }

  a:not(.selected)::after {
    background-color: hsl(0,0%,100%);
    bottom: 0px;
    left: 0px;
    top: 0px;
  }

  .selected {
    background-color: hsl(0,0%,100%);
    color: hsl(220,20%,15%);
  }

  .selected::after {
    background-color: var(--selectedColor);
  }

  a:hover,
  a:focus,
  .selected:hover,
  .selected:focus {
    background-color: var(--selectedColor);
    border-color: var(--selectedColor);
    color: hsl(0,0%,100%);
    outline: none;
  }

  a:not(.selected):hover::after,
  a:not(.selected):focus::after {
    background-color: var(--selectedColor);
  }
</style>

<script>
  export let selected = false
  export let href = null
  export let vertical = false
</script>