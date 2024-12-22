<script>
  import Container from "$lib/components/Container.svelte";
  import FooterLink from "$lib/components/footer/FooterLink.svelte";
</script>

<Container el="footer" class="">
  <div class="flex flex-col lg:flex-row justify-center items-center group gap-6 text-lg py-6 opacity-70 hover:opacity-100 transition">
    <FooterLink href="/page/privacy">Политика конфиденциальности</FooterLink>
    <FooterLink href="/page/terms">Условия использования</FooterLink>
    <FooterLink href="/page/copyright">Для правообладателей</FooterLink>
    <FooterLink href="/help">Помощь и поддержка</FooterLink>
  </div>
  <div class="text-center text-text/60 pb-6">
    &copy; {new Date().getFullYear()} Bonfire Studio
  </div>
</Container>
