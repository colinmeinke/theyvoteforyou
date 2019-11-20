<li class:selected={selected}>
  <a {href}>
    <slot></slot>
  </a>
</li>

<style>
  li {
    color: var(--fontColorMedium);
    font-size: var(--fontSizeSmall);
    font-weight: var(--fontWeightBold);
    margin-right: calc(var(--gutter) * 0.5);
    letter-spacing: 0.025rem;
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

  li:not(.selected) a {
    color: hsl(0,0%,100%);
  }

  li:not(.selected) a::after {
    background-color: hsl(0,0%,100%);
    bottom: 0px;
    left: 0px;
    top: 0px;
  }

  .selected a {
    background-color: hsl(0,0%,100%);
    color: var(--fontColorMedium);
  }

  .selected a::after {
    background-color: var(--selectedColor);
  }

  a:hover,
  a:focus,
  .selected a:hover,
  .selected a:focus {
    background-color: var(--selectedColor);
    border-color: var(--selectedColor);
    color: hsl(0,0%,100%);
    outline: none;
  }

  li:not(.selected) a:hover::after,
  li:not(.selected) a:focus::after {
    background-color: var(--selectedColor);
  }
</style>

<script>
  export let selected = false
  export let href = null
</script>