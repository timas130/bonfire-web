<script>
  let className = "";
  // noinspection ReservedWordAsName
  export {className as class};

  export let el = "div";
</script>

<svelte:element this={el} class="max-w-5xl px-4 mx-auto {className}">
  <slot />
</svelte:element>
