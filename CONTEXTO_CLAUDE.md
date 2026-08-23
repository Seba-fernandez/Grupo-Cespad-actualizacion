# Contexto — Landing Grupo CESPAD

Landing HTML/CSS/JS vanilla, sin frameworks, sin build step.
- Deploy: https://grupo-cespad-actualizacion.vercel.app/ 
  (migrar a grupocespad.com.ar cuando esté comprado)
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
- cwebp 1.4.0 instalado en C:\tools\libwebp\libwebp-1.4.0-windows-x64\bin

## Reglas de git para este proyecto
Sebas no domina git y quiere máxima prudencia. Reglas absolutas:
- Permitido para Code: git status, git checkout -b, git add, 
  git commit, git branch, git log, git diff, git show.
- PROHIBIDO para Code: git push, git merge, git rebase, 
  git reset --hard, git branch -d/-D, git checkout main mientras 
  se trabaja en una rama, cualquier comando destructivo.
- Push, merge y borrado de ramas los hace Sebas manualmente 
  cuando aprueba el bloque.
- Cada bloque de rediseño trabaja en su propia rama dedicada 
  (ej: bloque-4b-visuales).
- Además de git, se hace snapshot de archivos en carpeta 
  _backup_pre_bloqueN/ como redundancia (borrar del repo antes 
  del push a main).

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
  + content-visibility en .deportes + reprocesamiento forzado en 
  main.js:60.

- **Bloque 2C** — Recompresión de las 5 imágenes del hero + 
  nosotrosfoto + corrección del preload a aereo-tenis.webp. 
  PageSpeed 75→88. LCP 4.8s→3.1s.

- **Bloque 2D** — CSS crítico inline + diferido de styles.css + fix 
  bug ARIA en deporte-detail (article→div) + recompresión final de 
  nosotrosfoto (88.5→64.9 KiB) + preload de las 2 woff2 del 
  above-the-fold. Mobile: PageSpeed 88→92, FCP 2.6s→0.9s, LCP 3.1s→2.8s, 
  SI 4.4s→2.7s, Nav Agentes 1/2→2/2. Desktop: PageSpeed 87→90, 
  CLS 0.243→0.191.

- **Pre-Bloque 4 (imágenes)** — Rotación real de aereo-futbol.jpg y 
  aereo-hockey.jpg (píxeles, no EXIF). Recompresión de futbol-horizontal 
  (465→217 KiB) y hockey-horizontal (68→32 KiB). Rugby intacto.

- **Bloque 4A** — Rediseño Deportes: container 90rem solo en Deportes, 
  tabs laterales sin crecer con altura fija distribuidos en columna 
  en desktop, imagen edge-to-edge con radios asimétricos en desktop, 
  mobile con ancho normal alineado a la card, alturas variables por 
  ratio real de cada foto (aspect-ratio intrínseco desde width/height 
  del img), min-height 280px en mobile para fotos horizontales chicas, 
  título + descripción overlay dentro de la imagen sobre gradient. 
  Descripción movida del bloque externo al overlay. Contenido con 
  padding interno vs imagen a sangre = patrón intencional de card. 
  10 ajustes iterativos (4A a 4A.10) más activación del swatch de 
  terracota. PageSpeed post-merge: pendiente medir.

## Bloques pendientes (en orden)

- **Bloque 4B** — Sistema visual selectivo: glass en tabs de Deportes 
  y card de "Por qué elegirnos" + textura grain sutil en secciones 
  lisas (Nosotros, Por qué, Contacto). Test de performance conjunto. 
  Rama bloque-4b-visuales.

- **Bloque 3** — Carrusel Parquización: flecha derecha en desktop 
  pasa a siguiente foto, swipe en mobile/tablet, animación liviana.

- **Bloque 5** — Headers de seguridad en vercel.json (CSP, COOP, XFO).

- **Migración a dominio propio** — Comprar grupocespad.com.ar en 
  nic.ar (a nombre de Marcelo, no de Sebas), conectar a Vercel, 
  verificar redirects.

Meta final: cerrar deploy en +90 PageSpeed sin perseguir perfección 
infinita. CLS desktop en 0.191 aceptado como no crítico dado que 
mobile es el tráfico principal.

## Pendientes no bloqueantes
- Conseguir fotos aéreas horizontales reales de fútbol y hockey 
  (las actuales son verticales rotadas, se ven aceptables pero no 
  son tomas panorámicas reales). Pedirlas a Marcelo cuando haya 
  obra nueva con drone disponible.
- CLS desktop 0.191: si desktop pasa a ser tráfico crítico, fix 
  requiere size-adjust en @font-face o self-hosting de fuentes.
- Nueva foto tenis-terracota está activa en el swatch pero verificar 
  visualmente que se ve bien contra las otras 2 (verde y azul).