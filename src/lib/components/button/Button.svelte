<script>
  import BaseButton, {buttonSizes} from "$lib/components/button/BaseButton.svelte";

  /** @type {keyof buttonSizes} */
  export let size = "default";

  let className = "";
  // noinspection ReservedWordAsName
  export {className as class};
</script>

<BaseButton class="{buttonSizes[size].normal} {className}" {size} {...$$restProps} on:click>
  {#if $$slots.icon}
    <div class="pr-2">
      <slot name="icon" />
    </div>
  {/if}
  <slot />
</BaseButton>
