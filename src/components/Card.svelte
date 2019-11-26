<div
  class="outer"
  data-category={category}
  data-repaint={repaint}
>
  <div class="inner">
    <slot name="title"></slot>
    <slot name="content"></slot>
  </div>
</div>

<style>
  .outer {
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
  }

  .outer::after {
    box-shadow: calc((var(--gutter) / 4) * 2) calc(var(--baseline) * 2) calc(var(--baseline) * 2) hsla(0,0%,0%,0.2);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  .outer,
  .inner {
    background-size: 100% 200%;
  }

  .outer:hover,
  .outer:hover .inner {
    background-position: 0 -100%;
  }

  .inner {
    color: hsl(220,20%,15%);
    padding: var(--baseline) var(--gutter) calc(var(--baseline) * 3);
    transition: all var(--duration) ease-in-out;
  }

  @supports (background-clip: text) or (-webkit-background-clip: text) {
    .inner {
      background-image: linear-gradient(to bottom, hsl(220,20%,15%) 50%, hsl(220,20%,0%) 50%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    [data-category="Conservatives"] .inner,
    [data-category="DUP"] .inner,
    [data-category="Green Party"] .inner,
    [data-category="Independent Group for Change"] .inner,
    [data-category="Labour"] .inner,
    [data-category="Plaid Cymru"] .inner,
    [data-category="Respect"] .inner,
    [data-category="Sinn Féin"] .inner,
    [data-category="SDLP"] .inner,
    [data-category="UKIP"] .inner,
    [data-category="UUP"] .inner {
      background-image: linear-gradient(to bottom, hsl(220,20%,15%) 50%, hsl(0,0%,100%) 50%);
    }
  }

  @supports not ((background-clip: text) or (-webkit-background-clip: text)) {
    [data-category="Conservatives"]:hover .inner,
    [data-category="DUP"]:hover .inner,
    [data-category="Green Party"]:hover .inner,
    [data-category="Independent Group for Change"]:hover .inner,
    [data-category="Labour"]:hover .inner,
    [data-category="Plaid Cymru"]:hover .inner,
    [data-category="Respect"]:hover .inner,
    [data-category="Sinn Féin"]:hover .inner,
    [data-category="SDLP"]:hover .inner,
    [data-category="UKIP"]:hover .inner,
    [data-category="UUP"]:hover .inner {
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

  .inner > :global(:nth-child(1)) {
    font-size: var(--fontSizeMedium);
    line-height: calc(var(--baseline) * 3);
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  .inner > :global(:nth-child(2)) {
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
  export let category = 'none'
  export let repaint = false
</script>