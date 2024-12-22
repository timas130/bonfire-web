<script>
  import BaseButton, {buttonSizes} from "$lib/components/button/BaseButton.svelte";

  /** @type {keyof buttonSizes} */
  export let size = "default";

  let className = "";
  // noinspection JSUnusedGlobalSymbols,ReservedWordAsName
  export {className as class};
</script>

<BaseButton class="{buttonSizes[size].icon} {className}" {size} {...$$restProps} on:click>
  <slot />
</BaseButton>
