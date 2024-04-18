<script>
  import SvelteSeo from "svelte-seo";
  import NavigationBar from "$lib/components/navigation/NavigationBar.svelte";
  import NavigationItem from "$lib/components/navigation/NavigationItem.svelte";

  /** @type {string | null} */
  let loginStatus = null;

  /** @type {string | null} */
  let requestType = null;

  $: if (loginStatus !== null) {
    requestType = null;
  }
</script>

<SvelteSeo
  title="Поддержка Bonfire"
  description="Помогите нам решить ваши проблемы с Bonfire!"
/>

<div class="mx-auto px-4 pt-24 pb-36 text-text-950 prose prose-bonfire lg:prose-xl">
  <h1>Помощь с Bonfire</h1>
  <p>
    Пожалуйста, заполните небольшую форму, чтобы вас направило куда надо.
    Так вопрос получится решить быстрее.
  </p>

  <h3>
    Вы можете войти в свой аккаунт и дойти до ленты?
  </h3>
  <NavigationBar>
    <NavigationItem on:click={() => loginStatus = "yes"} active={loginStatus === "yes"}>
      Могу
    </NavigationItem>
    <NavigationItem on:click={() => loginStatus = "no"} active={loginStatus === "no"}>
      Не могу
    </NavigationItem>
    <NavigationItem on:click={() => loginStatus = "unwanted"} active={loginStatus === "unwanted"}>
      Не хочу
    </NavigationItem>
  </NavigationBar>

  {#if loginStatus === "yes"}
    <h3>По какому поводу вы обращаетесь?</h3>

    <NavigationBar>
      <NavigationItem on:click={() => requestType = "serious"} active={requestType === "serious"}>
        Серьёзный баг
      </NavigationItem>
      <NavigationItem on:click={() => requestType = "bug"} active={requestType === "bug"}>
        Баг или запрос фичи
      </NavigationItem>
      <NavigationItem on:click={() => requestType = "content"} active={requestType === "content"}>
        Проблема с контентом
      </NavigationItem>
    </NavigationBar>
  {:else if loginStatus === "no"}
    <h3>По какому поводу вы обращаетесь?</h3>

    <NavigationBar>
      <NavigationItem on:click={() => requestType = "serious"} active={requestType === "serious"}>
        Серьёзный баг
      </NavigationItem>
      <NavigationItem on:click={() => requestType = "network"} active={requestType === "network"}>
        Нет подключения
      </NavigationItem>
      <NavigationItem on:click={() => requestType = "install"} active={requestType === "install"}>
        Проблемы с установкой
      </NavigationItem>
    </NavigationBar>
  {:else if loginStatus === "unwanted"}
    <h3>По какому поводу вы обращаетесь?</h3>

    <NavigationBar>
      <NavigationItem on:click={() => requestType = "sit"} active={requestType === "sit"}>
        Сит плохой
      </NavigationItem>
      <NavigationItem on:click={() => requestType = "content"} active={requestType === "content"}>
        Проблема с контентом
      </NavigationItem>
    </NavigationBar>
  {/if}

  {#if requestType === "serious" || requestType === "network" || requestType === "install"}
    {#if requestType === "network"}
      <p>
        Во-первых, попробуйте несколько раз повторить вход в приложение.
        Проверьте, можете ли вы снова войти в аккаунт, используя
        кнопку "Сменить аккаунт".
      </p>
      <p>
        Если ничего не помогает, свяжитесь по следующим контактам. Скажите,
        что это срочно.
      </p>
    {:else}
      <p>
        Если баг затрагивает ключевые возможности Bonfire или препятствует
        нормальному использованию приложения, то обращайтесь по этим контактам:
      </p>
    {/if}
    <ul>
      {#if loginStatus === "yes"}
        <li>Bonfire: <a href="https://bonfire.moe/r/sit">@sit</a></li>
      {/if}
      <li>Discord: @sitsh</li>
      <li>Telegram: <a href="https://t.me/sitting33">@sitting33</a></li>
    </ul>

    <p>
      Если проблема не настолько серьёзная, то пишите сюда:
    </p>
    <ul>
      <li>Email: <a href="mailto:me@bonfire.moe">me@bonfire.moe</a></li>
      {#if loginStatus === "yes"}
        <li>Bonfire: <a href="https://bonfire.moe/r/ContentGuy">@ContentGuy</a></li>
      {/if}
    </ul>
  {:else if requestType === "bug"}
    <p>
      Опишите проблему боту <a href="https://bonfire.moe/r/ContentGuy">@ContentGuy</a>
      в Bonfire. Для этого напишите ему <code>bug</code>, после чего опишите баг или
      функционал, который вы хотите увидеть.
    </p>
  {:else if requestType === "content"}
    {#if loginStatus === "yes"}
      <p>
        Попробуйте использовать встроенную функцию жалобы на публикацию.
        Нажмите на три точки в правом верхнем углу поста или нажмите и удерживайте
        на других видах публикаций, после чего выберите пункт "Жалоба".
      </p>
    {/if}

    <p>
      Если ваш запрос особенно срочный (например, затрагивает личную информацию и
      другие виды чувствительных данных), напишите по этим контактам:
    </p>
    <ul>
      {#if loginStatus === "yes"}
        <li>Bonfire: <a href="https://bonfire.moe/r/sit">@sit</a></li>
      {/if}
      <li>Email: <a href="mailto:me@bonfire.moe">me@bonfire.moe</a></li>
      <li>Discord: @sitsh</li>
    </ul>
  {:else if requestType === "sit"}
    <p>Problem?</p>

    <img src="https://media1.tenor.com/m/O2uhj3kkhq0AAAAC/troll.gif" alt="">
    <small>
      <a href="https://tenor.com/view/troll-gif-20307589">Troll GIF</a> from <a href="https://tenor.com">Tenor</a>
    </small>
  {/if}
</div>
