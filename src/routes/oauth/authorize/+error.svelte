<script>
  import ErrorPage from "$lib/components/error/ErrorPage.svelte";
  import {page} from "$app/stores";
</script>

<ErrorPage
  description="Скорее всего приложение отправило в Bonfire неправильные данных. Либо проблемы на нашей стороне, такое тоже бывает."
  descriptionSecondary="Вот что сервер может сказать по этому поводу: {$page.error?.message || '?!'}"
/>
