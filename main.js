/* ============================================================
   GRUPO CESPAD — main.js
   ------------------------------------------------------------
   Módulos IIFE independientes. Cada uno hace un early-return si
   su markup no existe, así se puede borrar una sección del HTML
   sin romper nada.

   01. CONFIG + helpers
   02. Header (scroll)
   03. Scroll effects (reveal + contadores) — un solo observer
   04. Marquee (duplica el track)
   05. Menú mobile
   06. Deportes (tabs + swatches + deep-link desde el hero)
   07. Formulario → WhatsApp
   08. WhatsApp global (FAB, teléfono) + año
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   01. CONFIG + helpers
   Único lugar donde se toca el número de WhatsApp.
   ------------------------------------------------------------ */
const CONFIG = {
  // Número principal (Marcelo). Recibe TODO: FAB, formulario y botones de cada deporte.
  whatsapp: '5491131496374',
  whatsappDisplay: '+54 9 11 3149-6374',
  whatsappSaludo: 'Hola Grupo CESPAD, quiero consultar por una cancha.',

  // Segundo asesor. Se muestra como canal alternativo en Contacto.
  // Dejalo en '' y la línea no aparece en la web.
  whatsappSecundario: '',
  whatsappSecundarioDisplay: '',

  // Ruteo opcional por tipo de consulta (value exacto del <select id="deporte">).
  // Vacío = todo va al número principal. Descomentá sólo lo que quieras derivar.
  // Sirve para repartir por especialidad SIN que compitan por el mismo lead.
  ruteo: {
    // 'Parquización / Espacios verdes': '549351XXXXXXX',
  },
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SCROLL_BEHAVIOR = REDUCED_MOTION ? 'auto' : 'smooth';

/* ------------------------------------------------------------
   02. HEADER — fondo al scrollear
   El listener sólo agenda un frame: el trabajo real corre como
   máximo 1 vez por repintado, no 1 vez por evento de scroll.
   ------------------------------------------------------------ */
(function initHeader() {
  const header = $('#site-header');
  if (!header) return;

  let queued = false;

  const paint = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    queued = false;
  };

  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  }, { passive: true });

  requestAnimationFrame(paint);
})();

/* ------------------------------------------------------------
   03. SCROLL EFFECTS — reveal + contadores en un solo observer
   Antes había 2 IntersectionObserver recorriendo el DOM por
   separado. Ahora hay 1 con delegación por dataset.
   ------------------------------------------------------------ */
(function initScrollEffects() {
  const targets = $$('[data-reveal], [data-count]');
  if (!targets.length) return;

  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const render = (n) => { el.textContent = `${prefix}${n}${suffix}`; };

    if (REDUCED_MOTION) { render(target); return; }

    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      render(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const activate = (el) => {
    if ('reveal' in el.dataset) el.classList.add('is-visible');
    if ('count' in el.dataset) countUp(el);
  };

  // Fallback: sin IntersectionObserver mostramos todo de una.
  if (!('IntersectionObserver' in window)) {
    targets.forEach(activate);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      activate(entry.target);
      io.unobserve(entry.target); // cada elemento se anima una sola vez
    }
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  targets.forEach((el) => io.observe(el));
})();

/* ------------------------------------------------------------
   04. MARQUEE — la copia para el loop la genera el JS
   Evita mantener el mismo listado duplicado a mano en el HTML.
   ------------------------------------------------------------ */
(function initMarquee() {
  const track = $('.marquee-track');
  const content = track && $('.marquee-content', track);
  if (!content) return;

  const clone = content.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);
  track.classList.add('is-ready'); // recién ahora arranca la animación
})();

/* ------------------------------------------------------------
   05. MENÚ MOBILE
   ------------------------------------------------------------ */
(function initMobileMenu() {
  const toggle = $('#nav-toggle');
  const nav = $('#primary-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

  // Un solo listener en el documento cubre: click en un link, click afuera y Escape.
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    const dentroDelToggle = toggle.contains(e.target);
    const esLink = e.target.closest('.nav-link, .nav-cta');
    if (dentroDelToggle) return;
    if (esLink || !nav.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* ------------------------------------------------------------
   06. DEPORTES — tabs, swatches y deep-link desde el hero
   3 listeners delegados en lugar de ~17 individuales.
   Agregar un deporte no requiere tocar este archivo.
   ------------------------------------------------------------ */
(function initDeportes() {
  const section = $('#deportes');
  if (!section) return;

  const tablist = $('.deportes-tabs', section);
  const tabs = $$('.deportes-tab[data-sport]', section);
  const details = $$('.deporte-detail[data-detail]', section);
  if (!tabs.length || !details.length) return;

  const precargadas = new Set();

  /** Calienta la caché de la foto de un deporte antes de que se muestre. */
  const prefetch = (sport) => {
    const detail = details.find((d) => d.dataset.detail === sport);
    const img = detail && $('.deporte-detail-img', detail);
    if (!img || precargadas.has(img.src)) return;
    precargadas.add(img.src);
    new Image().src = img.src;
  };

  const activate = (sport) => {
    if (!tabs.some((t) => t.dataset.sport === sport)) return false;

    tabs.forEach((tab) => {
      const on = tab.dataset.sport === sport;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1; // roving tabindex: el tablist es 1 sola parada de tabulación
    });

    details.forEach((d) => { d.hidden = d.dataset.detail !== sport; });
    return true;
  };

  // Clicks dentro de la sección: tabs y swatches.
  section.addEventListener('click', (e) => {
    const tab = e.target.closest('.deportes-tab[data-sport]');
    if (tab) { activate(tab.dataset.sport); return; }

    const swatch = e.target.closest('.color-swatch');
    if (swatch) selectColor(swatch);
  });

  // Navegación por teclado del tablist (patrón ARIA de tabs).
  tablist?.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const actual = tabs.findIndex((t) => t.classList.contains('is-active'));
    const proximo = tabs[(actual + step + tabs.length) % tabs.length];
    activate(proximo.dataset.sport);
    proximo.focus();
  });

  function selectColor(swatch) {
    const grupo = swatch.closest('.deporte-colores');
    const detail = swatch.closest('.deporte-detail');
    if (!grupo || !detail) return;

    $$('.color-swatch', grupo).forEach((s) => {
      const on = s === swatch;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-checked', String(on));
    });

    const img = $('.deporte-detail-img', detail);
    if (img && swatch.dataset.image) img.src = swatch.dataset.image;

    const salida = $('[data-color-out]', grupo);
    if (salida && swatch.dataset.color) salida.textContent = swatch.dataset.color;
  }

  // Deep-link: los íconos del hero activan el tab y bajan a la sección.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-sport-goto]');
    if (!btn) return;
    if (activate(btn.dataset.sportGoto)) {
      section.scrollIntoView({ behavior: SCROLL_BEHAVIOR, block: 'start' });
    }
  });

  // Prefetch al pasar el mouse por un tab o por un ícono del hero.
  const onHover = (e) => {
    const el = e.target.closest('[data-sport], [data-sport-goto]');
    if (el) prefetch(el.dataset.sport || el.dataset.sportGoto);
  };
  tablist?.addEventListener('pointerenter', onHover, { capture: true });
  $('#hero')?.addEventListener('pointerover', onHover, { passive: true });
})();

/* ------------------------------------------------------------
   07. FORMULARIO → WhatsApp
   ------------------------------------------------------------ */
(function initForm() {
  const form = $('#contact-form');
  if (!form) return;

  const REQUERIDOS = [
    { id: 'nombre', label: 'Nombre completo' },
    { id: 'ciudad', label: 'Ciudad / Localidad' },
    { id: 'deporte', label: 'Tipo de cancha' },
    { id: 'proyecto', label: 'Tipo de proyecto' },
  ];

  const valor = (id) => ($(`#${id}`)?.value || '').trim();

  const setError = (input, mensaje) => {
    const box = $(`#err-${input.id}`);
    if (box) box.textContent = mensaje;
    input.classList.toggle('is-invalid', Boolean(mensaje));
    if (mensaje) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  // Delegación: input y change burbujean hasta el form.
  const limpiar = (e) => {
    if (e.target.id && e.target.classList.contains('is-invalid')) setError(e.target, '');
  };
  form.addEventListener('input', limpiar);
  form.addEventListener('change', limpiar);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let primerInvalido = null;
    for (const campo of REQUERIDOS) {
      const input = $(`#${campo.id}`);
      if (!input) continue;
      const vacio = !input.value.trim();
      setError(input, vacio ? `${campo.label} es obligatorio.` : '');
      if (vacio && !primerInvalido) primerInvalido = input;
    }

    if (primerInvalido) {
      primerInvalido.scrollIntoView({ behavior: SCROLL_BEHAVIOR, block: 'center' });
      setTimeout(() => primerInvalido.focus({ preventScroll: true }), 350);
      return;
    }

    const lineas = [
      '¡Hola Grupo CESPAD! 👋',
      '',
      `👤 *Nombre:* ${valor('nombre')}`,
      `📍 *Ciudad:* ${valor('ciudad')}`,
      `⚽ *Tipo de cancha:* ${valor('deporte')}`,
      `🏗️ *Tipo de proyecto:* ${valor('proyecto')}`,
    ];

    // Opcionales: sólo entran si tienen contenido.
    const opcionales = [
      ['📊 *Etapa:*', valor('etapa')],
      ['📐 *Espacio disponible:*', valor('espacio')],
      ['💬 *Comentario:*', valor('mensaje')],
    ];
    for (const [etiqueta, texto] of opcionales) {
      if (texto) lineas.push(`${etiqueta} ${texto}`);
    }
    lineas.push('', 'Quedo a la espera de su respuesta. ¡Gracias!');

    // Si el tipo de cancha tiene un número asignado en CONFIG.ruteo, va ahí.
    const destino = CONFIG.ruteo[valor('deporte')] || CONFIG.whatsapp;
    const url = `https://wa.me/${destino}?text=${encodeURIComponent(lineas.join('\n'))}`;
    const ventana = window.open(url, '_blank', 'noopener');
    if (!ventana) window.location.href = url; // fallback si el navegador bloquea el popup
  });
})();

/* ------------------------------------------------------------
   08. WhatsApp global + año
   Un solo número en CONFIG alimenta el FAB y el teléfono visible.
   ------------------------------------------------------------ */
(function initGlobales() {
  const link = (numero, texto) => `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  // Un solo recorrido cubre el FAB, el teléfono de contacto y los botones
  // de cada deporte. data-wa-msg define el contexto del mensaje.
  $$('[data-wa-link]').forEach((a) => {
    const msg = a.dataset.waMsg
      ? `Hola Grupo CESPAD, quiero consultar por ${a.dataset.waMsg}.`
      : CONFIG.whatsappSaludo;
    a.href = link(CONFIG.whatsapp, msg);
  });
  $$('[data-wa-display]').forEach((el) => { el.textContent = CONFIG.whatsappDisplay; });

  // Segundo asesor: sólo aparece si está cargado en CONFIG.
  if (CONFIG.whatsappSecundario) {
    $$('[data-wa-link-2]').forEach((a) => { a.href = link(CONFIG.whatsappSecundario, CONFIG.whatsappSaludo); });
    $$('[data-wa-display-2]').forEach((el) => { el.textContent = CONFIG.whatsappSecundarioDisplay; });
    $$('[data-wa-secundario]').forEach((el) => { el.hidden = false; });
  }

  const anio = $('#year');
  if (anio) anio.textContent = String(new Date().getFullYear());
})();