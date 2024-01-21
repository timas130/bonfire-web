<script>
  import "../global.css";
  import Navigation from "$lib/components/navigation/Navigation.svelte";
  import {onDestroy} from "svelte";
  import {browser} from "$app/environment";
  import Footer from "$lib/components/footer/Footer.svelte";

  let theme = "dark";

  function switchTheme() {
    if (theme === "dark") theme = "light";
    else theme = "dark";
  }

  /** @param ev {KeyboardEvent} */
  function onKeyDown(ev) {
    if (ev.altKey && ev.shiftKey && ev.key === "T") {
      switchTheme()
      ev.preventDefault();
    }
  }

  if (browser) {
    window.addEventListener("keydown", onKeyDown);
    onDestroy(() => window.removeEventListener("keydown", onKeyDown));
  }
</script>

<div class="min-h-full {theme} bg-background-50">
  <Navigation />
  <slot />
  <Footer />
</div>
