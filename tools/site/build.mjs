// Genera las páginas HTML de la raíz del repo. Uso: node tools/site/build.mjs
import fs from "node:fs";
import path from "node:path";
import { APP, img, fig, phone, page, pageHead, sec, head, chips, lnk, defs, faq, feature, closing, docCard } from "./lib.mjs";

const ROOT = new URL("../../", import.meta.url).pathname;
const pages = [];
const add = (file, title, desc, body) => pages.push({ file, title, desc, body });

const faqs = [
  ["¿En qué países funciona?", "Chile, Perú y México."],
  ["¿Puedo manejar varias empresas?", "Sí, desde una misma cuenta, incluso de distintos países."],
  ["¿Emite facturas electrónicas?", "No. Registra y gestiona los comprobantes que emites con tu sistema de facturación, importándolos por XML o sincronizando, según el país."],
  ["¿Se conecta con el SII?", "Sí, en Chile (compras y ventas) mediante Fintoc."],
  ["¿Y con SUNAT o el SAT?", "En Perú hay integración con Contable.pe y manejo de detracciones. En México se importan los CFDI por XML."],
  ["¿Puedo cobrar online?", "Sí, con links de pago de MercadoPago en Chile, Perú y México."],
  ["¿Cómo concilio el banco?", "Conectando la cuenta (Chile, con Fintoc) o subiendo la cartola en Excel/CSV (los tres países)."],
  ["¿Mis clientes pueden ver sus facturas?", "Sí, con el portal financiero."],
  ["¿Quién ve mis datos?", "Solo los usuarios de tu empresa. Cada empresa está aislada."],
  ["¿Puedo exportar mis datos?", "Sí, todas las listas se exportan a CSV."],
  ["¿Hay app móvil?", "Es una aplicación web que se adapta al celular."],
  ["¿Cuánto cuesta?", "Depende de tu empresa. Agenda una demo y te enviamos una cotización."],
];

const cards = {
  cl: docCard({ code: "CL", country: "Chile", kind: "Factura electrónica", idLabel: "RUT", id: "76.123.456-7", lines: [["Neto", "$1.000.000"], ["IVA 19 %", "$190.000"], ["Total", "$1.190.000"]], tax: "IVA 19 %", note: "CLP y UF · DTE del SII", accent: "#1d4ed8" }),
  pe: docCard({ code: "PE", country: "Perú", kind: "Factura electrónica", idLabel: "RUC", id: "20512345678", lines: [["Valor de venta", "S/ 1,000.00"], ["IGV 18 %", "S/ 180.00"], ["Total", "S/ 1,180.00"]], tax: "IGV 18 %", note: "PEN · Detracción SPOT con constancia", accent: "#b42318" }),
  mx: docCard({ code: "MX", country: "México", kind: "CFDI 4.0", idLabel: "RFC", id: "ABC010101AB1", lines: [["Subtotal", "$1,000.00"], ["IVA 16 %", "$160.00"], ["Total", "$1,160.00"]], tax: "IVA 16 %", note: "MXN · identificado por UUID", accent: "#117a4a" }),
};

/* ---------- INICIO ---------- */
const tour = [
  ["Por cobrar", "cxc", "Lo que facturas, al día.", "Importa XML y PDF o registra a mano.", ["Importador XML y PDF", "Pendiente, parcial, vencido, pagado", "Envío por correo"], "funcionalidades.html#por-cobrar", "Cuentas por cobrar", "Listado de documentos por cobrar con saldo, vencimiento y estado"],
  ["Cobranza", "cobranza", "Quién debe, cuánto y desde cuándo.", "Cartera por cliente con su próxima acción.", ["Ficha por cliente", "Recordatorios", "Acuerdos en cuotas"], "cobranza.html", "Ver cobranza", "Cartera de cobranza por cliente"],
  ["Por pagar", "cxp-gestion", "Aprobar antes de pagar.", "Un tablero desde la factura hasta el pago.", ["Flujo de aprobación", "Pago solicitado, programado y pagado", "Órdenes de compra"], "funcionalidades.html#por-pagar", "Cuentas por pagar", "Tablero de gestión de pagos a proveedores"],
  ["Conciliación", "conciliacion", "El banco y tus documentos, de acuerdo.", "Cada movimiento, contra sus cobros y pagos.", ["Cuentas conectadas o por cartola", "Sugerencias automáticas", "Varias monedas"], "funcionalidades.html#conciliacion", "Conciliación bancaria", "Conciliación bancaria con movimientos por conciliar"],
  ["Tesorería", "tesoreria-app", "Tu caja, por moneda.", "Por cobrar menos por pagar, sin mezclar monedas.", ["Posición neta", "Antigüedad de saldos", "Vencimientos del mes"], "funcionalidades.html#tesoreria", "Tesorería", "Resumen de tesorería con posición neta y antigüedad"],
];
const tourHtml = `<section class="tour"><div class="wrap">
<h2>Un recorrido por la app</h2>
<div class="tabs" data-tabs role="tablist" aria-label="Módulos">${tour.map(([n], i) => `<button type="button" role="tab" aria-selected="${i === 0}">${n}</button>`).join("")}</div>
${tour.map(([, im, title, text, items, href, linkText, alt]) => `<div class="panel-t" role="tabpanel"><div><h3>${title}</h3><p>${text}</p>${chips(items)}<a class="link" href="${href}">${linkText}</a></div>${img(im, alt)}</div>`).join("")}
</div></section>`;

add("index.html",
  "Produ Finanzas | Cuentas por cobrar, por pagar y tesorería para Chile, Perú y México",
  "Software para pymes: documentos, cobranza, conciliación bancaria, portal para clientes y pagos online. RUT, RUC y RFC; IVA, IGV y detracciones.",
  `<section class="hero"><div class="wrap">
<h1>Cuentas por cobrar, por pagar y <span class="mark">tesorería</span> en un solo lugar.</h1>
<p class="lead">Documentos, pagos, cobranza, conciliación y portal para tus clientes. Para empresas de Chile, Perú y México.</p>
<div class="btns"><a class="btn btn-blue btn-lg" href="contacto.html">Agenda una demo</a><a class="link" href="${APP}">Ingresar a la app</a></div>
<div class="stage">${img("tesoreria", "Pantalla de tesorería de Produ Finanzas con posición por cobrar, por pagar, antigüedad de saldos y vencimientos")}<div class="over-phone">${phone("m-cobranza", "Cartera de cobranza en el celular")}</div></div>
</div></section>
<div class="facts"><div class="wrap">
<div><b>3 países</b><span>Chile, Perú y México en una misma cuenta</span></div>
<div><b>6 monedas</b><span>CLP, PEN, MXN, USD, EUR y UF</span></div>
<div><b>XML y PDF</b><span>DTE, comprobantes de SUNAT y CFDI</span></div>
<div><b>Varias empresas</b><span>Con roles y auditoría de cambios</span></div>
</div></div>` +
  tourHtml +
  sec(head("Cobra sin perseguir.", "Recordatorios automáticos, link de pago y acuerdos en cuotas.") +
    `<div class="collage"><div class="a">${img("editor-correo", "Editor de recordatorios con vista previa del correo de cobranza")}</div><div class="b">${img("acuerdo-dialogo", "Formulario de acuerdo de pago en cuotas")}</div><div class="c">${img("estado-cuenta", "Correo de estado de cuenta con botón Ver en el portal")}</div></div>
    <p style="margin-top:40px">${lnk("cobranza.html", "Ver cobranza")}</p>`) +
  sec(head("En el escritorio y en el celular.", "Es una aplicación web que se adapta a cualquier pantalla.", "c") +
    `<div class="phones">${phone("m-tesoreria", "Tesorería en el celular", "Tesorería")}${phone("m-cobranza", "Cobranza en el celular", "Cobranza")}${phone("m-cxc", "Documentos por cobrar en el celular", "Por cobrar")}${phone("m-cxp", "Gestión de pagos en el celular", "Por pagar")}</div>`, "soft") +
  sec(feature({ title: "Tus clientes consultan solos.", text: "Un portal con tu logo, para clientes y proveedores.", chip: ["Documentos y pagos", "Descarga de PDF", "Acceso por correo o código"], link: lnk("portal.html", "Ver el portal"), visual: `${img("portal", "Portal financiero con los documentos de un cliente")}<div class="over-phone">${phone("m-portal", "Portal en el celular")}</div>`, flip: true })) +
  sec(head("Cada país con sus reglas.", "Impuestos, monedas y documentos locales en una misma cuenta.") +
    `<div class="docs3">${cards.cl}${cards.pe}${cards.mx}</div><p style="margin-top:34px">${lnk("paises.html", "Ver países")}</p>`, "soft") +
  sec(head("Vistas de la app.") +
    `<div class="bento">
<figure class="s12 h1">${img("d-kpis", "Indicadores de tesorería")}<figcaption>Tesorería</figcaption></figure>
<figure class="s5 h2">${img("d-antiguedad", "Antigüedad de saldos por cobrar")}<figcaption>Antigüedad de saldos</figcaption></figure>
<figure class="s7 h2 pos-r">${img("d-grafico", "Facturación de los últimos 12 meses de un cliente")}<figcaption>Facturación por cliente</figcaption></figure>
<figure class="s7 h2">${img("d-recordatorio", "Recordatorio programado")}<figcaption>Recordatorios</figcaption></figure>
<figure class="s5 h2">${img("d-cuotas", "Cuotas de un acuerdo de pago")}<figcaption>Acuerdos en cuotas</figcaption></figure>
<figure class="s8 h1">${img("d-cartera", "Cartera de cobranza")}<figcaption>Cartera de cobranza</figcaption></figure>
<figure class="s4 h1">${img("d-portal-kpis", "Resumen del portal de un cliente")}<figcaption>Portal</figcaption></figure>
</div>`) +
  sec(feature({ title: "Conectado con lo que ya usas.", text: "", visual: `<div class="wordmarks" style="margin-top:0"><img src="assets/mercado-pago-logo.png" alt="MercadoPago"><span>Fintoc</span><span>Contable.pe</span><span>XML SII · SUNAT · SAT</span><span>Excel / CSV</span></div>`, link: lnk("integraciones.html", "Ver integraciones") }) +
    `<p class="note" style="margin-top:44px"><b>No emite facturas electrónicas.</b> Registra y gestiona las que emites con tu sistema de facturación.</p>`, "soft") +
  sec(`<h2 style="margin-bottom:30px">Preguntas frecuentes</h2>${faq(faqs.slice(0, 4))}<p style="margin-top:24px">${lnk("preguntas.html", "Ver todas")}</p>`) +
  closing());

/* ---------- SOLUCIONES ---------- */
add("soluciones.html", "Soluciones | Produ Finanzas",
  "Produ Finanzas para gerentes y dueños de pyme, equipos de finanzas, cobranza, empresas con varias razones sociales y estudios contables.",
  pageHead("Soluciones", "Pymes y empresas medianas que facturan en Chile, Perú o México.") +
  sec([
    feature({ title: "Gerentes y dueños de pyme", text: "Saber cuánto te deben, cuánto debes y cuál es tu caja, sin planillas.", chip: ["Por cobrar y por pagar", "Posición neta por moneda", "Vencimientos"], visual: img("tesoreria-app", "Resumen de tesorería") }),
    feature({ title: "Finanzas y contabilidad", text: "Menos digitación, menos conciliación a mano.", chip: ["Importación XML y PDF", "Aprobación de pagos", "Conciliación"], visual: img("cxp-documentos", "Documentos por pagar"), flip: true }),
    feature({ title: "Equipos de cobranza", text: "Cobrar con el historial a la vista.", chip: ["Recordatorios", "Acuerdos en cuotas", "Link de pago"], visual: img("ficha", "Ficha de cobranza de un cliente") }),
    feature({ title: "Varias razones sociales", text: "Varias empresas, incluso de distintos países, desde una sola cuenta.", chip: ["Selector con buscador", "Montos por moneda"], visual: img("tesoreria", "Aplicación con selector de empresa"), flip: true }),
    feature({ title: "Estudios contables y holdings", text: "Las finanzas de varias empresas, con permisos por usuario.", chip: ["Dueño, administrador, finanzas, solo lectura"], visual: img("usuarios", "Usuarios y roles de la empresa") }),
  ].join("")) + closing());

/* ---------- FUNCIONALIDADES ---------- */
add("funcionalidades.html", "Funcionalidades | Produ Finanzas",
  "Por cobrar, por pagar, cobranza, tesorería, conciliación bancaria, pagos online y portal para clientes y proveedores en una sola plataforma.",
  pageHead("Funcionalidades", "Todo el ciclo financiero, en una aplicación web.") +
  sec([
    feature({ id: "por-cobrar", title: "Cuentas por cobrar", text: "Facturas, notas, boletas, honorarios e invoices.", chip: ["Importador de XML y PDF", "Pendiente, parcial, vencido, pagado", "Antigüedad de saldos", "Envío por correo"], visual: img("cxc", "Listado de documentos por cobrar") }),
    feature({ id: "por-pagar", title: "Cuentas por pagar", text: "De la factura del proveedor al pago, con aprobación.", chip: ["Flujo de aprobación", "Pago solicitado, programado y pagado", "Categoría y centro de costo"], visual: img("cxp-gestion", "Tablero de gestión de pagos"), flip: true }),
    feature({ id: "ordenes", title: "Órdenes de compra", text: "Con saldo por facturar y envío al proveedor en PDF.", chip: ["Saldo por facturar", "PDF al proveedor"], visual: img("ordenes", "Listado de órdenes de compra") }),
    feature({ id: "cobranza", title: "Cobranza", text: "Cartera, recordatorios y acuerdos de pago.", chip: ["Ficha por cliente", "Recordatorios programados", "Acuerdos en cuotas"], link: lnk("cobranza.html", "Ver cobranza"), visual: img("ficha", "Ficha de cobranza de un cliente"), flip: true }),
    feature({ id: "tesoreria", title: "Tesorería", text: "Tu posición por moneda, de un vistazo.", chip: ["Posición neta", "Antigüedad y vencimientos", "Flujo del mes"], visual: img("tesoreria-app", "Resumen de tesorería") }),
    feature({ id: "conciliacion", title: "Conciliación bancaria", text: "Cuentas conectadas en Chile o por cartola en los tres países.", chip: ["Fintoc (Chile)", "Excel/CSV", "Sugerencias automáticas", "Cuentas offline"], visual: img("conciliacion", "Conciliación bancaria"), flip: true }),
    feature({ id: "pagos-online", title: "Pagos online", text: "Link de MercadoPago en cada documento y botón “Pagar” en el correo.", chip: ["Chile, Perú y México", "Registro automático del pago"], visual: `<div class="narrow-v">${img("correo-preview", "Correo de cobranza con botón Pagar")}</div>` }),
    feature({ id: "portal", title: "Portal financiero", text: "Clientes y proveedores consultan por su cuenta.", chip: ["Documentos y pagos", "Tu logo y mensaje", "Correo o código de acceso"], link: lnk("portal.html", "Ver el portal"), visual: `${img("portal", "Portal financiero")}<div class="over-phone">${phone("m-portal", "Portal en el celular")}</div>`, flip: true }),
    feature({ id: "gestion", title: "Gestión y administración", text: "Una empresa o varias, con roles y auditoría.", chip: ["Multi-empresa", "Roles", "Campos personalizados", "Importador Excel/CSV", "Exportación a CSV", "CLP, PEN, MXN, USD, EUR y UF"], visual: img("clientes", "Listado de clientes") }),
  ].join("")) + closing());

/* ---------- COBRANZA ---------- */
add("cobranza.html", "Cobranza | Produ Finanzas",
  "Recordatorios por correo, acuerdos de pago en cuotas, links de pago y ficha de cobranza por cliente.",
  pageHead("Cobranza", "Recordatorios, link de pago, acuerdos en cuotas y el historial de cada cliente.") +
  sec([
    feature({ title: "Cartera por cliente", text: "Deuda, atraso y próxima acción, en una lista.", visual: img("cobranza", "Cartera de cobranza por cliente"), wide: true }),
    feature({ title: "Ficha del cliente", text: "Documentos, actividad, responsable y límite de crédito.", chip: ["Facturación mensual", "Deuda por antigüedad", "Acuerdo de pago vigente"], visual: img("ficha", "Ficha de cobranza de un cliente"), flip: true }),
    feature({ title: "Recordatorios", text: "Antes, el día, después, semanal o al emitir.", chip: ["Plantillas editables", "Vista previa exacta", "Botón Pagar"], visual: `${img("editor-correo", "Editor de recordatorios")}<div class="over-card">${img("correo-preview", "Correo de cobranza")}</div>` }),
    feature({ title: "Acuerdos de pago", text: "En cuotas, sin que el cliente figure como moroso.", chip: ["Vigente, cumplido, no cumplido, anulado", "Una renegociación"], visual: `<div class="duo">${img("acuerdo-dialogo", "Nuevo acuerdo de pago")}${img("estado-cuenta", "Correo de estado de cuenta")}</div>`, flip: true }),
  ].join("")) +
  sec(`<h2 style="margin-bottom:30px">Preguntas sobre cobranza</h2>${faq([
    ["¿Cuándo se envían los recordatorios?", "A la hora que elijas, en la zona horaria de la empresa. Se revisan cada 15 minutos y cada documento recibe el mismo recordatorio una sola vez."],
    ["¿Puedo pausar a un cliente?", "Sí. Los clientes pausados, o con el recordatorio desactivado en su ficha, no reciben los envíos."],
    ["¿Qué pasa con un cliente con acuerdo de pago?", "Mientras esté vigente no aparece como moroso por esos documentos."],
    ["¿El cliente puede pagar desde el correo?", "Sí, con el botón “Pagar” que lleva a un link de MercadoPago."],
  ])}`, "soft") + closing());

/* ---------- PORTAL ---------- */
add("portal.html", "Portal para clientes y proveedores | Produ Finanzas",
  "Un portal con el logo de tu empresa donde clientes y proveedores ven documentos, descargan PDF y consultan pagos.",
  pageHead("Portal para clientes y proveedores", "Con el logo de tu empresa. Sin pedirte los documentos por correo.") +
  sec(`<div style="position:relative;max-width:1000px;margin:0 auto">${img("portal", "Portal financiero con documentos de un cliente")}<div class="over-phone">${phone("m-portal", "Portal en el celular")}</div></div>`) +
  sec(`<div class="mini">
<div class="tile"><h3>Su información</h3><p>Documentos, pagos, fechas de pago y archivos.</p></div>
<div class="tile"><h3>Su acceso</h3><p>Con correo autorizado o con código de acceso.</p></div>
<div class="tile"><h3>Su conversación</h3><p>Descargan PDF y conversan sobre cada documento.</p></div>
</div>`, "soft") +
  sec(`<h2 style="margin-bottom:30px">Preguntas sobre el portal</h2>${faq([
    ["¿Cómo entra un cliente?", "Con su correo autorizado o con un código de acceso que tú le entregas."],
    ["¿Se ve con mi marca?", "Sí, lleva el logo y el mensaje de tu empresa."],
    ["¿También sirve para proveedores?", "Sí, para clientes y para proveedores."],
  ])}`) + closing());

/* ---------- PAÍSES ---------- */
const country = (file, key, name, desc, lead, chip, second) => add(file, `Produ Finanzas en ${name}`, desc,
  pageHead(`Produ Finanzas en ${name}`, lead) +
  sec(feature({ title: `Hecho para ${name}`, text: "", chip, visual: `<div class="narrow-v">${cards[key]}</div>` }) + feature(second)) +
  sec(`<p style="color:var(--gray)">Otros países: ${[["cl.html", "Chile"], ["pe.html", "Perú"], ["mx.html", "México"]].filter(([h]) => h !== file).map(([h, l]) => `<a class="link" href="${h}" style="margin-right:22px">${l}</a>`).join("")}</p>`, "soft") + closing());

country("cl.html", "cl", "Chile", "Produ Finanzas para Chile: RUT, IVA 19 %, UF, sincronización de documentos del SII y conexión bancaria con Fintoc.",
  "RUT, IVA, UF, documentos del SII y bancos chilenos.", ["RUT e IVA 19 %", "CLP y UF", "Documentos del SII (compras y ventas)", "Cuentas con Fintoc", "Link de pago MercadoPago"],
  { title: "Tu banco, conectado.", text: "Cuentas con Fintoc o cartolas en Excel/CSV.", visual: img("conciliacion", "Conciliación bancaria"), flip: true });
country("pe.html", "pe", "Perú", "Produ Finanzas para Perú: RUC, IGV 18 %, detracciones SPOT, integración con Contable.pe y Yape/Plin como forma de pago.",
  "RUC, IGV, detracciones y comprobantes de SUNAT.", ["RUC e IGV 18 %", "Detracciones SPOT con constancias", "Contable.pe", "Yape/Plin", "Comprobantes por XML y PDF"],
  { title: "Comprobantes en minutos.", text: "XML y PDF juntos, sin duplicados.", visual: img("cxc", "Documentos por cobrar"), flip: true });
country("mx.html", "mx", "México", "Produ Finanzas para México: RFC, IVA 16 %, CFDI 3.3 y 4.0 por UUID, pesos mexicanos, bancos mexicanos y SPEI.",
  "RFC, IVA, CFDI y bancos mexicanos.", ["RFC e IVA 16 %", "CFDI 3.3 y 4.0 por UUID", "Pesos mexicanos (MXN)", "Bancos mexicanos", "SPEI"],
  { title: "CFDI por XML.", text: "Ingreso y egreso, identificados por UUID.", visual: img("cxc", "Documentos por cobrar"), flip: true });

add("paises.html", "Chile, Perú y México | Produ Finanzas",
  "Produ Finanzas funciona en Chile, Perú y México, con RUT, RUC y RFC; IVA e IGV; detracciones y CFDI.",
  pageHead("Chile, Perú y México", "Una cuenta, con empresas de distintos países.") +
  sec(`<div class="docs3">${["cl", "pe", "mx"].map((k, i) => `<div>${cards[k]}<p style="margin-top:18px">${lnk(k + ".html", ["Ver Chile", "Ver Perú", "Ver México"][i])}</p></div>`).join("")}</div>`) + closing());

/* ---------- INTEGRACIONES ---------- */
add("integraciones.html", "Integraciones | Produ Finanzas",
  "MercadoPago, Fintoc, SII, Contable.pe y la importación de comprobantes por XML de SUNAT y CFDI del SAT.",
  pageHead("Integraciones", "Con qué se conecta Produ Finanzas hoy.") +
  sec(`<div class="mini">
<div class="tile"><h3>MercadoPago</h3><p>Link de pago y botón “Pagar”. Chile, Perú y México.</p></div>
<div class="tile"><h3>Fintoc (Chile)</h3><p>Cuentas bancarias y documentos del SII.</p></div>
<div class="tile"><h3>Contable.pe (Perú)</h3><p>Integración para tu operación en Perú.</p></div>
<div class="tile"><h3>XML y PDF</h3><p>DTE, comprobantes de SUNAT y CFDI del SAT.</p></div>
<div class="tile"><h3>Excel y CSV</h3><p>Importa clientes, proveedores y cartolas. Exporta tus listas.</p></div>
</div><p class="note" style="margin-top:44px"><b>No emite comprobantes.</b> Registra y gestiona los que emites con tu sistema de facturación.</p>`) +
  sec(`<h2 style="margin-bottom:30px">Preguntas sobre integraciones</h2>${faq([
    ["¿Necesito conectar mi banco?", "No. Puedes subir la cartola en Excel/CSV en los tres países. La conexión directa existe en Chile, con Fintoc."],
    ["¿Se sincroniza con SUNAT o el SAT?", "No directamente. En Perú hay integración con Contable.pe y en México se importan los CFDI por XML."],
    ["¿Puedo sacar mis datos?", "Sí, todas las listas se exportan a CSV."],
  ])}`, "soft") + closing());

/* ---------- SEGURIDAD ---------- */
add("seguridad.html", "Seguridad y datos | Produ Finanzas",
  "Datos aislados por empresa, roles con permisos, credenciales cifradas y pagos online verificados.",
  pageHead("Seguridad y datos", "Cómo se protege la información de tu empresa.") +
  sec(`<div class="mini">
<div class="tile"><h3>Aislamiento por empresa</h3><p>Datos separados por empresa a nivel de base de datos (Postgres con seguridad por filas).</p></div>
<div class="tile"><h3>Roles y auditoría</h3><p>Permisos por acción. Las acciones críticas quedan registradas.</p></div>
<div class="tile"><h3>Credenciales cifradas</h3><p>Las claves de integraciones se guardan cifradas en el servidor y no vuelven al navegador.</p></div>
<div class="tile"><h3>Pagos verificados</h3><p>Un pago online solo se registra con confirmación firmada.</p></div>
<div class="tile"><h3>Montos exactos</h3><p>Sin decimales flotantes ni sobrepagos.</p></div>
<div class="tile"><h3>Correos confiables</h3><p>Dominio verificado (DKIM y DMARC).</p></div>
</div><p style="margin-top:34px;color:var(--gray)">Infraestructura: Supabase (Postgres y autenticación) y Vercel.</p>`) + closing());

/* ---------- PRECIOS ---------- */
add("precios.html", "Precios | Produ Finanzas", "Cotiza Produ Finanzas según tu empresa. Agenda una demo y conversemos.",
  pageHead("Precios", "Cotizamos según tu empresa.") +
  sec(`<div class="split-q"><h2>Agenda una demo y te enviamos una cotización.</h2>${chips(["Países y empresas", "Módulos que necesitas", "Importación de tus datos"])}<div style="margin-top:28px"><a class="btn btn-blue btn-lg" href="contacto.html">Agenda una demo</a></div></div>`));

/* ---------- PREGUNTAS ---------- */
add("preguntas.html", "Preguntas frecuentes | Produ Finanzas",
  "Respuestas sobre países, facturación electrónica, SII, SUNAT, SAT, cobros online, conciliación bancaria y seguridad en Produ Finanzas.",
  pageHead("Preguntas frecuentes") + sec(faq(faqs)) + closing("¿Tienes otra pregunta?", "Escríbenos desde la página de contacto."));

/* ---------- CONTACTO ---------- */
add("contacto.html", "Contacto y demo | Produ Finanzas", "Agenda una demo de Produ Finanzas o escríbenos.",
  pageHead("Agenda una demo", "Cuéntanos de tu empresa y te mostramos cómo funciona.") +
  sec(`<form class="f" data-contact data-endpoint="">
<div class="two"><label>Nombre<input name="nombre" required autocomplete="name"></label><label>Empresa<input name="empresa" required autocomplete="organization"></label></div>
<div class="two"><label>Correo<input name="correo" type="email" required autocomplete="email"></label><label>País<select name="pais"><option>Chile</option><option>Perú</option><option>México</option><option>Otro</option></select></label></div>
<label>Mensaje<textarea name="mensaje" rows="5" placeholder="¿Qué te gustaría resolver?"></textarea></label>
<small>No incluyas claves ni datos de tarjetas.</small>
<div><button class="btn btn-blue btn-lg" type="submit">Enviar</button></div><div class="msg" role="status"></div>
</form>
<p style="margin-top:40px;color:var(--gray)">¿Ya tienes cuenta? <a class="link" href="${APP}">Ingresa a finanzas.produ.cl</a></p>`));

for (const p of pages) fs.writeFileSync(path.join(ROOT, p.file), page(p));
console.log(pages.length + " páginas");
