<script>
  import backgroundImg from "./background.jpg";
  import Button from "$lib/components/button/Button.svelte";
  import {page} from "$app/stores";

  export let title = $page.status === 404 ? "Не найдено" : "Фатальная ошибка";
  export let description = $page.status === 404 ?
    "Похоже, этой страницы не существует." :
    "Что-то пошло не так на этой странице. Попробуйте её перезагрузить.";
  export let descriptionSecondary = $page.status === 404 ?
    "Или мы не можем вам о ней рассказать." :
    "Или больше так не делайте.";
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
  <div class="flex flex-col items-start justify-center px-4 lg:px-12 bg-background-surface text-text">
    <p class="text-primary-500 font-bold text-lg lg:text-xl pb-2">{$page.status}</p>
    <h1 class="font-bold text-2xl lg:text-5xl">{title}</h1>
    <p class="text-lg lg:text-xl pt-6 pb-8">
      {description}
      <span class="opacity-70">{descriptionSecondary}</span>
    </p>

    <div class="flex flex-wrap gap-2">
      <Button el="a" href="/">
        На главную
      </Button>
    </div>
  </div>
  <div class="hidden lg:block relative overflow-hidden">
    <img
      class="absolute overflow-hidden top-1/2 -translate-y-1/2 opacity-70"
      src={backgroundImg}
      alt=""
      aria-hidden="true"
    >
  </div>
</div>
