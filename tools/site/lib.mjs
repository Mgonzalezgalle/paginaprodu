import fs from "node:fs";

export const APP = "https://finanzas.produ.cl";
const ROOT = new URL("../../", import.meta.url).pathname;

/* tamaño de un JPEG leyendo su cabecera */
export function jpegSize(file) {
  const b = fs.readFileSync(file);
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error("sin tamaño: " + file);
}

/* <img> con dimensiones reales; con frame=true añade el borde de ventana */
export function img(name, alt, { frame = true, cls = "" } = {}) {
  const [w, h] = jpegSize(`${ROOT}assets/img/${name}.jpg`);
  const tag = `<img src="assets/img/${name}.jpg" alt="${alt}" width="${w}" height="${h}" loading="lazy">`;
  return frame ? `<div class="shot ${cls}">${tag}</div>` : tag;
}
export const fig = (name, alt, cap = "", opts) => `<figure>${img(name, alt, opts)}${cap ? `<figcaption class="shot-cap">${cap}</figcaption>` : ""}</figure>`;
export const phone = (name, alt, cap = "") => `<figure class="phone-fig"><div class="phone">${img(name, alt, { frame: false })}</div>${cap ? `<figcaption>${cap}</figcaption>` : ""}</figure>`;

export const logo = () => `<span class="logo"><b>produ<i></i></b><small>Finanzas</small></span>`;

export const NAV = [
  ["soluciones.html", "Soluciones"],
  ["funcionalidades.html", "Funcionalidades"],
  ["cobranza.html", "Cobranza"],
  ["portal.html", "Portal"],
  ["paises.html", "Países", [["cl.html", "Chile"], ["pe.html", "Perú"], ["mx.html", "México"]]],
  ["integraciones.html", "Integraciones"],
  ["precios.html", "Precios"],
];

function header(cur) {
  const links = NAV.map(([href, label, sub]) => sub
    ? `<div class="dd"><button type="button" aria-haspopup="true">${label}</button><div class="dd-menu"><a href="${href}">Todos</a>${sub.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</div></div>`
    : `<a href="${href}"${href === cur ? ' class="on"' : ""}>${label}</a>`).join("");
  const drawer = NAV.map(([href, label, sub]) =>
    `<a href="${href}">${label}</a>` + (sub ? `<div class="sub">${sub.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</div>` : "")).join("");
  return `<header class="top"><div class="wrap">
<a href="index.html" aria-label="Produ Finanzas, inicio">${logo()}</a>
<nav class="nav" aria-label="Principal">${links}</nav>
<div class="cta"><a class="txt" href="${APP}">Ingresar</a><a class="btn btn-blue" href="contacto.html">Agenda una demo</a>
<button class="burger" type="button" data-burger aria-label="Abrir menú" aria-expanded="false"><span></span></button></div>
</div></header>
<div class="drawer">${drawer}<a href="seguridad.html">Seguridad</a><a href="preguntas.html">Preguntas frecuentes</a><a href="contacto.html">Contacto</a><a class="btn btn-line" href="${APP}">Ingresar</a><a class="btn btn-blue" href="contacto.html">Agenda una demo</a></div>`;
}

const footer = () => `<footer class="foot"><div class="wrap">
<div class="fgrid">
<div>${logo()}<p>Cuentas por cobrar, por pagar y tesorería para empresas de Chile, Perú y México. Un producto de <a href="https://produ.cl" style="text-decoration:underline">Produ</a></p></div>
<div><h4>Producto</h4><a href="soluciones.html">Soluciones</a><a href="funcionalidades.html">Funcionalidades</a><a href="cobranza.html">Cobranza</a><a href="portal.html">Portal de clientes</a><a href="integraciones.html">Integraciones</a></div>
<div><h4>Países</h4><a href="cl.html">Chile</a><a href="pe.html">Perú</a><a href="mx.html">México</a></div>
<div><h4>Más</h4><a href="seguridad.html">Seguridad</a><a href="precios.html">Precios</a><a href="preguntas.html">Preguntas frecuentes</a><a href="contacto.html">Contacto</a><a href="${APP}">Ingresar a la app</a></div>
</div>
<div class="fbot"><span>© ${new Date().getFullYear()} Produ</span></div>
</div></footer>`;

export function page({ file, title, desc, body }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:locale" content="es_CL">
<meta name="theme-color" content="#ffffff">
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
${header(file)}
<main>
${body}
</main>
${footer()}
<script src="assets/site.js" defer></script>
</body>
</html>
`;
}

/* ---- bloques ---- */
export const pageHead = (h1, p) => `<section class="page-head"><div class="wrap"><h1>${h1}</h1>${p ? `<p>${p}</p>` : ""}</div></section>`;
export const sec = (body, cls = "") => `<section class="s ${cls}"><div class="wrap">${body}</div></section>`;
export const head = (h, p = "", cls = "") => `<div class="vhead ${cls}"><h2>${h}</h2>${p ? `<p>${p}</p>` : ""}</div>`;
export const chips = items => `<ul class="chips">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
export const lnk = (href, t) => `<a class="link" href="${href}">${t}</a>`;
export const defs = items => `<dl class="defs">${items.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("")}</dl>`;
export const faq = items => `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;

/* fila imagen + texto breve */
export const feature = ({ id = "", title, text, chip = [], link = "", visual, flip = false, wide = false }) =>
  `<div ${id ? `id="${id}" ` : ""}class="feat${flip ? " flip" : ""}${wide ? " wide" : ""}" style="scroll-margin-top:90px"><div class="feat-t"><h2>${title}</h2>${text ? `<p>${text}</p>` : ""}${chip.length ? chips(chip) : ""}${link}</div><div class="feat-v">${visual}</div></div>`;

export const closing = (h = "¿Lo vemos con tu operación?", p = "") => `<section class="close"><div class="wrap"><h2>${h}</h2>${p ? `<p>${p}</p>` : ""}<div class="btns"><a class="btn btn-blue btn-lg" href="contacto.html">Agenda una demo</a><a class="link" href="${APP}">Ingresar a la app</a></div></div></section>`;

/* tarjetas de documento por país (visual propio, sin datos reales) */
export const docCard = ({ code, country, kind, id, idLabel, lines, tax, note, accent }) => `<div class="docc" style="--acc:${accent}">
<div class="docc-top"><span class="docc-code">${code}</span><span>${country}</span></div>
<div class="docc-kind">${kind}</div>
<div class="docc-id"><small>${idLabel}</small>${id}</div>
<div class="docc-lines">${lines.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join("")}</div>
<div class="docc-tax">${tax}</div>
${note ? `<div class="docc-note">${note}</div>` : ""}
</div>`;
