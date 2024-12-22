<script>
  import HeroBackground from "$lib/components/hero/HeroBackground.svelte";
  import CenteredPage from "$lib/components/auth/CenteredPage.svelte";
  import AuthBlock from "$lib/components/auth/AuthBlock.svelte";
  import AuthHeading from "$lib/components/auth/AuthHeading.svelte";
  import SvelteSeo from "svelte-seo";
  import CircleLogo from "$lib/components/logo/CircleLogo.svelte";
  import {BadgeHelp, Link2Icon, VerifiedIcon} from "lucide-svelte";
  import OAuthAvatar from "$lib/components/auth/OAuthAvatar.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import Alert from "$lib/components/alert/Alert.svelte";
  import {slide} from "svelte/transition";

  export let data;
  export let form;

  $: error = form?.error[0]?.message;
  $: errorCode = (error?.split(":") || ["?"])[0];

  /** @type {Record<string, string>} */
  const scopes = {
    "profile": "Просматривать ваш ник, аватарку, пол и др. элементы профиля",
    "email": "Просматривать ваш email",
    "offline_access": "Постоянный доступ, даже когда вы оффлайн",
  };

  let isLoading = false;
</script>

<SvelteSeo
  title="Вход в {data.client.displayName} | Bonfire"
  noindex
  nofollow
/>

<HeroBackground />
<CenteredPage>
  <AuthBlock enhanceFn={() => {
    isLoading = true;
    return async ({result, update}) => {
      isLoading = false;
      if (result.type === "redirect") {
        location.href = result.location;
      } else {
        return update();
      }
    }
  }}>
    <div slot="logo" class="flex justify-center items-center gap-4 text-text">
      <CircleLogo />
      <Link2Icon />
      <OAuthAvatar name={data.client.displayName} />
    </div>

    <AuthHeading>
      Вход в {data.client.displayName}
      {#if data.client.official}
        <VerifiedIcon class="inline-block text-accent-success align-bottom -translate-y-1" />
      {/if}
      через Bonfire
    </AuthHeading>

    <p class="text-text text-lg">
      Приложение "{data.client.displayName}" запрашивает следующие разрешения:
    </p>
    <ul class="pt-2 pb-4 list-disc list-outside ps-6 text-text">
      {#each data.scopes as scope (scope)}
        {#if scopes[scope]}
          <li>{scopes[scope]}</li>
        {:else if scope !== "openid"}
          <li>Неизвестное разрешение: {scope}</li>
        {/if}
      {/each}
    </ul>

    {#if data.client.official}
      <p class="text-text w-full p-2 bg-accent-success/20 rounded-lg flex gap-2">
        <VerifiedIcon class="text-accent-success inline-block shrink-0" />
        Это официальное приложение Bonfire. Оно безопасно.
      </p>
    {:else}
      <p class="text-text w-full p-2 bg-accent/20 rounded-lg flex gap-2">
        <BadgeHelp class="text-accent inline-block shrink-0" />
        Это приложение не имеет отношения к Bonfire. Пожалуйста, убедитесь, что
        вы доверяете его разработчику.
      </p>
    {/if}

    <p class="py-2 text-text-secondary prose prose-bonfire leading-6">
      Продолжая вход, вы соглашаетесь с
      <a href={data.client.privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
        политикой конфиденциальности
      </a>
      {#if data.client.tosUrl}
        и
        <a href={data.client.tosUrl} target="_blank" rel="noopener noreferrer">
          условиями использования
        </a>
      {/if}
      этого приложения.
    </p>

    <input type="hidden" name="flowId" value={data.flowId} />

    {#if error}
      <div transition:slide>
        <Alert>
          {#if errorCode === "FlowExpired"}
            Вы слишком долго думали над этим. Перезагрузите страницу.
          {:else}
            {error}
          {/if}
        </Alert>
      </div>
    {/if}

    <div class="flex w-full gap-2">
      <Button type="button" class="w-full" on:click={() => history.back()}>
        Отмена
      </Button>
      <Button variant="success" class="w-full" loading={isLoading}>
        Продолжить
      </Button>
    </div>
  </AuthBlock>
</CenteredPage>
