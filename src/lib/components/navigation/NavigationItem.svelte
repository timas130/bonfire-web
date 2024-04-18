<script>
  import {page} from "$app/stores";

  /** @type {string | undefined} */
  export let href = undefined;

  /** @type {boolean | "default"} */
  export let active = "default";

  $: realActive = active === "default" ? $page.url.pathname.startsWith(href) : active;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={href ? "a" : "button"}
  {href}
  class="
    h-10 rounded-full px-4 text-lg flex items-center
    text-text-900 transition active:scale-90
    {realActive ? 'bg-background-300 hover:bg-background-400' : 'hover:bg-background-300'}
  "
  on:click
>
  <slot />
</svelte:element>
