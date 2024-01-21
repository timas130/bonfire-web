<script>
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import SvelteSeo from "svelte-seo";
  import AuthForm from "$lib/components/auth/AuthBlock.svelte";
  import AuthHeading from "$lib/components/auth/AuthHeading.svelte";
  import Input from "$lib/components/input/Input.svelte";
  import Button from "$lib/components/button/Button.svelte";
</script>

<SvelteSeo
  title="Вход | Bonfire"
  description="Войдите в свой аккаунт Bonfire, чтобы получить доступ ко всем возможностям"
/>

<CenteredPage>
  <AuthForm>
    <AuthHeading>Вход в Bonfire</AuthHeading>
    <Input class="pt-8" label="Email" name="email" type="email" autocomplete="email" required />
    <Input class="pt-4" label="Пароль" name="password" type="password" autocomplete="current-password" required />

    <div class="flex justify-between pt-4 w-full">
      <Button el="a" href="/auth/register">Регистрация</Button>
      <Button variant="primary" type="submit">Войти</Button>
    </div>
  </AuthForm>
</CenteredPage>
