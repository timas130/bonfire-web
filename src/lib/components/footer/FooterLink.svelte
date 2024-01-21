<script>
  /** @type {string} */
  export let href;
</script>

<a class="text-text-900 hover:text-primary-600 transition" {href} {...$$restProps}>
  <slot />
</a>
