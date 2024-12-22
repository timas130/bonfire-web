<script>
  import CircleLogo from "$lib/components/logo/CircleLogo.svelte";
  import NavigationBar from "$lib/components/navigation/NavigationBar.svelte";
  import NavigationItem from "$lib/components/navigation/NavigationItem.svelte";
  import {page} from "$app/stores";
  import Container from "$lib/components/Container.svelte";
</script>

<div class="w-full fixed z-30">
  <Container el="nav" class="h-20 flex items-center justify-between">
    <a href="/" class="active:scale-90 transition rounded-full">
      <CircleLogo />
    </a>

    <NavigationBar>
      <NavigationItem active={$page.url.pathname === "/"} href="/">Главная</NavigationItem>
      <NavigationItem href="/download">Скачать</NavigationItem>
      <!--
        <NavigationItem href="/fandoms">Фэндомы</NavigationItem>
        <NavigationItem href="/account">Мой аккаунт</NavigationItem>
      -->
    </NavigationBar>

    <!-- <Button el="a" href="/auth/login" size="nav">
      <LogInIcon slot="icon" />
      Войти
    </Button> -->
  </Container>
</div>
