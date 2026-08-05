# Contexto — Landing Grupo CESPAD renovado. todavia no lo cargue en code:

Landing HTML/CSS/JS vanilla, sin frameworks, sin build step.
- Deploy: https://grupo-cespad-actualizacion.vercel.app/
- Local: D:\Desarrollo Web Sebas\GREENSET_COURT Paralelo para actualizar\
- Git: rama local master, remota main. Push con git push origin HEAD:main.

## Cómo trabajar conmigo (Sebas)
- Español rioplatense.
- Archivos completos listos para pegar, no diffs sueltos.
- Cambios quirúrgicos: línea exacta + consecuencia.
- Antes/después con justificación en cada decisión.
- No inventar contenido, usar placeholders explícitos.
- Sin emojis en código, solo SVG.
- Código limpio, sin sobreingeniería.
- Sebas mantiene versión deployada estable como fallback. No asumir que 
  ya se aplicaron cambios anteriores — leer los archivos primero.
  ## Convenciones de imágenes
- pastos/*.webp → 200px, q78
- canchas/*.webp → 1200px, q80
- aereo-*.webp (hero verticales) → 900px, q75-78
- aereo-*-horizontal.webp (cards deportes) → 1200px, q78
- proyectos/*.webp → 1200px, q80
- textura-pasto.webp → 1200px, q72
- nosotrosfoto.webp / parquizacion*.webp → 900-1200px, q78
- og-image.jpg (JPG obligatorio, WhatsApp/Facebook no leen WebP en OG)
- favicon.png (PNG obligatorio)
- Originales en img/_originales/ (no se sirven, fuente de reprocesamiento)
- Backups en _backup*/ en la raíz (NO borrar)
- cwebp 1.4.0 instalado en C:\tools\libwebp\bin

## Stack
- HTML5 semántico, CSS3 con custom properties, JS vanilla en IIFEs.
- Google Fonts: Bebas Neue (display) + DM Sans (body).
- IntersectionObserver para reveals y contadores.

## Bloques cerrados
- **Bloque 1** — Compresión de imágenes. Payload bajó de 12.6MB a ~3MB. 
  PageSpeed 62→75. LCP 16s→4.8s.

- **Bloque 2A** — Fix overflow horizontal en mobile <400px. Bug era 
  .btn con white-space: nowrap. También se ajustó FAB (48px + 
  bottom/right: 1.25rem) y --container-pad: 1.5rem en breakpoint <380px.

- **Bloque 2B** — Preload del LCP + limpieza de fetchpriority en hero 
  + content-visibility en .deportes + investigar reprocesamiento 
  forzado en main.js:60. Meta: LCP <2.5s, PageSpeed +88.

  - **Bloque 2C** — Recompresión de las 5 imágenes del hero + 
  nosotrosfoto + corrección del preload a aereo-tenis.webp 
  (LCP real detectado por Lighthouse). PageSpeed 75→88. LCP 4.8s→3.1s.
  
  ## ##Bloques pendientes (en orden)
  - **Bloque 2D** — CSS crítico inline + diferido de styles.css + 
  fix bug ARIA en deporte-detail (article→div, role="tabpanel" 
  válido) + recompresión final de nosotrosfoto. PageSpeed 88→XX. 
  FCP 2.6s→X.Xs. Navegación con Agentes 1/2→2/2.
  
- **Bloque 4** — Rediseño sección Deportes: container proporcionalmente 
  más ancho en desktop, imagen full-width y más alta, contenido debajo 
  fuera de card apretada, botones no apretados.

- **Bloque 3** — Carrusel Parquización: flecha derecha en desktop pasa 
  a siguiente foto, swipe en mobile/tablet, animación liviana.

- **Bloque 5** — Headers de seguridad en vercel.json (CSP, COOP, XFO).
Meta final: cerrar deploy en +90 PageSpeed sin perseguir perfección infinita.
