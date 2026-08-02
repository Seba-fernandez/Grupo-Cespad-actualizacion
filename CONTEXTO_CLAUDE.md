# Contexto — Landing Grupo CESPAD

Landing page para venta e instalación de canchas deportivas de césped 
sintético. HTML/CSS/JS vanilla, sin frameworks, sin build step.

- Deploy: https://grupo-cespad-actualizacion.vercel.app/
- Local: D:\Desarrollo Web Sebas\GREENSET_COURT Paralelo para actualizar\
- Git: rama local `master`, remota `main`. Push con `git push origin HEAD:main`.

## Estado actual

- Optimización de imágenes: EN CURSO (queda cerrar pendientes).
- Todas las imágenes servidas están en `img/`.
- Originales de alta resolución en `img/_originales/` (no se sirven).
- Backups previos en carpetas `_backup*` en la raíz. NO borrar.

## Convención de imágenes

- pastos/*.webp → 200px ancho, q78
- canchas/*.webp → 1200px ancho, q80
- aereo-*.webp (verticales del hero) → 900px, q75-78
- aereo-*-horizontal.webp (dentro de cards) → 1200px, q78
- proyectos/*.webp → 1200px, q80
- textura-pasto.webp → 1200px, q72
- nosotrosfoto.webp / parquizacion*.webp → 900-1200px, q78
- og-image.jpg → JPG (WhatsApp/Facebook no leen WebP en OG)
- favicon.png → PNG

## Cómo trabajar conmigo (Sebas)

- Español rioplatense.
- Entregame archivos completos listos para pegar, no diffs sueltos.
- Cuando el cambio sea quirúrgico, indicá línea exacta y consecuencia.
- Mostrame antes/después y justificá cada decisión.
- No inventes contenido, usá placeholders explícitos.
- Sin emojis en código, solo SVG.
- Código limpio y escalable, sin sobreingeniería.
- Yo mantengo la versión deployada estable como fallback y trabajo local 
  antes de pushear. No asumas que ya apliqué cambios anteriores.

## Stack

- HTML5 semántico, CSS3 con custom properties, JS vanilla en IIFEs.
- Google Fonts: Bebas Neue (display) + DM Sans (body).
- IntersectionObserver para reveals y contadores.
- Herramienta de imágenes: cwebp 1.4.0 (ya instalado en C:\tools\libwebp\bin).

## Bloques de trabajo pendientes

**Bloque 1 (INMEDIATO):** cerrar pendientes de optimización de imágenes.
**Bloque 2:** preload del LCP + limpieza de fetchpriority en el hero.
**Bloque 3:** carrusel para sección Parquización.
**Bloque 4:** rediseño de sección Deportes (imagen full-width, botones fuera).
**Bloque 5:** content-visibility en Deportes.
**Bloque 6:** headers de seguridad en vercel.json.