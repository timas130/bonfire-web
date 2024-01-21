<script>
  import SvelteSeo from "svelte-seo";
  import HeroBackground from "$lib/components/hero/HeroBackground.svelte";
  import Button from "$lib/components/button/Button.svelte";
</script>

<SvelteSeo
  title="Скачать Bonfire"
  description="Скачайте Bonfire для Android с официального сайта. Bonfire &mdash; новая социальная сеть для сообществ по играм, фильмам, книгам и не только!"
/>

<div class="relative w-full">
  <HeroBackground />
  <div class="relative z-10 max-w-5xl w-full pt-20 pb-36 px-4 mx-auto text-text-950">
    <h1 class="text-4xl sm:text-5xl lg:text-8xl font-bold pt-40 pb-8">Присоединяйся!</h1>
    <p class="text-3xl font-medium pb-10">
      Откройте для себя мир общения, идей и вдохновения. Загрузите Bonfire сейчас!
    </p>
    <div class="flex flex-wrap gap-2">
      <Button el="a" href="/download" size="big" variant="hero">
        Google Play
      </Button>
      <Button el="a" href="/bonfire2.apk" size="big">
        Скачать APK
      </Button>
    </div>

    <h2 class="text-2xl font-bold pt-32">Почему нет версий для других ОС?</h2>
    <p class="text-lg pt-4">
      Во-первых, Bonfire разрабатывается одним человеком, и у меня просто
      нет таких ресурсов, чтобы писать одно огромное приложение сразу для
      нескольких платформ. Во-вторых, приложение изначально создавалось
      только для Android, и поэтому портировать его даже в браузер довольно
      проблематично.
    </p>
    <p class="text-lg pt-2">
      К счастью, веб-версия Bonfire уже находится в разработке, и рано или
      поздно вы сможете присоединиться и без устройства Android.
    </p>
  </div>
</div>
