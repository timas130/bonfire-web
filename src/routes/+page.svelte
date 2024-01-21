<script>
  import HeroBackground from "$lib/components/hero/HeroBackground.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import SvelteSeo from "svelte-seo";
  import Container from "$lib/components/Container.svelte";
</script>

<SvelteSeo
  title="Bonfire &mdash; соединяем увлечения"
  description="Bonfire &mdash; новая социальная сеть для сообществ по играм, фильмам, книгам и не только! В Bonfire каждый может выразить себя и быть замеченным единомышленниками."
/>

<div class="relative w-full">
  <HeroBackground />
  <Container class="px-0">
    <div class="relative z-10 max-w-4xl pt-20 pb-48 px-4 text-text-950">
      <h1 class="text-6xl font-bold pt-40 pb-8">Bonfire &mdash; соединяем увлечения!</h1>
      <p class="text-3xl font-medium pb-10">
        Bonfire &mdash; платформа для увлечённых сообществ по играм, книгам, фильмам и многому другому.
      </p>
      <Button el="a" href="/download" size="big" variant="hero">
        Скачать приложение
      </Button>
    </div>
  </Container>
</div>
