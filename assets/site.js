(() => {
  const burger = document.querySelector("[data-burger]");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = document.body.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".drawer a").forEach(a =>
      a.addEventListener("click", () => document.body.classList.remove("open")));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") document.body.classList.remove("open");
    });
  }

  const form = document.querySelector("form[data-contact]");
  if (form) {
    const msg = form.querySelector(".msg");
    const show = text => { msg.textContent = text; msg.style.display = "block"; };
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        show("El formulario aún no está activo. Mientras tanto, puedes ingresar o crear tu cuenta en finanzas.produ.cl.");
        return;
      }
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        show("¡Gracias! Recibimos tu mensaje y te contactaremos pronto.");
      } catch {
        show("No pudimos enviar el mensaje. Inténtalo de nuevo en unos minutos.");
      }
    });
  }
})();
