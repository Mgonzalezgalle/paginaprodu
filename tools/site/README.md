# Generador del sitio

Las páginas HTML de la raíz se generan con este script. No las edites a mano.

```bash
node tools/site/build.mjs
```

- `lib.mjs`: cabecera, pie, componentes y utilidades (lee el tamaño real de cada JPEG).
- `build.mjs`: contenido de cada página.
- Estilos en `assets/site.css`, comportamiento en `assets/site.js`.
- Imágenes en `assets/img/`: capturas de la app de Produ Finanzas en modo demo (datos de ejemplo).
