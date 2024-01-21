<script>
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import AuthBlock from "$lib/components/auth/AuthBlock.svelte";
  import {page} from "$app/stores";
  import AuthText from "$lib/components/auth/AuthText.svelte";
  import Button from "$lib/components/button/Button.svelte";

  $: link = $page.params.link;
</script>

<CenteredPage>
  <AuthBlock>
    <AuthText>
      Пока сайт Bonfire в разработке, вы можете открыть
      <b>@{link}</b> только в приложении.
    </AuthText>
    <Button class="mt-6 w-full" el="a" href="bf://link/{link}" variant="primary">
      Открыть в Bonfire
    </Button>
    <Button class="mt-2 w-full" el="a" href="/download" variant="text">
      Скачать приложение
    </Button>
  </AuthBlock>
</CenteredPage>
