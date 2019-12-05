<header>
  <div>
    <h2>
      <a href={link} rel="prefetch">{title}</a>
    </h2>
    <p>{description}</p>
  </div>
</header>

<style>
  header {
    padding-bottom: var(--baseline);
    padding-top: calc(var(--baseline) * 3);
  }

  @media screen and (min-width: 1000px) {
    header {
      padding-top: calc(var(--baseline) * 4);
    }
  }

  h2 {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeMedium);
    line-height: calc(var(--baseline) * 4);
    transform: translateY(3px);
  }

  a {
    color: hsl(0,0%,100%);
    outline: none;
  }

  a:focus {
    background-color: var(--selectedColor);
  }

  p {
    color: hsl(0,0%,100%);
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }
</style>

<script>
  export let link
  export let title
  export let description
</script>