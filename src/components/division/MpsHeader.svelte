<header>
  <div class="a">
    <h2>MPs</h2>
    <p>
      Showing <strong class="underline">{count}</strong> of
      <strong>{total}</strong> MPs who could vote on this bill.
    </p>
  </div>

  <form>
    <div class="b">
      <label for="mpsFilterBy">Filter by:</label>
      <select
        id="mpsFilterBy"
        bind:value={filterBy}
        on:change={handleFilterByChange}
      >
        {#each filterByOptions as option}
          <option value={option}>{`${['Yes', 'No'].includes(option) ? 'Voted ' : ''}${option}`}</option>
        {/each}
      </select>
    </div>
  </form>
</header>

<style>
  header {
    align-items: flex-end;
    color: hsl(0,0%,100%);
    display: flex;
    flex-wrap: wrap;
    padding-bottom: calc(var(--baseline) * 1);
    padding-top: calc(var(--baseline) * 4);
  }

  .a {
    flex-basis: 0;
    flex-grow: 999999;
    min-width: 70%;
    padding-right: var(--gutter);
  }

  h2 {
    font-size: var(--fontSizeMedium);
    line-height: calc(var(--baseline) * 4);
    transform: translateY(1px);
  }

  p {
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
    transform: translateY(-1px);
  }

  form {
    flex-grow: 1;
    padding-bottom: calc(var(--baseline) * 0.5);
    padding-top: calc(var(--baseline) * 0.5);
  }

  .b {
    display: flex;
  }

  label {
    color: hsl(0,0%,100%);
    font-size: var(--fontSizeSmall);
    font-weight: var(--fontWeightBold);
    padding-right: calc(var(--gutter) * 0.25);
  }
</style>

<script>
  export let count = 0
  export let total = 0
  export let filterByOptions = []
  export let filterBy
  export let handleFilterByChange = () => {}
</script>