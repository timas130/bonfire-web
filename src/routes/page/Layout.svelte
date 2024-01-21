<script>
  import Container from "$lib/components/Container.svelte";
  import SvelteSeo from "svelte-seo";

  /** @type {string} */
  export let title;
  /** @type {string} */
  export let description;
</script>

<SvelteSeo {title} {description} />

<Container>
  <div class="mx-auto py-24 prose prose-bonfire lg:prose-xl">
    <h1 class="break-words">{title}</h1>
    <slot />
  </div>
</Container>
