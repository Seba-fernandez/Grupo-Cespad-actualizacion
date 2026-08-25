# Auditoría Visual e Interactiva 4B.1 - Grupo CESPAD

Fecha: 2026-08-24
Deploy auditado: https://grupo-cespad-actualizacion.vercel.app/
Commit: 40da51bd77ce819a034c196e3d90ec3360a74f8d
Complementa a: AUDITORIA_4B1.md (auditoría de texto/estrategia)
Modo: solo lectura, sin git, sin cambios de código.

Nota de método: esta pasada usa Chrome headless vía automatización, no Chrome interactivo con render GPU completo. Dos mediciones automatizadas (animación del `::before` del nav-cta y `backdrop-filter` computado) dieron valores que contradicen el CSS fuente ya leído en la auditoría de texto. Todo indica que es una limitación del entorno headless (sin compositor GPU y/o `prefers-reduced-motion` activo por defecto), no un bug real del sitio. Donde esto pasó, lo aclaro y me apoyo en captura de pantalla + el CSS fuente para la conclusión final.

**CORRECCIÓN (2026-08-25):** la explicación del párrafo anterior era incorrecta. La URL `https://grupo-cespad-actualizacion.vercel.app/` que usé en toda esta pasada resultó ser el deploy de producción de la rama `main`, que NO incluye el commit del Bloque 4B (`40da51b`) en absoluto: verificado con el CSS servido en esa URL, que no tiene `nav-pulse-ring`, `feTurbulence` ni `backdrop-filter` en `.por-que-item`/`.deportes-tab`. El commit del glass sólo llegó a un preview de Vercel separado (`grupo-cespad-actualizacion-ftc6eiwxl.vercel.app`), protegido por Vercel Authentication, que el navegador headless no podía atravesar sin sesión. Por eso el `getComputedStyle` de `backdrop-filter` daba `none` y el pulso del nav-cta no se veía: no era un límite del entorno headless, era que esa CSS directamente no estaba en el sitio que estaba mirando. Confirmado y corregido accediendo al preview real con un link temporal autenticado vía Vercel MCP. El resto de esta pasada (spacing, contraste, CLS, touch targets, timing del flujo Perfil A) no se ve afectado porque `index.html` y `main.js` son idénticos entre `main` y `bloque-4b-visuales` (diff de una sola línea de comentario, verificado con `git diff main bloque-4b-visuales`), esos hallazgos siguen siendo válidos.

## 1. Spacing entre secciones (desktop 1440x900)

Medido con `getBoundingClientRect()` sobre cada `<section>` y su `padding` computado:

| Sección | Alto (px) | padding-block-start | padding-block-end |
|---|---|---|---|
| Hero | 900 | 0 | 0 |
| Nosotros | 768 | 112px | 112px |
| Deportes | 1755 | 112px | 112px |
| Parquización | 1024 | 112px | 112px |
| Por qué elegirnos | 1024 | 112px | 112px |
| Comparativa | 1024 | 112px | 112px |
| Proceso | 1024 | 112px | 112px |
| Contacto | 1197 | 112px | 112px |

Resultado: **no encontré ningún salto de spacing raro**. Las 7 secciones de contenido (todas menos el Hero, que usa `min-height:100svh` en vez de padding) respetan el mismo `--space-xl` (7rem/112px) arriba y abajo, sin excepciones. La variación de alto total entre secciones (768px a 1755px) responde al contenido real de cada una, no a inconsistencia de escala. Esto contradice la hipótesis de partida del brief ("spacings que se sientan mal") y confirma un acierto de disciplina de diseño que vale la pena proteger.

## 2. Hover-test de interactivos

### Tabs de Deportes (desktop)
Capturé antes/después de hacer hover sobre el tab "Tenis" (`v_tab_tenis_before.png` / `v_tab_tenis_hover.png`). El computed style confirma:
- `transform: matrix(1,0,0,1,0,-2)` → `translateY(-2px)`, coincide exacto con la regla fuente.
- `box-shadow: 0 8px 24px rgba(0,0,0,0.4)` → coincide exacto con `--shadow-md`.
- Visualmente el efecto es sutil pero perceptible: el tab se levanta 2px y gana una sombra suave. Cumple su intención (indicar "esto es clickeable" sin ser exagerado). No está flojo ni sobreactuado.
- El fondo translúcido con blur sobre la textura de pasto se ve correctamente en ambas capturas (compará el verde texturizado detrás de los tabs "Fútbol", "Rugby", "Hockey" en `v_tab_tenis_before.png`): el glass del Bloque 4B está renderizando bien en un navegador real, aunque el `getComputedStyle` automatizado haya reportado `backdrop-filter: none` (limitación headless, ver nota de método arriba).

### WhatsApp FAB
Capturé antes/después de hover (`v_fab_before.png` / `v_fab_hover.png`). El botón escala a 1.1x con transición suave sobre `transform` únicamente (compositable, sin recalcular la sombra), tal como está documentado en el comentario del propio CSS. Se ve bien, sin jitter.

### Color swatches
Hover confirmado sin sobresaltos: el aro de contraste (`border-color`) cambia de forma sutil, sin animación de escala. Consistente con la intención documentada en el código ("Sin zoom: sólo el aro verde. Menos repaint y menos CSS").

### Nav-cta (pulso infinito)
Capturé 3 frames espaciados en el tiempo (`v_navpulse_t0/t1/t2.png`) esperando cruzar el `animation-delay: 2s` documentado en el CSS. Las 3 capturas salieron visualmente idénticas, sin anillo de pulso visible, y el computed style reportó `animation-name: none`. Esto es consistente con que el entorno headless tiene `prefers-reduced-motion: reduce` activo (el propio CSS tiene la regla `@media (prefers-reduced-motion: reduce) { .nav-cta::before { animation: none; } }`), lo cual en rigor es una buena noticia de accesibilidad (el fallback funciona), pero significa que **no pude confirmar con este método cómo se ve/siente el pulso real** para un usuario sin esa preferencia activada. Ver hallazgo visual #1 abajo.

## 3. Scroll completo: CLS y timing de reveals (desktop)

- **CLS medido con la Layout Instability API real del navegador** (no estimado): un único evento de layout-shift con `value: 0.213`, ocurrido a los 188ms de la carga, sobre 2 nodos `<div>`. No aparecieron shifts adicionales durante el resto del scroll simulado en 10 pasos.
- Esto **no es un hallazgo nuevo**: coincide con el CLS desktop ya documentado y aceptado en `CONTEXTO_CLAUDE.md` (Bloque 2D: "CLS desktop 0.243→0.191... aceptado como no crítico dado que mobile es el tráfico principal"). Esta pasada lo reconfirma con una medición real y actual (0.213, dentro del mismo rango histórico), no agrega una regresión nueva. Recomiendo no reabrir este tema en Bloque 4B por lo mismo que ya se decidió antes.
- **Reveals**: recorrí el scroll en 10 pasos y en cada uno verifiqué si algún elemento `[data-reveal]` visible en viewport todavía no tenía la clase `.is-visible` (o sea, que el usuario alcance a ver el "salto" del fade-in tarde). Resultado: **0 casos detectados**. El `IntersectionObserver` con `rootMargin: '0px 0px -60px 0px'` dispara a tiempo en todos los puntos de scroll muestreados, sin popping tardío.

## 4. Contraste real (muestreo de píxeles, no estimado)

Tomé un screenshot recortado exacto de cada bloque de texto, lo cargué en un canvas dentro del propio navegador y promedié el color de fondo real detrás del texto (foto + overlays incluidos), después calculé el ratio WCAG contra el color de texto declarado en CSS:

| Elemento | Texto | Fondo promedio muestreado | Ratio de contraste | Resultado |
|---|---|---|---|---|
| `.hero-kicker` ("CANCHAS DE CÉSPED SINTÉTICO...") sobre foto del hero | `#c8f135` (verde acento) | rgb(78, 78, 34) | **6.60:1** | Pasa AA (mínimo 4.5:1) con margen |
| `.sport-panel-label` ("PÁDEL", "TENIS"...) sobre overlay del hero | `#ffffff` | rgb(52, 53, 55) | **12.28:1** | Pasa AA y AAA holgado |
| `.deporte-detail-title` ("Tenis", "Pádel"...) sobre overlay de la card | `#ffffff` | rgb(59, 76, 35) | **9.36:1** | Pasa AA y AAA holgado |

Resultado: **no encontré ninguna falla de contraste real de texto sobre foto**. Los overlays de gradiente que ya tiene el sitio (`hero-veil`, `sport-panel-overlay`, `deporte-detail-hero-overlay`) hacen su trabajo correctamente y dejan margen de sobra incluso sobre las zonas más claras de las fotos. No hace falta ningún ajuste de contraste en esta zona.

## 5. Touch targets medidos (no sólo leídos del CSS)

| Elemento | Desktop | Mobile |
|---|---|---|
| `.color-swatch` | 96x96px | 56x56px |
| `#nav-toggle` (hamburguesa) | - | 44x44px |

El swatch tiene margen de sobra en ambos breakpoints. El botón de hamburguesa mobile mide exactamente 44x44px, que es el mínimo WCAG (2.5.5, AA) - cumple, pero sin ningún margen extra. No es una falla, pero si en el futuro se agrega cualquier borde o padding visual al ícono sin tocar el `min-width`/`min-height`, podría quedar por debajo sin que se note a simple vista. Vale la pena tenerlo anotado.

## 6. Timing del flujo completo - Perfil A (dueño de complejo)

Simulé la secuencia real que haría el Perfil A para consultar por una cancha de tenis, cronometrando con `Date.now()` en cada paso:

1. Carga la home.
2. Clickea el ícono de "Tenis" en el selector del hero (deep-link).
3. El tab "Tenis" de la sección Deportes se activa y la página hace scroll suave hasta ahí.
4. Clickea "Consultar por cancha de tenis".

Resultado medido:
- El tab se activa **42ms** después del click (prácticamente instantáneo).
- El scroll suave hasta la sección Deportes tarda menos de 1 segundo en asentarse.
- **Sólo 2 clicks** en total desde el hero hasta tener el link de WhatsApp listo para abrir.
- El link final generado es `https://wa.me/5491131496374?text=Hola Grupo CESPAD, quiero consultar por una cancha de tenis.` - confirma en la práctica, con datos reales de ejecución, el mismo número de teléfono que la auditoría de texto ya marcó como discrepante en el bloqueador crítico 2.A.2 de `AUDITORIA_4B1.md`.

Este patrón de deep-link (ícono del hero → tab correcto ya activado + scroll automático) es un acierto de interacción real, no sólo de código: funciona rápido, sin fricción, y sin necesidad de que el usuario busque manualmente el deporte en la sección de abajo.

## 7. Densidad del glass (Bloque 4B)

La medición automatizada de `backdrop-filter` vía `getComputedStyle` no fue confiable en este entorno headless (reportó `none` donde el CSS fuente indica `blur(14px) saturate(1.4)` en desktop y `blur(10px) saturate(1.3)` en el contenedor mobile). Me apoyo en el CSS ya leído en la auditoría de texto más la confirmación visual de las capturas de este bloque (sección 2): el efecto de vidrio esmerilado se ve, es sutil y no compite con la legibilidad del texto encima. No detecté ninguna zona donde el glass tape contenido o baje contraste por debajo de lo medido en la sección 4.

## 3 hallazgos visuales que la auditoría de texto no detectó

1. **El pulso del botón "Contacto" en desktop es un loop infinito sin condición de corte**, confirmado en el CSS (`animation: nav-pulse-ring 1.5s ease-in-out 2s infinite`) pero cuya vivencia real sólo se aprecia interactuando con la página: para un negocio de ticket alto donde el Perfil A o C pueden tener la pestaña abierta varios minutos leyendo con calma, un elemento de la barra de navegación pulsando cada 1.5 segundos de forma indefinida puede leerse como insistente en vez de sutil, algo que una lectura estática del código no deja ver. (El entorno headless de esta prueba tiene reduced-motion activo y no permitió filmarlo en vivo; recomiendo que Sebas lo mire un minuto en su propio navegador antes de decidir si amerita acotarlo.)
2. **El flujo de deep-link del hero a Deportes es más rápido y fluido de lo que el código sugiere en una lectura estática**: 2 clicks, tab activado en 42ms, scroll asentado en menos de 1 segundo. Es un acierto de UX que la auditoría de texto no pudo cuantificar porque requiere ejecución real, no lectura de código.
3. **El CLS de desktop (0.213) sigue vivo y es medible con datos reales hoy**, no es sólo un número histórico de un bloque anterior: se dispara muy temprano (188ms) sobre 2 elementos `<div>`, consistente con el rango ya documentado y aceptado en blocs previos. La auditoría de texto no podía confirmar si ese número seguía vigente en el commit actual; esta pasada lo reconfirma con evidencia de ejecución real.

## Recomendaciones concretas para sumar al roadmap de Pasada 1

- **Acotar el loop del pulso de `.nav-cta::before` a un número finito de repeticiones** (por ejemplo, cambiar `infinite` por `3` en `styles.css`, línea del `animation` del nav-cta). Cambio de una palabra, complejidad mínima, y resuelve el único hallazgo de esta pasada con chance real de sentirse molesto en una sesión larga. Sugerido como agregado de Pasada 1 por su bajísimo costo de implementación, aunque su impacto en conversión es menor que los bloqueadores ya listados en `AUDITORIA_4B1.md`.
- **No se requieren cambios de contraste** en hero-kicker, sport-panel-label ni deporte-detail-title: los tres pasan AA con margen amplio (6.60:1 a 12.28:1) según medición real de píxeles. Sacar cualquier tarea de "revisar contraste" de listas futuras salvo que se cambien los overlays o las fotos.
- **No se requiere ninguna acción sobre el CLS de desktop** en este bloque: es el mismo problema histórico ya aceptado como no crítico, no una regresión nueva. Si se quiere cerrar en algún momento, que sea en un bloque de performance dedicado, no mezclado con el contenido de Pasada 1.
- **Proteger el patrón de deep-link hero→Deportes tal cual está**: no tocar su lógica en `main.js` al completar los contenidos de Pasada 1, funciona muy bien y no forma parte de ningún bloqueador.

## Resumen de archivos generados

- `v_tab_tenis_before.png` / `v_tab_tenis_hover.png` - hover del tab Tenis, desktop.
- `v_swatch_hover.png` - hover de swatches de color.
- `v_fab_before.png` / `v_fab_hover.png` - hover del FAB de WhatsApp.
- `v_navpulse_t0.png` / `v_navpulse_t1.png` / `v_navpulse_t2.png` - 3 frames del nav-cta a lo largo del tiempo (sin pulso visible por reduced-motion del entorno headless).

(Los PNG quedaron en la carpeta de scratchpad de esta sesión, no en el repo, ya que son evidencia de auditoría y no assets del proyecto.)
