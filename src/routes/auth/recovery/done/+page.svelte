<script>
  import SvelteSeo from "svelte-seo";
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import AuthForm from "$lib/components/auth/AuthBlock.svelte";
  import AuthHeading from "$lib/components/auth/AuthHeading.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import AuthText from "$lib/components/auth/AuthText.svelte";
</script>

<SvelteSeo
  title="Пароль изменён | Bonfire"
  description="Пароль от вашего аккаунта Bonfire успешно изменён."
/>

<CenteredPage>
  <AuthForm>
    <AuthHeading>Пароль изменён</AuthHeading>
    <AuthText>
      Ваш пароль сброшен. Мы также вышли из вашего аккаунта
      на всех устройствах.
    </AuthText>

    <Button el="a" href="bf://whatever" class="w-full mt-4 mb-2">В приложение</Button>
  </AuthForm>
</CenteredPage>
