<script>
  import SvelteSeo from "svelte-seo";
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import AuthForm from "$lib/components/auth/AuthBlock.svelte";
  import AuthHeading from "$lib/components/auth/AuthHeading.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import AuthText from "$lib/components/auth/AuthText.svelte";
</script>

<SvelteSeo
  title="Скачайте приложение для регистрации | Bonfire"
  description="Чтобы зарегистрироваться в Bonfire, необходимо скачать приложение."
/>

<CenteredPage>
  <AuthForm>
    <AuthHeading>Регистрация недоступна</AuthHeading>
    <AuthText>
      Так как у нас ещё нет полноценного сайта, для регистрации вам придётся
      использовать приложение.
    </AuthText>

    <Button el="a" href="/download" class="w-full mt-4 mb-2">Скачать приложение</Button>
    <Button el="a" href="/auth/login" class="w-full" variant="text">Войти</Button>
  </AuthForm>
</CenteredPage>
