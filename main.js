/* ============================================================
   GRUPO CESPAD — main.js (v3.2)
   Módulos IIFE independientes.
   ============================================================ */

const WHATSAPP_NUMBER = '5491131496374';

/* ---------------- Header scroll ---------------- */
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------------- Reveal on scroll ---------------- */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
  items.forEach(el => io.observe(el));
})();

/* ---------------- Contadores animados ---------------- */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-number[data-target]');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  nums.forEach(el => io.observe(el));
})();

/* ---------------- Menú mobile ---------------- */
(function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  const close = () => {
    toggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  const open = () => {
    toggle.classList.add('is-open');
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) close();
    else open();
  });

  nav.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link, .nav-cta')) close();
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    close();
  });
})();

/* ---------------- Deportes: tabs ---------------- */
(function initDeportesTabs() {
  const tabs = document.querySelectorAll('.deportes-tab[data-tab]');
  const details = document.querySelectorAll('.deporte-detail[data-detail]');
  if (!tabs.length || !details.length) return;

  const activate = (sport) => {
    tabs.forEach(t => {
      const on = t.getAttribute('data-tab') === sport;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    details.forEach(d => {
      const on = d.getAttribute('data-detail') === sport;
      d.classList.toggle('is-active', on);
      if (on) d.removeAttribute('hidden');
      else d.setAttribute('hidden', '');
    });
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab.getAttribute('data-tab')));
  });

  // Deep-link desde íconos del hero
  const triggers = document.querySelectorAll('[data-sport-trigger]');
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sport = btn.getAttribute('data-sport-trigger');
      if (!sport) return;
      e.preventDefault();
      activate(sport);
      const target = document.getElementById('deportes');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ---------------- Deportes: color swatches ---------------- */
/* Al clickear un swatch, cambia la foto grande de la card correspondiente. */
(function initColorSwatches() {
  const groups = document.querySelectorAll('.deporte-colores-swatches');
  if (!groups.length) return;

  groups.forEach(group => {
    const swatches = group.querySelectorAll('.color-swatch');
    const article = group.closest('.deporte-detail');
    const imgEl = article ? article.querySelector('.deporte-detail-img') : null;
    const wrapper = group.closest('.deporte-colores');
    const nameEl = wrapper ? wrapper.querySelector('.deporte-colores-selected [data-color-name]') : null;

    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => {
          s.classList.remove('is-active');
          s.setAttribute('aria-checked', 'false');
        });
        swatch.classList.add('is-active');
        swatch.setAttribute('aria-checked', 'true');

        const newImg = swatch.getAttribute('data-image');
        if (imgEl && newImg) {
          imgEl.style.backgroundImage = `url('${newImg}')`;
        }

        const colorName = swatch.getAttribute('data-color-name');
        if (nameEl && colorName) nameEl.textContent = colorName;
      });
    });
  });
})();

/* ---------------- Formulario ---------------- */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = [
    { id: 'nombre',   label: 'Nombre completo' },
    { id: 'ciudad',   label: 'Ciudad / Localidad' },
    { id: 'deporte',  label: 'Tipo de cancha' },
    { id: 'proyecto', label: 'Tipo de proyecto' },
  ];

  const clearError = (id) => {
    const err = document.getElementById('err-' + id);
    const input = document.getElementById(id);
    if (err) err.textContent = '';
    if (input) input.classList.remove('has-error');
  };

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    if (!input) return;
    input.addEventListener('input', () => clearError(f.id));
    input.addEventListener('change', () => clearError(f.id));
  });

  const showError = (id, message) => {
    const err = document.getElementById('err-' + id);
    const input = document.getElementById(id);
    if (err) err.textContent = message;
    if (input) input.classList.add('has-error');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstInvalid = null;
    fields.forEach(f => {
      const input = document.getElementById(f.id);
      if (!input) return;
      if (!input.value.trim()) {
        showError(f.id, `${f.label} es obligatorio.`);
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => firstInvalid.focus({ preventScroll: true }), 350);
      return;
    }

    const val = (id) => (document.getElementById(id)?.value || '').trim();
    const nombre    = val('nombre');
    const ciudad    = val('ciudad');
    const deporte   = val('deporte');
    const proyecto  = val('proyecto');
    const etapa     = val('etapa');
    const espacio   = val('espacio');
    const mensaje   = val('mensaje');

    const partes = [
      '¡Hola Grupo CESPAD! 👋',
      '',
      `👤 *Nombre:* ${nombre}`,
      `📍 *Ciudad:* ${ciudad}`,
      `⚽ *Tipo de cancha:* ${deporte}`,
      `🏗️ *Tipo de proyecto:* ${proyecto}`,
    ];
    if (etapa)   partes.push(`📊 *Etapa:* ${etapa}`);
    if (espacio) partes.push(`📐 *Espacio disponible:* ${espacio}`);
    if (mensaje) partes.push('', `💬 *Comentario:* ${mensaje}`);
    partes.push('', 'Quedo a la espera de su respuesta. ¡Gracias!');

    const texto = encodeURIComponent(partes.join('\n'));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;

    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
  });
})();

/* ---------------- Año dinámico ---------------- */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();