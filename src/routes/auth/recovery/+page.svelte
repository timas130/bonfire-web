<script>
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import AuthBlock from "$lib/components/auth/AuthBlock.svelte";
  import AuthHeading from "$lib/components/auth/AuthHeading.svelte";
  import AuthText from "$lib/components/auth/AuthText.svelte";
  import {enhance} from "$app/forms";
  import Input from "$lib/components/input/Input.svelte";
  import Button from "$lib/components/button/Button.svelte";

  /** @type {import("./$types").PageData} */
  export let data;

  /** @type {import("./$types").ActionData} */
  export let form;

  $: error = Array.isArray(form?.error) ? form?.error[0]?.message : null;
  $: errorCode = (error?.split(":") || [null])[0];

  let loading = false;
</script>

<CenteredPage>
  <AuthBlock>
    {#if data.loadError}
      <AuthHeading>Ссылка просрочена</AuthHeading>
      <AuthText>
        Похоже, что эта ссылка для сброса пароля уже
        не работает. Скорее всего её срок действия истёк.
        Попробуйте создать новую ссылку.
      </AuthText>
    {:else}
      <AuthHeading>Сброс пароля</AuthHeading>
      <AuthText>Вы сбрасываете пароль для <b class="font-bold">@{data.username}</b>.</AuthText>
      <form class="w-full pt-4" method="post" use:enhance={() => {
        loading = true;
        return ({update}) => {
          loading = false;
          return update();
        };
      }}>
        <Input
          name="password"
          type="password"
          label="Новый пароль"
          autocomplete="new-password"
          required
          error={
            errorCode === "InvalidPassword" ?
              "Пароль слишком короткий. Минимум 8 символов." :
            errorCode === "RecoveryTokenInvalid" ?
              "Пока вы придумывали новый пароль, эта ссылка истекла. Попробуйте начать с начала" :
            errorCode ?
              "Неизвестная ошибка. Такого быть не должно." :
            null
          }
        />

        <div class="text-right">
          <Button type="submit" class="mt-2" {loading}>
            Сбросить пароль
          </Button>
        </div>
      </form>
    {/if}
  </AuthBlock>
</CenteredPage>
