<script>
  import {page} from "$app/stores";

  /** @type {string} */
  export let href;

  /** @type {boolean | "default"} */
  export let active = "default";

  $: realActive = active === "default" ? $page.url.pathname.startsWith(href) : active;
</script>

<a
  {href}
  class="
    h-10 rounded-full px-4 text-lg flex items-center
    text-text-900 transition active:scale-90
    {realActive ? 'bg-background-300 hover:bg-background-400' : 'hover:bg-background-300'}
  "
>
  <slot />
</a>
