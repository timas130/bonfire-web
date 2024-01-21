<script>
  import AuthBackground from "$lib/components/auth/AuthBackground.svelte";
  import CircleLogo from "$lib/components/logo/CircleLogo.svelte";
</script>

<div class="max-w-md w-full bg-background-100 p-8 rounded-xl relative">
  <AuthBackground />
  <div class="relative flex flex-col items-center w-full">
    <CircleLogo />
    <slot />
  </div>
</div>
