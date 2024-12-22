<script>
  /** @type {string} */
  export let href;
</script>

<a class="text-text hover:text-primary-600 transition" {href} {...$$restProps}>
  <slot />
</a>
