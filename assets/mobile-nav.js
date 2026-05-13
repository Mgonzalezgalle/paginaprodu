(() => {
  const toggle = document.querySelector("[data-mobile-nav-toggle]");
  const drawer = document.querySelector("[data-mobile-nav-drawer]");
  const close = document.querySelector("[data-mobile-nav-close]");
  const backdrop = document.querySelector("[data-mobile-nav-backdrop]");
  if (!toggle || !drawer || !close || !backdrop) return;

  const setOpen = open => {
    document.body.classList.toggle("mobile-nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", () => {
    setOpen(!document.body.classList.contains("mobile-nav-open"));
  });
  close.addEventListener("click", () => setOpen(false));
  backdrop.addEventListener("click", () => setOpen(false));
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setOpen(false);
  });
})();
