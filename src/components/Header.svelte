<header>
  <nav>
    <a href="/" name="Home" rel="prefetch">
      <svg class="logo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <title>They Vote For You</title>
        <path class="colour" d="M7 13v2l-2 1-2-1v-3l2.5-3.75L3 7V4l2-1 2 1v2l2-3V1l2-1 2 1v3l-2.5 3.75L13 9v3l-2 1-2-1v-2z"/>
        <path fill="#fff" fill-opacity=".5" d="M9 1l2-1 2 1-2 1zM3 4l2-1 2 1-2 1z"/>
        <path fill="#fff" fill-opacity=".4" d="M5.5 8.25l2 1L5 13l-2-1zM9 3l2 1-2 3-2-1z"/>
        <path fill="#fff" fill-opacity=".1" d="M3 12l2 1v3l-2-1zM9 1l2 1v2L9 3zM3 4l2 1v3L3 7zM9 10l2 1v2l-2-1z"/>
      </svg>
    </a>
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
    padding: calc(var(--baseline) - 4px) var(--gutter);
    width: 100%;
  }

  a {
    background-color: hsl(0,0%,0%);
    border-radius: 3px;
    box-shadow: 0 0 1px hsla(0,0%,100%,0.25);
    display: block;
    height: calc(var(--baseline) * 2 + 8px);
    margin-left: -4px;
    outline: none;
    padding: 4px;
    transition: all 0.3s ease-in-out;
    width: calc(var(--baseline) * 2 + 8px);
  }

  a:hover,
  a:focus {
    transform: scale(1.2);
  }

  svg {
    display: block;
    height: calc(var(--baseline) * 2);
    overflow: visible;
    width: calc(var(--baseline) * 2);
  }

  @keyframes pathAnimation {
    0% { fill: hsl(0,90%,40%); }
    25% { fill: hsl(90,90%,40%); }
    50% { fill: hsl(180,90%,40%); }
    75% { fill: hsl(270,90%,40%); }
    100% { fill: hsl(360,90%,40%); }
  }

  .colour {
    animation: pathAnimation 15s linear infinite;
    fill: hsl(0,90%,40%);
  }
</style>