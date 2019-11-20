<div
  class="a"
  data-category={category}
  data-repaint={repaint}
>
  <div class="b">
    <slot name="title"></slot>
    <slot name="content"></slot>
  </div>
</div>

<style>
  .a {
    --duration: 0.3s;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, hsl(0,0%,80%) 50%);
    border-top: var(--baseline) solid hsl(0,0%,80%);
    border-bottom-left-radius: 10px;
    border-radius: calc(var(--baseline) / 2);
    box-shadow: 0 2px 2px hsla(0, 0%, 10%, 0.1);
    min-width: calc(100% / 3);
    position: relative;
    transition: all var(--duration) ease-in-out;
    width: 100%;
    overflow: hidden;
  }

  .a,
  .b {
    background-size: 100% 200%;
  }

  .a:hover {
    box-shadow: calc((var(--gutter) / 4) * 2) calc(var(--baseline) * 2) calc(var(--baseline) * 2) hsla(0, 0%, 10%, 0.1);
    transform: translateX(calc(var(--gutter) * -1 / 4)) translateY(calc(var(--baseline) * -1));
  }

  .a:hover,
  .a:hover .b {
    background-position: 0 -100%;
  }

  .b {
    color: var(--fontColorMedium);
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--baseline) var(--gutter) calc(var(--baseline) * 3);
    transition: all var(--duration) ease-in-out;
  }

  @supports (background-clip: text) or (-webkit-background-clip: text) {
    .b {
      background-image: linear-gradient(to bottom, var(--fontColorMedium) 50%, var(--fontColorDark) 50%);
      background-clip: text;
      color: transparent;
      -webkit-background-clip: text;
    }

    [data-category="Conservatives"] .b,
    [data-category="DUP"] .b,
    [data-category="Green Party"] .b,
    [data-category="Independent Group for Change"] .b,
    [data-category="Labour"] .b,
    [data-category="Plaid Cymru"] .b,
    [data-category="Respect"] .b,
    [data-category="Sinn Féin"] .b,
    [data-category="SDLP"] .b,
    [data-category="UKIP"] .b,
    [data-category="UUP"] .b {
      background-image: linear-gradient(to bottom, var(--fontColorMedium) 50%, hsl(0,0%,100%) 50%);
    }
  }

  @supports not ((background-clip: text) or (-webkit-background-clip: text)) {
    [data-category="Conservatives"]:hover .b,
    [data-category="DUP"]:hover .b,
    [data-category="Green Party"]:hover .b,
    [data-category="Independent Group for Change"]:hover .b,
    [data-category="Labour"]:hover .b,
    [data-category="Plaid Cymru"]:hover .b,
    [data-category="Respect"]:hover .b,
    [data-category="Sinn Féin"]:hover .b,
    [data-category="SDLP"]:hover .b,
    [data-category="UKIP"]:hover .b,
    [data-category="UUP"]:hover .b {
      color: hsl(0,0%,100%);
    }
  }

  [data-category="Alliance"] {
    border-color: #F4C72E;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #F4C72E 50%);
  }

  [data-category="Conservatives"] {
    border-color: #00AEEF;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #00AEEF 50%);
  }

  [data-category="DUP"] {
    border-color: #C62A2A;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #C62A2A 50%);
  }

  [data-category="Green Party"] {
    border-color: #6AB023;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #6AB023 50%);
  }

  [data-category="Labour"] {
    border-color: #E4003B;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #E4003B 50%);
  }

  [data-category="Liberal Democrats"] {
    border-color: #FAA61A;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #FAA61A 50%);
  }

  [data-category="Plaid Cymru"] {
    border-color: #006A56;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #006A56 50%);
  }

  [data-category="Respect"] {
    border-color: #990201;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #990201 50%);
  }

  [data-category="SNP"] {
    border-color: #FDF38E;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #FDF38E 50%);
  }

  [data-category="Sinn Féin"] {
    border-color: #008800;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #008800 50%);
  }

  [data-category="SDLP"] {
    border-color: #0E6E51;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #0E6E51 50%);
  }

  [data-category="Independent Group for Change"] {
    border-color: #222221;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #222221 50%);
  }

  [data-category="UKIP"] {
    border-color: #470A65;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #470A65 50%);
  }

  [data-category="UUP"] {
    border-color: #D72026;
    background-image: linear-gradient(to bottom, hsl(0,0%,100%) 50%, #D72026 50%);
  }

  .b > :global(:nth-child(1)) {
    font-size: var(--fontSizeMedium);
    line-height: calc(var(--baseline) * 3);
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    /* transform: translateY(1px); */
  }

  .b > :global(:nth-child(2)) {
    margin-top: auto;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  /* Required to force a repaint due to a rendering bug in Chrome */
  [data-repaint="true"] {
    transform: scale(1);
  }
</style>

<script>
  export let category
  export let repaint
</script>