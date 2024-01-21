<script>
  import SvelteSeo from "svelte-seo";
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import AuthForm from "$lib/components/auth/AuthBlock.svelte";
  import AuthHeading from "$lib/components/auth/AuthHeading.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import AuthText from "$lib/components/auth/AuthText.svelte";

  /** @type {import("./$types").PageData} */
  export let data;
</script>

<SvelteSeo title="Адрес подтверждён | Bonfire" />

<CenteredPage>
  <AuthForm>
    {#if data.success}
      <AuthHeading>Адрес подтверждён</AuthHeading>
      <AuthText>
        Адрес вашей электронной почты успешно подтверждён, и
        теперь вы можете вернуться и войти в свой аккаунт.
      </AuthText>
    {:else}
      <AuthHeading>Возникла ошибка</AuthHeading>
      <AuthText>
        Нам не получилось подтвердить ваш адрес электронной
        почты. Попробуйте ещё раз или нажмите "Переотправить
        письмо" в приложении.
      </AuthText>
    {/if}
    <Button el="a" href="bf://whatever" class="w-full mt-4">
      В приложение
    </Button>
  </AuthForm>
</CenteredPage>
