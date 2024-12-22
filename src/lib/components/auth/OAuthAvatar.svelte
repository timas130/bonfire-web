<script>
  export let name;

  $: firstLetter = name.charAt(0).toUpperCase();
</script>

<div class="size-12 rounded-full flex items-center justify-center bg-background-surface-lighter text-xl font-bold">
  {firstLetter}
</div>
