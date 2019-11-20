<header>
  <nav>
    <a href="/" name="Home"><span></span></a>
  </nav>
</header>

<style>
  header {
    background-color: hsl(0,0%,8%);
    display: flex;
    justify-content: center;
    position: relative;
  }

  header::after {
    background-color: hsl(0,0%,0%);
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  nav {
    --maxWidth: calc(12 * (var(--column) + var(--gutter)) + var(--gutter));
    display: flex;
    max-width: var(--maxWidth);
    padding: calc(var(--baseline) * 1) var(--gutter);
    width: 100%;
  }

  a {
    background-color: hsl(0,0%,0%);
    border-radius: 50%;
    display: block;
    height: calc(var(--baseline) * 2);
    transition: all 0.3s ease-in-out;
    width: calc(var(--baseline) * 2);
  }

  a:focus {
    outline: none;
    background-color: var(--selectedColor);
  }
</style>