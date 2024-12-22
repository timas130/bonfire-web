<script>
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import SvelteSeo from "svelte-seo";
  import AuthBlock from "$lib/components/auth/AuthBlock.svelte";
  import AuthHeading from "$lib/components/auth/AuthHeading.svelte";
  import AuthOr from "$lib/components/auth/AuthOr.svelte";
  import Input from "$lib/components/input/Input.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import {cache, graphql} from "$houdini";
  import {goto, invalidateAll} from "$app/navigation";
  import {tick} from "svelte";
  import {page} from "$app/stores";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import googleSvg from "./google.svg";
  import CircleLogo from "$lib/components/logo/CircleLogo.svelte";
  import {Link2Icon} from "lucide-svelte";
  import OAuthAvatar from "$lib/components/auth/OAuthAvatar.svelte";
  import Alert from "$lib/components/alert/Alert.svelte";
  import {slide} from "svelte/transition";

  $: oauthName = $page.url.searchParams.get("oauthName");
  $: redirectUrl = $page.url.searchParams.get("redirectUrl");

  export let form;

  $: error = form?.error[0]?.message;
  $: errorCode = (error?.split(":") || ["?"])[0];

  /** @type {string | null} */
  let loading = null;
  let email = form?.email || "";

  /** @type {null | string} */
  let socialError = null;

  const oauthUrlQuery = graphql(`
      query OAuthUrlQuery($provider: OauthProvider!) {
          oauthUrl(provider: $provider) {
              url
          }
      }
  `);

  /**
   * @param {"GOOGLE"} provider
   */
  async function loginWith(provider) {
    if (loading === provider) return;
    loading = provider;
    socialError = null;

    let resp;
    try {
      resp = await oauthUrlQuery.fetch({variables: {provider}});
    } catch (e) {
      socialError = e.toString();
      return;
    } finally {
      loading = null;
    }

    if (resp.errors || !resp.data) {
      socialError = resp.errors?.[0]?.message || "Ошибка";
      loading = null;
      return;
    }

    document.cookie = `bf_authRedirectUrl=${encodeURIComponent(redirectUrl || $page.url.toString())}; `
      + `Secure; SameSite=Lax; Path=/`;
    location.href = resp.data.oauthUrl.url;
  }
</script>

<SvelteSeo
  title="Вход | Bonfire"
  description="Войдите в свой аккаунт Bonfire, чтобы получить доступ ко всем возможностям"
/>

<CenteredPage>
  <AuthBlock enhanceFn={() => {
    loading = "login";
    return async ({result, update}) => {
      loading = null;
      if (result.type === "redirect") {
        cache.markStale();
        invalidateAll()
          .then(() => tick())
          .then(() => goto(result.location));
      } else {
        return update();
      }
    }
  }}>
    <div slot="logo" class="flex justify-center items-center gap-4 text-text">
      <CircleLogo />
      {#if oauthName}
        <Link2Icon />
        <OAuthAvatar name={oauthName} />
      {/if}
    </div>

    <AuthHeading>
      {#if oauthName}
        Чтобы войти в {oauthName},<br />
        войдите в Bonfire
      {:else}
        Вход в Bonfire
      {/if}
    </AuthHeading>
    <Input
      outlined
      class="pt-4"
      label="Email"
      name="email"
      type="email"
      autocomplete="email"
      required
      error={
        errorCode === "WrongEmail" ?
          "Такого email'а не существует. Проверьте своё написание." :
        errorCode === "NotVerified" ?
          "Этот email-аккаунт не подтверждён." :
        null
      }
      bind:value={email}
    />
    <Input
      outlined
      class="pt-4"
      label="Пароль"
      name="password"
      type="password"
      autocomplete="current-password"
      error={
        errorCode === "WrongPassword" ?
          "Неверный пароль. Его можно сбросить в приложении." :
        error || null
      }
      required
    />
    <input type="hidden" name="redirectUrl" value={redirectUrl} />

    <div class="flex justify-between pt-4 w-full">
      <Button el="a" href="/auth/register">Регистрация</Button>
      <Button variant="primary" type="submit" loading={loading === "login"}>Войти</Button>
    </div>

    <AuthOr>Или войти через</AuthOr>

    {#if socialError}
      <div transition:slide>
        <Alert>{socialError}</Alert>
      </div>
    {/if}

    <div class="flex justify-center gap-2">
      <IconButton
        size="social"
        variant="social"
        type="button"
        loading={loading === "GOOGLE"}
        on:click={() => loginWith("GOOGLE")}
      >
        <img class="size-6" src={googleSvg} alt="Google">
      </IconButton>
    </div>
  </AuthBlock>
</CenteredPage>
