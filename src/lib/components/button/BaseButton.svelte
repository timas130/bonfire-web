<script context="module">
  export const buttonSizes = {
    default: {
      base: "h-10 text-lg",
      icon: "size-10",
      normal: "px-4",
    },
    nav: {
      base: "h-12 text-lg",
      icon: "size-12",
      normal: "px-4"
    },
    big: {
      base: "h-14 text-xl",
      icon: "size-14",
      normal: "px-6",
    },
    social: {
      icon: "size-12",
    },
  };

  export const buttonVariants = {
    default: {
      base: "bg-background-button text-text hover:bg-background-300"
    },
    text: {
      base: "text-text hover:bg-background-300/40",
    },
    hero: {
      base: "bg-accent/70 backdrop-blur text-text font-medium hover:bg-accent",
    },
    primary: {
      base: "bg-accent/60 text-text hover:bg-accent",
    },
    success: {
      base: "bg-accent-success/30 text-text hover:bg-accent-success/50",
    },
    social: {
      base: "bg-background-button text-text hover:bg-background-300 rounded-xl",
    },
  };
</script>

<script>
  import Spinner from "$lib/components/progress/Spinner.svelte";

  let className = "";
  export let el = "button";

  /** @type {keyof buttonSizes} */
  export let size = "default";

  /** @type {keyof buttonVariants} */
  export let variant = "default";

  export let loading = false;

  export let disabled = false;

  // noinspection ReservedWordAsName
  export {className as class};
</script>

<svelte:element
  this={el}
  class="{buttonSizes[size].base} {buttonVariants[variant].base} rounded-full active:scale-90 disabled:opacity-70 transition inline-flex justify-center items-center relative {className}"
  on:click
  role="button"
  tabindex="0"
  {...{disabled: loading || disabled}}
  {...$$restProps}
>
  <slot />
  {#if loading}
    <div class="flex justify-center items-center absolute inset-0 bg-background-button/30 rounded-full">
      <Spinner class="size-6" />
    </div>
  {/if}
</svelte:element>
