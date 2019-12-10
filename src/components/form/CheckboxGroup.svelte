<fieldset class:fancy class:transitioning>
  <legend class:drawAttention>{label}</legend>

  <div class="list" style="--modifier:{modifier};height:{mounted ? listHeight : 'auto'}">
    {#each options as option, i (option.value)}
      <div
        class="item item{i * modifier + 1}"
        in:receive|local={{key: option.value}}
        out:send|local={{key: option.value}}
        animate:flip|local={{duration: transitionDuration}}
      >
        <input
          type="checkbox"
          name="{id}{option.value.replace(/ /g, '')}"
          id="{id}{option.value.replace(/ /g, '')}"
          value={option.value}
          checked={selectedOptions.includes(option.value)}
          on:change={handleChange}
          {disabled}
        />

        <label for="{id}{option.value.replace(/ /g, '')}">
          {#if selectedOptions.includes(option.value)}
            <svg
              transition:fade|local={{duration:300}}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
            >
              <path fill="#FFF" fill-rule="evenodd" d="M5 10l9-10 2 2L5 14 0 9l2-2z" />
            </svg>
          {/if}
          {option.title}
        </label>
      </div>
    {/each}
  </div>
</fieldset>

<style>
  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    min-inline-size: 0;
    padding: 0 0 calc(var(--baseline) * 2.5);
    position: relative;
  }

  fieldset::after {
    background-color: hsla(0,0%,100%,0.2);
    bottom: var(--baseline);
    content: '';
    height: 1px;
    position: absolute;
    left: 0;
    right: 0%;
    transition: opacity var(--transitionDuration) ease-in-out;
  }

  .fancy::after {
    opacity: 0;
  }

  legend {
    color: hsl(0,0%,100%);
    padding: calc(var(--baseline) * 0.5) 0 0;
    transform: translateY(-1px);
  }

  @keyframes jumpLegend {
    0% { transform: translateY(0); }
    20% { transform: translateY(-0.8rem); }
    40% { transform: translateY(0.4rem); }
    60% { transform: translateY(-0.2rem); }
    80% { transform: translateY(0); }
  }

  .drawAttention {
    animation: jumpLegend 1.5s ease-in-out 2;
  }

  .list {
    display: grid;
    grid-column-gap: var(--gutter);
    grid-template-columns: auto auto;
    padding-top: var(--baseline);
    transition: height 0.3s ease-in-out;
  }

  @media screen and (min-width: 550px) {
    .list {
      grid-template-columns: auto auto auto;
    }
  }

  @media screen and (min-width: 1000px) {
    .fancy {
      margin-top: var(--baseline);
    }

    .list {
      grid-template-columns: auto auto auto auto;
    }
  }

  .item {
    display: flex;
    margin-top: var(--baseline);
    white-space: nowrap;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    margin: 0;
  }

  @media screen and (max-width: 549px) {
    .item1, .item2 { grid-row: 1 / 2; }
    .item3, .item4 {grid-row: 2 / 3;}
    .item5, .item6 {grid-row: 3 / 4;}
    .item7, .item8 {grid-row: 4 / 5;}
    .item9, .item10 {grid-row: 5 / 6;}
    .item11, .item12 {grid-row: 6 / 7;}
    .item13, .item14 {grid-row: 7 / 8;}
    .item15, .item16 {grid-row: 8 / 9;}
    .item17, .item18 {grid-row: 9 / 10;}
    .item19, .item20 {grid-row: 10 / 11;}
    .item21, .item22 {grid-row: 11 / 12;}
    .item23, .item24 {grid-row: 12 / 13;}
    .item25, .item26 {grid-row: 13 / 14;}
    .item27, .item28 {grid-row: 14 / 15;}
    .item29, .item30 {grid-row: 15 / 16;}
    .item31, .item32 {grid-row: 16 / 17;}
    .item33, .item34 {grid-row: 17 / 18;}
    .item35, .item36 {grid-row: 18 / 19;}

    .item1, .item3, .item5, .item7, .item9, .item11, .item13, .item15, .item17, .item19,
    .item21, .item23, .item25, .item27, .item29, .item31, .item33, .item35 {
      grid-column: 1 / 2;
    }

    .item2, .item4, .item6, .item8, .item10, .item12, .item14, .item16, .item18,
    .item20, .item22, .item24, .item26, .item28, .item30, .item32, .item34,
    .item36 {
      grid-column: 2 / 3;
    }
  }

  @media screen and (min-width: 550px) {
    .item1, .item2, .item3 { grid-row: 1 / 2; }
    .item4, .item5, .item6 { grid-row: 2 / 3; }
    .item7, .item8, .item9 { grid-row: 3 / 4; }
    .item10, .item11, .item12 { grid-row: 4 / 5; }
    .item13, .item14, .item15 { grid-row: 5 / 6; }
    .item16, .item17, .item18 { grid-row: 6 / 7; }
    .item19, .item20, .item21 { grid-row: 7 / 8; }
    .item22, .item23, .item24 { grid-row: 8 / 9; }
    .item25, .item26, .item27 { grid-row: 9 / 10; }
    .item28, .item29, .item30 { grid-row: 10 / 11; }
    .item31, .item32, .item33 { grid-row: 11 / 12; }
    .item34, .item35, .item36 { grid-row: 12 / 13; }
    .item37, .item38, .item39 { grid-row: 13 / 14; }
    .item40, .item41, .item42 { grid-row: 14 / 15; }
    .item43, .item44, .item45 { grid-row: 15 / 16; }
    .item44, .item45, .item46 { grid-row: 16 / 17; }
    .item47, .item48, .item49 { grid-row: 17 / 18; }
    .item50, .item51, .item52 { grid-row: 18 / 19; }

    .item1, .item4, .item7, .item10, .item13, .item16, .item19, .item22,
    .item25, .item28, .item31, .item34, .item37, .item40, .item43, .item46,
    .item49, .item52 {
      grid-column: 1 / 2;
    }

    .item2, .item5, .item8, .item11, .item14, .item17, .item20, .item23,
    .item26, .item29, .item32, .item35, .item38, .item41, .item44, .item47,
    .item50 {
      grid-column: 2 / 3;
    }

    .item3, .item6, .item9, .item12, .item15, .item18, .item21, .item24,
    .item27, .item30, .item33, .item36, .item39, .item42, .item45, .item48,
    .item51 {
      grid-column: 3 / 4;
    }
  }

  @media screen and (min-width: 1000px) {
    .item1, .item2, .item3, .item4 { grid-row: 1 / 2; }
    .item5, .item6, .item7, .item8 { grid-row: 2 / 3; }
    .item9, .item10, .item11, .item12 { grid-row: 3 / 4; }
    .item13, .item14, .item15, .item16 { grid-row: 4 / 5; }
    .item17, .item18, .item19, .item20 { grid-row: 5 / 6; }
    .item21, .item22, .item23, .item24 { grid-row: 6 / 7; }
    .item25, .item26, .item27, .item28 { grid-row: 7 / 8; }
    .item29, .item30, .item31, .item32 { grid-row: 8 / 9; }
    .item33, .item34, .item35, .item36 { grid-row: 9 / 10; }
    .item37, .item38, .item39, .item40 { grid-row: 10 / 11; }
    .item41, .item42, .item43, .item44 { grid-row: 11 / 12; }
    .item45, .item46, .item47, .item48 { grid-row: 12 / 13; }
    .item49, .item50, .item51, .item52 { grid-row: 13 / 14; }
    .item53, .item54, .item55, .item56 { grid-row: 14 / 15; }
    .item57, .item58, .item59, .item60 { grid-row: 15 / 16; }
    .item61, .item62, .item63, .item64 { grid-row: 16 / 17; }
    .item65, .item66, .item67, .item68 { grid-row: 17 / 18; }
    .item69, .item70, .item71, .item72 { grid-row: 18 / 19; }

    .item1, .item5, .item9, .item13, .item17, .item21, .item25, .item29,
    .item33, .item37, .item41, .item45, .item49, .item53, .item57, .item61,
    .item65, .item69 {
      grid-column: 1 / 2;
    }

    .item2, .item6, .item10, .item14, .item18, .item22, .item26, .item30,
    .item34, .item38, .item42, .item46, .item50, .item54, .item58, .item62,
    .item66, .item70 {
      grid-column: 2 / 3;
    }

    .item3, .item7, .item11, .item15, .item19, .item23, .item27, .item31,
    .item35, .item39, .item43, .item47, .item51, .item55, .item59, .item63,
    .item67, .item71 {
      grid-column: 3 / 4;
    }

    .item4, .item8, .item12, .item16, .item20, .item24, .item28, .item32,
    .item36, .item40, .item44, .item48, .item52, .item56, .item60, .item64,
    .item68, .item72 {
      grid-column: 4 / 5;
    }
  }

  label {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeSmall);
    font-weight: bold;
    margin-left: calc(var(--baseline) * 2 + var(--gutter) * 0.25);
    padding-left: calc(var(--gutter) * 0.25);
    padding-right: calc(var(--gutter) * 0.25);
    position: relative;
    transform: translateY(1px);
  }

  label::before {
    content: '';
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  label::before {
    background-color: hsl(0,0%,8%);
    border-radius: 2px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,5%,0), 1px 1px 0 hsl(0,0%,0%,0.5);
    height: calc(var(--baseline) * 2);
    left: calc(var(--gutter) * -0.25 - var(--baseline) * 2);
    top: 0;
    transform: translateX(2px);
    width: calc(var(--baseline) * 2);
  }

  input:not(:checked) + label::before {
    box-shadow: inset 2px 2px 2px hsla(0,0%,5%,0.5), 1px 1px 0 hsl(0,0%,0%,0);
  }

  fieldset:not(.transitioning) input + label {
    transition: background-color 0.3s ease-in-out;
  }

  fieldset:not(.transitioning) input:focus + label {
    background-color: var(--selectedColor);
  }

  fieldset:not(.transitioning) input:focus + label::before,
  fieldset:not(.transitioning) input:hover + label::before {
    background-color: var(--selectedColor);
  }

  input:not(:checked):focus + label::before,
  input:not(:checked):hover + label::before {
    box-shadow: inset 2px 2px 2px hsla(200,80%,30%,0.5), 1px 1px 0 hsl(0,0%,0%,0);
  }

  input:checked:focus + label::before,
  input:checked:hover + label::before {
    box-shadow: inset 2px 2px 2px hsla(200,80%,30%,0), 1px 1px 0 hsl(0,0%,0%,0.5);
  }

  svg {
    position: absolute;
    left: calc((var(--gutter) * 0.25 + var(--baseline) * 2) * -1 + 2px + ((var(--baseline) * 2 - 16px) / 2));
    top: calc((var(--baseline) * 2 - 14px) / 2);
  }
</style>

<script>
  import {switchItems} from '../../helpers'
  import {onMount} from 'svelte'
  import {flip} from 'svelte/animate'
  import {fade} from 'svelte/transition'

  export let id
  export let label
  export let options = []
  export let selectedOptions = []
  export let handleChange = () => {}
  export let drawAttention = false
  export let fancy = false
  export let disabled = false
  export let transitioning = false
  export let transitionDuration = 0

  $: {
    // always true but required to trigger on fancy prop change
    transitioning = fancy || !fancy
    typeof window !== 'undefined' && window.setTimeout(() => transitioning = false, transitionDuration)
  }

  const getFancyColumns = () => {
    const width = window.innerWidth

    if (width < 550) {
      return 2
    } else if (width < 1000) {
      return 3
    }

    return 4
  }

  let mounted = false
  let fancyColumns = typeof window !== 'undefined' ? getFancyColumns() : 2

  $: modifier = fancy ? 1 : fancyColumns
  $: rows = fancy ? Math.ceil(options.length / fancyColumns) : options.length
  $: listHeight = `${rows * 36 + 12}px`

  const [send, receive] = switchItems()

  onMount(() => {
    window.addEventListener('resize', () => fancyColumns = getFancyColumns())
    fancyColumns = getFancyColumns()
    mounted = true
  })
</script>