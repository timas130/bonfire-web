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

<SvelteSeo title="Восстановление электронной почты | Bonfire" />

<CenteredPage>
  <AuthForm>
    {#if data.success}
      <AuthHeading>Адрес восстановлен</AuthHeading>
      <AuthText>
        Мы восстановили ваш адрес электронной почты на тот,
        что был до изменения. Мы также вышли со всех устройств
        и браузеров, чтобы обезопасить аккаунт. Если вы не
        знаете, кто изменил адрес электронной почты вашего
        аккаунта, то вам следует срочно изменить пароль в
        приложении.
      </AuthText>
    {:else}
      <AuthHeading>Возникла ошибка</AuthHeading>
      <AuthText>
        Ваш адрес не удалось восстановить. Возможно, срок
        действия ссылки истёк. Напишите нам на
        <a href="mailto:me@bonfire.moe">me@bonfire.moe</a>,
        если вам нужна помощь.
      </AuthText>
    {/if}
    <Button el="a" href="bf://whatever" class="w-full mt-4">
      В приложение
    </Button>
  </AuthForm>
</CenteredPage>
