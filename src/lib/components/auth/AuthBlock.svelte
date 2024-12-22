<script>
  import CircleLogo from "$lib/components/logo/CircleLogo.svelte";
  import {enhance} from "$app/forms";

  export let enhanceFn = () => {};
</script>

<div class="max-w-sm w-full bg-background-surface p-4 rounded-xl relative border-[1px] border-border">
  <form class="relative flex flex-col items-center w-full" method="post" use:enhance={enhanceFn} {...$$restProps}>
    {#if !$$slots.logo}
      <CircleLogo />
    {:else}
      <slot name="logo" />
    {/if}
    <slot />
  </form>
</div>
