# Contexto — Landing Grupo CESPAD

Este archivo es autosuficiente: alcanza con leerlo para retomar el proyecto sin
conocer conversaciones anteriores. Si algo cambia, se actualiza acá.

---

## 1. El negocio

Grupo CESPAD vende e instala canchas de césped sintético en **Córdoba,
Argentina**, con obras también en Buenos Aires. Deportes: pádel, tenis, fútbol,
rugby y hockey. Línea secundaria: **parquización** (jardines, quinchos, terrazas,
bares, espacios comerciales).

Es la empresa de **Marcelo**, el papá de Sebas. Sebas hace la web.

Ticket alto y decisión meditada, no compra impulsiva. Los proyectos van desde un
jardín particular hasta un club con varias canchas.

**Objetivo comercial del sitio:** que el visitante escriba por WhatsApp. No hay
checkout ni reserva online. La conversión ES el clic a WhatsApp.

Tres perfiles de cliente:
- **A — Dueño de complejo deportivo.** Busca garantía, plazos y ver obra grande
  terminada. Es el ticket más alto.
- **B — Familia con jardín o quincho.** Decisión más emocional, quiere ver "cómo
  va a quedar" en una casa parecida a la suya.
- **C — Arquitecta/paisajista.** Necesita ficha técnica y portfolio para
  especificar el material en proyectos de sus clientes.

---

## 2. Dónde vive el proyecto

- **Local:** `D:\Desarrollo Web Sebas\GREENSET_COURT Paralelo para actualizar\`
- **Repo:** https://github.com/Seba-fernandez/Grupo-Cespad-actualizacion
- **Deploy producción (rama `main`):** https://grupo-cespad-actualizacion.vercel.app/
- **Rama de trabajo actual:** `bloque-4b-visuales`
- Cada rama pusheada genera su propio preview en Vercel. **Ojo:** los previews
  de rama están protegidos por Vercel Authentication (piden login), la URL de
  producción no. Si se audita "el deploy" sin aclarar cuál, es fácil terminar
  mirando `main` en vez de la rama en la que se está trabajando.
- Migrar a `grupocespad.com.ar` cuando esté comprado (a nombre de Marcelo, no de
  Sebas).

---

## 3. Reglas de git (estrictas)

Sebas no domina git y quiere máxima prudencia.

- **Permitido para Claude:** `status`, `checkout -b`, `add`, `commit`, `branch`,
  `log`, `diff`, `show`.
- **PROHIBIDO para Claude:** `push`, `merge`, `rebase`, `reset --hard`,
  `branch -d/-D`, `checkout main` mientras se trabaja en una rama, y cualquier
  comando destructivo.
- Push, merge y borrado de ramas los hace **Sebas a mano** cuando aprueba.
- Cada bloque de rediseño trabaja en **su propia rama**.

---

## 4. Cómo trabajar con Sebas

- Español rioplatense.
- Archivos completos listos para pegar, no diffs sueltos.
- Cambios quirúrgicos: línea exacta + consecuencia.
- Antes/después con justificación en cada decisión.
- **No inventar contenido.** Si falta un dato, va placeholder explícito.
- Sin emojis en el código, sólo SVG del sprite.
- Código limpio, **sin sobreingeniería ni cosas que no pidió**.
- Bloque por bloque, paso a paso. Una variable por vez.
- No asumir que se aplicaron cambios anteriores: leer los archivos primero.
- **Cada etapa cerrada se documenta antes de pasar a la siguiente.** Va en el
  punto 6 de este archivo (qué se hizo y por qué) y, si cambió algo que el
  README afirma, también en el README. El README no es un informe interno:
  está escrito en primera persona por Sebas para tech leads y recruiters de
  GitHub, y **no puede afirmar nada que el repo no tenga**. Antes de tocarlo,
  verificar que cada cosa que dice exista de verdad.

---

## 4b. Sistema de diseño CESPAD

**https://claude.ai/artifact/7j4tHUo3cRS3DZTtkKnMPm** (privado: sólo lo abre
Sebas hasta que lo comparta desde el menú Share de la página).

Salió del CSS de producción, no de una pizarra: cada valor de ahí está hoy en
el sitio. Tiene los tokens completos (color, tipografía, espaciado, radios,
sombras), un README con las reglas, y cinco componentes con preview en vivo:
Superficie, Botón, Tarjeta, Etiqueta y TítuloSección.

**Antes de agregar algo nuevo al sitio, se consulta ahí.** Las cuatro reglas
que más se rompen:
1. **Un solo acento.** Si algo necesita destacarse y el acento ya está cerca,
   se cambia el peso o la superficie, no se suma un color.
2. **Sólo dos superficies:** elevada (flota) y hundida (recibe algo). No hay
   una tercera.
3. **Cuatro radios:** contenedor `lg`, tarjeta `md`, control `sm`, pastilla
   `pill`.
4. **El ritmo no se toca:** `space-xl` arriba y abajo en todas las secciones.

**Si cambia un token en `styles.css`, hay que actualizarlo ahí también**, o el
sistema pasa a mentir y deja de servir.

---

## 5. Stack y archivos clave

HTML5 semántico + CSS3 con custom properties + JS vanilla en IIFEs.
**Sin frameworks, sin build step, sin librerías.** Se sirve tal cual.

| Archivo | Por qué importa |
|---|---|
| `index.html` | Todo el markup. Incluye el **sprite SVG** (`<defs>` con todos los íconos) y un bloque de **CSS crítico inline** en el `<head>` que duplica a propósito reglas de `styles.css` para el primer render. **Si tocás header o hero en `styles.css`, hay que tocar también el inline o se desincronizan.** |
| `styles.css` | Hoja principal, cargada diferida. Índice numerado arriba del archivo. Todo sale de tokens en `:root`. |
| `main.js` | Módulos IIFE independientes, cada uno hace early-return si su markup no existe (por eso se puede borrar una sección sin romper nada). Acá vive `CONFIG` con el número de WhatsApp: **es el único lugar donde se toca**, alimenta el FAB, el teléfono visible y los botones de cada deporte. **Número definitivo: `5491131496374` (+54 9 11 3149-6374, Buenos Aires).** Reemplazó al viejo de Córdoba (351); no volver a "corregirlo" a un 351. El único otro lugar donde aparece es el `telephone` del JSON-LD en `index.html`. |
| `img/_originales/` | Fuente de reprocesamiento, no se sirve. Incluye `logos/` con los logos viejos (ver punto 9). |

Fuentes (Google Fonts): **Bebas Neue** (display) + **DM Sans** (body).
`IntersectionObserver` para reveals y contadores.

### Convenciones de imágenes
- `pastos/*.webp` → 200px, q78
- `canchas/*.webp` → 1200px, q80
- `aereo-*.webp` (hero verticales) → 900px, q75-78
- `aereo-*-horizontal.webp` (cards deportes) → 1200px, q78
- `proyectos/*.webp` → 1200px, q80
- `textura-pasto.webp` → 1200px, q72
- `nosotrosfoto.webp` / `parquizacion*.webp` → 900-1200px, q78
- `og-image.jpg` → JPG obligatorio (WhatsApp/Facebook no leen WebP en OG)
- `favicon.png` → PNG obligatorio
- cwebp 1.4.0 en `C:\tools\libwebp\libwebp-1.4.0-windows-x64\bin`

---

## 6. Qué está hecho

**Performance (bloques 1, 2A-2D).** Payload de 12.6MB a ~3MB. Compresión de
imágenes, preload del LCP, CSS crítico inline, `content-visibility`, preload de
las 2 woff2 del above-the-fold. Resultado: **mobile PageSpeed 92** (FCP 0.9s,
LCP 2.8s), **desktop 90**. CLS desktop 0.191, aceptado como no crítico porque el
tráfico principal es mobile.

**Bloque 4A — Deportes.** Container de 90rem sólo en esta sección. Tabs
laterales en desktop con altura fija distribuidos en columna; en mobile, tabs
arriba en fila. Imagen con radios asimétricos, altura según el ratio real de
cada foto, `min-height: 280px` en mobile para las fotos panorámicas. Título y
descripción van en overlay sobre la foto. Deep-link: tocar un ícono de deporte
en el hero activa el tab correcto y hace scroll (2 clics hasta WhatsApp).

**Bloque 4B — Sistema visual glass.** `backdrop-filter` en tabs de Deportes,
panel de Deportes y cards de "Por qué elegirnos". Textura grain (SVG
feTurbulence inline, ~700 bytes, 0 requests) en Nosotros y Contacto. Pulse del
nav-cta y hover del FAB pasados a propiedades compositables.

**Bloque 4B.1 — Refinamiento del glass.** Sheen diagonal + inset highlight
superior que simula el filo de luz del vidrio, en vez de blur plano. Blur y
saturate más generosos. Fix de íconos del hero que se veían en miniatura en
mobile (el círculo no baja de 44px por accesibilidad, se redujo el padding
interno a 0.55rem).

**Bloque 6 — Insumos y materiales (22-09-2026).** Sección nueva entre Proceso y
Contacto, con "Insumos" sumado al nav. Público distinto al del resto del sitio:
compra material suelto, no obra llave en mano.

- **La lista es una lista de consulta, no una vidriera.** Cada fila tiene una
  casilla y lo marcado arma el mensaje de WhatsApp (módulo 10 de `main.js`).
  La idea salió de un diseño que armó Sebas aparte con Claude Design.
- **Salida explícita al funnel de obra** ("¿Buscás la obra completa?"), para que
  el que cayó ahí por error no tenga que scrollear para arriba.
- **Sin JS la sección sigue sirviendo**: el CTA ya trae href válido del módulo
  08 y el JS sólo lo reescribe cuando hay algo marcado.
- La casilla es un `<input type="checkbox">` real oculto visualmente, con el
  `<label>` envolviendo toda la fila: 145px de área táctil y teclado gratis.
- **Se oculta sola cuando no hay ningún insumo** (`:has()`), así que se puede
  publicar vacía. Misma idea que el `[hidden]` de Proyectos, pero automática.
- **Para sumar un insumo: un `<li>` más.** El id del input y su `for` tienen que
  coincidir, y `data-insumo` es el nombre que viaja en el mensaje.

**Falta para darla por cerrada:** la lista real de Marcelo, **la unidad de venta
de cada material** (hoy dice `[unidad de venta]` y es lo que sostiene el
concepto), una línea de especificación por ítem, y definir si el CTA va al mismo
WhatsApp o se deriva con `CONFIG.ruteo`.

**Bloque 5 — Headers de seguridad (21-09-2026).** `vercel.json` nuevo, con
CSP, XFO, COOP, CORP, nosniff, Referrer-Policy, Permissions-Policy y HSTS.

**Lo que hay que saber del CSP, porque es lo único de este proyecto que puede
tumbar el sitio entero sin que nadie se dé cuenta:**
- `script-src 'self'` sin `unsafe-inline`. Para lograrlo, el stub de Vercel
  Analytics dejó de ser un `<script>` inline y pasó al tope de `main.js`
  (módulo 00). El orden se mantiene porque los dos scripts son `defer` y los
  defer corren en orden de aparición.
- **Los dos `onload` inline del `<head>` son intocables.** `onload="this.media
  ='all'"` en la hoja de Google Fonts y `onload="this.rel='stylesheet'"` en el
  preload de `styles.css` son los que cargan el CSS diferido. Al primer intento
  el CSP los bloqueó y la página quedaba sin estilos abajo del fold. Se
  resuelven con `'unsafe-hashes'` + el sha256 de cada handler, que está escrito
  en el `vercel.json`. **Si cambiás el texto de uno de esos dos atributos, hay
  que recalcular su hash o el sitio se rompe.**
- `style-src` sí lleva `'unsafe-inline'`, y no hay forma de evitarlo: los
  swatches de color usan `style="--swatch: url(...)"` en el markup, y los
  hashes no aplican a atributos `style`. Es un riesgo mucho menor que el de
  `script-src`.
- `img-src` incluye `data:` por las texturas SVG inline (grain y frost).
- **No se puso `Cache-Control` inmutable en `/img/` a propósito:** Sebas
  reemplaza fotos conservando el nombre (pasó con las de tenis), y con un año
  de caché nadie vería la nueva.
- Verificado en navegador inyectando el CSP como `<meta>`: cero violaciones,
  el CSS diferido se aplica, las fuentes cargan, y tabs, carrusel y link de
  WhatsApp siguen andando.

También se agregó un **`.gitattributes`** que fija LF para los archivos de
texto. Sin eso Windows mete CRLF, y cualquier cosa que dependa del contenido
exacto (un hash de CSP, un diff limpio) se rompe sin avisar.

**Bloque 8 — Jerarquía y corrección de claims (20-09-2026).**
- **"Equipo propio" fuera de todo el sitio.** Los equipos de instalación no son
  propios. Estaba afirmado en la Comparativa y en el paso 03 del Proceso. Y
  había un problema peor: la columna "cancha estándar" le reprochaba a la
  competencia la instalación tercerizada, o sea que el reproche nos volvía.
  Ese ítem ahora apunta al **control**, que es el diferencial que sí se puede
  sostener: "Instalación sin control técnico: el resultado depende de quién la
  toque ese día". Ver la lista de prohibidas del punto 7.
- **Dos pesos de título.** Tokens `--title-lg` (hasta 64px) para las secciones
  donde el visitante decide algo — Deportes, Parquización, Proyectos, Contacto
  — y `--title-sm` (hasta 48px, con un punto más de letter-spacing porque
  Bebas se cierra al achicarse) para las que argumentan a favor de esa
  decisión: Nosotros, Por qué elegirnos, Comparativa, Proceso, Testimonios.
  Se aplica con la clase `.section-title--sm`.
- **Titular de Deportes.** El H2 enumeraba los cinco deportes y ocupaba dos
  renglones. Los nombres ya están en los tabs, en los H3 de cada panel, en el
  subtítulo del hero, en el marquee y en el JSON-LD, así que sacarlos del H2
  no cuesta SEO. Quedó "Deporte por deporte" + **"Cada uno pide una cancha
  distinta"**: un argumento en un renglón, que además explica por qué hay
  cinco construcciones distintas.

**Bloque 7 — Consistencia (20-09-2026).** Cierra los 3 hallazgos más fuertes
de la auditoría del punto 9b.
- **Escala tipográfica en tokens.** 39 declaraciones pasaron a `--text-*`
  (10 escalones, de `--text-2xs` a `--text-4xl`). Los `clamp()` de los títulos
  grandes quedan como están a propósito: ahí el tamaño es fluido por viewport,
  no un escalón. La escala está definida en los DOS `:root` (styles.css y el
  crítico inline), con los mismos valores.
- **De cuatro lenguajes de tarjeta a dos estados de superficie.** El sistema
  ahora distingue **ELEVADA** (`--glass-bevel` + canto + `backdrop-filter`:
  tarjetas, tabs, botones sobre foto) de **HUNDIDA** (`--glass-inset`: inputs
  del formulario y panel de swatches). Comparativa entró a la familia de
  cristal, y su columna premium usa el mismo recurso que el tab activo de
  Deportes: cristal teñido de acento con canto en acento.
- **Regla de radios:** contenedor = `--radius-lg`, tarjeta = `--radius-md`,
  control = `--radius-sm`, pastilla = `--radius-pill` (token nuevo). Los `2rem`
  y `1rem` sueltos se fueron.
- **Cero emojis en el markup.** Los 4 de Contacto y el check del sticker de
  Nosotros son 5 símbolos nuevos del sprite (`i-telefono`, `i-ubicacion`,
  `i-chat`, `i-reloj`, `i-check`). FCP local bajó de 476 a 432ms.

**Bloque 4B.2 — Cristal (20-09-2026).** El glass del 4B/4B.1 se leía como
"foto borrosa detrás de un rectángulo": blur parejo + borde plano de un solo
color. Se reemplazó por una receta de cristal en tokens de `:root`
(`--glass-frost`, `--glass-sheen`, `--glass-rim`, `--glass-filter`,
`--glass-bevel`): ruido finísimo en la superficie, especular concentrado
arriba-izquierda, canto con degradé pintado por `::before` + `mask-composite`,
y `contrast()`/`brightness()` en el filter para despegar la pieza del fondo.
Además se **bajó el tinte en todas**: con el tinte denso de antes no se veía
nada a través del vidrio, que era el problema real. Ahora los íconos del hero
toman el color del panel que tienen atrás y se leen como lentes.
Alcanza a: íconos de deporte del hero, contenedor de tabs en mobile, cada tab
en desktop, tarjetas de Por qué elegirnos, flechas del carrusel y el panel de
Deportes (su canto va al 55% para que los tabs le ganen en brillo).
**Para sumar una pieza de vidrio nueva:** agregá su selector al grupo del aro
(`...::before`) y al bloque `@supports not (mask-composite)`, y componé el
fondo con los tokens. El filo verde del tab activo ya no es `border-left`
sino `inset box-shadow`, porque el borde ahora es el canto.

**Pasada de redacción (20-09-2026).** Sin cambiar la sustancia ni sumar datos
nuevos: se sacó el humo ("superan toda expectativa", "materiales premium"),
se cortó la repetición (4 de 5 deportes abrían con "Superficies"; parquización
decía tres veces lo mismo entre H2, descripción y viñetas), se emparejaron los
largos para que las tarjetas de 3 columnas y los 4 pasos del Proceso cierren
parejos, y se marcaron negritas donde sirven para escanear. `.nosotros-desc
strong`, `.por-que-desc strong` y `.contacto-desc strong` se sumaron a la
regla que sube las negritas a blanco. El copy de **Comparativa no se tocó**:
sigue siendo la referencia de tono.

**Bloque 3 — Carrusel de Parquización (20-09-2026).** La foto fija pasó a
carrusel: flechas en desktop (ocultas abajo de 1024px), swipe de dedo en
mobile/tablet con resistencia en las puntas, dots como indicador de posición.
Sin loop: en la primera y la última la flecha se apaga. El alto del viewport es
la misma `clamp(17rem, 62vw, 26rem)` que tenía la foto, así que el layout no se
movió. El desplazamiento usa `translate` en px (compositable) y se recalcula en
`resize`. **Para sumar una foto alcanza con un `<li class="parq-slide">` más:**
los dots y el contador los arma `main.js` (módulo 09) según la cantidad de
slides, y con una sola slide hace early-return y vuelve a ser foto fija.
El swipe sólo escucha punteros que no sean mouse, para no pelear con el
arrastre nativo de la imagen.

**Fotos de tenis (20-09-2026).** `tenis-verde.webp` y `tenis-azul.webp` se
reemplazaron por versiones nuevas generadas por Sebas, ahora de 1200x617 (antes
586 y 583, así que el swatch ya no produce salto). Los PNG fuente quedaron en
`img/_originales/tenis-verde-2026.png` y `tenis-azul-2026.png`.

**Contenido definitivo (19-09-2026).** Ver punto 7.

### Qué NO tocar
Esto ya funciona y costó trabajo:
- El **hero de 5 paneles** con selector de deporte. Es lo más distintivo del
  sitio, nadie en el rubro lo hace.
- El **deep-link** hero → tab de Deportes (medido: tab activo en 42ms).
- Los **swatches** de color de césped (cambian la foto). Es un configurador de
  producto en miniatura, un diferencial real.
- La **accesibilidad**: ARIA completo en los tabs, navegación por teclado,
  targets de 44px, contraste AA verificado.
- El **formulario** que arma el mensaje de WhatsApp con los datos estructurados.
- El copy de la **Comparativa**: es el de mejor voz de oficio del sitio, sirve de
  referencia de tono.

---

## 7. Contenido definitivo (cerrado por Marcelo/Sebas)

Definitivo **por ahora**: cuando haya ventas se suma más info técnica y datos.
No reescribir sin pedido explícito.

### Sistema de copy — cómo se escribe cualquier texto nuevo

Rol fijo para todo copy del sitio: **copywriter senior + estratega UX de marcas de
arquitectura, ingeniería deportiva y paisajismo premium.** Autoridad técnica y
estatus, cero relleno de IA.

1. **Síntesis drástica.** El texto entra en tarjetas de 3 columnas, etiquetas
   chicas, viñetas y tablas angostas de mobile. Nada de bloques densos. Si una
   ventaja se dice en 8 palabras, no van 15. Sin intros, sin "En resumen", sin
   transiciones obvias: directo al beneficio.
2. **Cero humo corporativo.** Vetadas: "calidad inigualable", "líderes en el
   mercado", "la solución definitiva", "un sinfín de opciones", "el cambiante
   mundo actual", "potenciar tu espacio", "experiencia única", "tecnología de
   punta". Para transmitir calidad se nombra el hecho de ingeniería o la
   propiedad física del material, no el adjetivo.
3. **Eje instalación = ancla de valor.** Nunca "expertos", "profesionales
   calificados" ni "atención especializada". Siempre **"técnicos capacitados en
   instalación"**, amplificado con lo que eso significa para la durabilidad:
   nivelación milimétrica, termosellado de uniones invisibles y control de
   alineación perimetral. **Nunca con "cuadrilla propia" ni "sin
   tercerizar":** ver la lista de prohibidas de abajo.
4. **Sin contrastes infantiles.** Prohibida la fórmula "No es solo X, es Y" y las
   metáforas épicas. El cliente (clubes, complejos, arquitectos, residencial
   alto) compra certezas operativas, durabilidad y valor de inversión.
5. **Ritmo de compresión.** Alternar frase corta y contundente (3-5 palabras) con
   frase técnica fluida. Verbos de acción fuertes, lectura veloz.
6. **Método de entrega.** Primero medir el espacio visual real (tarjeta, título,
   viñeta), después filtrar lista negra y relleno, y entregar el copy listo para
   producción con la opción más pulida primero, sin explicar antes lo que se hizo.

**Extras anti-cliché.** Nada de tricolon ("rápido, simple y confiable"), nada de
gerundio de apertura ("Brindando soluciones…"), el sujeto es la obra o el material
y no "nosotros", sin signos de exclamación, sin adjetivo decorativo cuando el
sustantivo solo alcanza. Prueba final: **si la frase funcionaría igual en la web de
un competidor, se reescribe.**

**Jerarquía.** Las palabras prohibidas de acá abajo y los textos ya cerrados por
Marcelo mandan sobre este sistema. "Los mejores materiales" es la excepción
explícita: está cerrado en Nosotros y en Pádel y no se toca, aunque la regla 2
vetaría ese tipo de frase en cualquier texto nuevo.

### Palabras prohibidas — no reintroducir en ningún lado
- **"instalación especializada" / "especialistas"** → no queremos dar a entender
  que hay especialistas. Se dice "equipos técnicos capacitados".
- **"homologación" / "homologado"** → se agrega más adelante, hoy en ningún lado.
- **"garantía"** → sacada por las dudas. Se habla de postventa y seguimiento.
- **"drenaje"** → todavía no comunicamos ese detalle.
- **"visitamos el lugar" / "nos acercamos a tu terreno"** → por las dudas. Se
  dice que asesoramos sin cargo, sin prometer visita.
- **"equipo propio" / "cuadrilla propia" / "sin tercerizar"** (20-09-2026) →
  **los equipos de instalación no son propios.** Y ojo con el efecto espejo:
  tampoco se le puede reprochar la tercerización a la competencia, porque el
  reproche vuelve. El diferencial que sí se puede afirmar es el **control**:
  "equipos técnicos capacitados y control de calidad en cada etapa".

### Confirmado por Sebas, no volver a marcarlo (20-09-2026)
- **"asesores"** está bien: son Marcelo y su hermano atendiendo. No es el
  "especialistas" de la lista de arriba.
- **"Respuestas en menos de 24hs"** está bien, lo sostienen.

### Textos cerrados
Los de abajo son la **sustancia**, que no se toca. La redacción exacta se
refinó el 20-09-2026 según el sistema de copy de arriba: si hay que volver a
escribir alguno, se respeta la sustancia listada acá, no la redacción vieja.
- **Nosotros (sticker):** "Los mejores materiales".
- **Nosotros (descripción):** "…proyectos de parquización que perduran en el
  tiempo. Combinamos conocimiento y los mejores materiales…".
- **Deportes (título):** eyebrow "Deporte por deporte" + H2 "Cada uno pide una
  cancha distinta". **No volver a enumerar los cinco deportes en el H2**, se
  hace eterno y los nombres ya están en otros cinco lugares de la página.
- **Deportes (subtítulo):** "Seleccioná tu deporte de interés y conocé los
  detalles de cada uno", con negrita en "Seleccioná tu deporte" y "detalles de
  cada uno".
- **Pádel:** canchas panorámicas y full panorámicas de vidrio templado, césped
  con líneas incorporadas, estructura con los mejores materiales.
- **Tenis:** césped sintético con materiales de alto rendimiento y durabilidad.
- **Fútbol:** superficies profesionales para clubes y privados, de 5, 7, 9 y 11.
- **Rugby:** usos intensivos y la mejor absorción de impactos.
- **Hockey:** superficies de arena y de agua, todo tipo de partido, alto nivel.
- **Parquización:** el mismo césped de clubes adaptado a jardines, quinchos,
  terrazas y comercios. El gancho es chicos, mascotas y no regar.
- **Por qué elegirnos:** Alta durabilidad / Instalación / Presupuesto sin cargo.
- **Comparativa:** 4 ítems por lado. El de CESPAD cierra con postventa y
  seguimiento.
- **Proceso:** consulta = asesoramos sin costo; instalación = máximo detalle y
  cuidado.

Las negritas dentro de texto atenuado suben a blanco vía CSS
(`.section-desc strong`, `.parquizacion-desc strong`, `.parquizacion-list
strong`), si no el bold no se nota sobre el gris.

---

## 8. Qué está oculto con `[hidden]` y por qué

El contenido queda en el HTML para reactivarlo después. `[hidden]` tiene
`display: none !important`, así que no deja hueco en grids ni en flex.

| Oculto | Motivo | Para reactivar |
|---|---|---|
| Las 5 fichas técnicas de Deportes (`.deporte-specs`) | La prioridad es la foto de la cancha + la descripción breve | Sacar `hidden` y **completar los `[Ej: ...]`**, que siguen sin llenar |
| Tarjeta "Drenaje optimizado" de Por qué elegirnos | Todavía no comunicamos drenaje | Sacar `hidden`, el grid vuelve solo a 4 columnas |
| Sección Stats | Los números (15 canchas, 5 años, 98%) son de ejemplo, no reales | Sacar `hidden` **sólo con números reales de Marcelo** |
| Sección Proyectos | No hay fotos de obra todavía | Subir fotos a `img/proyectos/` y sacar `hidden` |
| Sección Testimonios | No hay testimonios reales | Ídem |
| Link "Proyectos" del nav | Acompaña a la sección oculta | Sacar `hidden` junto con la sección |

El grid de "Por qué elegirnos" usa `repeat(auto-fit, minmax(13rem, 1fr))` desde
760px y 1 columna abajo. Salta de 1 a 3 columnas sin pasar por 2, justamente
para que 3 tarjetas nunca dejen una huérfana. Verificado: con 3 visibles ocupan
el ancho completo y la cuarta pista colapsa a 0px, sin hueco, en mobile, tablet
y desktop.

---

## 9. Qué falta

### Inmediato
- **Logo.** Sebas lo está buscando/haciendo. El header ya tiene el slot: hay un
  `<a class="logo">` con el texto de marca. Cuando esté el logo, va un `<img>`
  adentro. Los logos viejos están en `img/_originales/logos/` (`Logo.png`,
  `Logo.jpg`, `logo1.jpeg`, `logo2.jpeg`) — rescatados de backups que se
  borraron, **son las únicas copias fuera del historial de git**.
- **README.** Quedó reescrito el 20-09-2026 en primera persona para GitHub.
  Antes afirmaba cosas falsas: dominio `grupocespad.com.ar` (no comprado),
  `vercel.json` y dos `preview-*.png` que no existían (dos imágenes rotas en
  la portada del repo), parallax en el hero (no existe) y contadores de Stats
  (sección oculta). Ahora los previews son reales (`preview-desktop.webp` y
  `preview-mobile.webp`). **Cada vez que cambie algo que el README afirma,
  se actualiza el README en el mismo commit.**
- **`image.png` e `image-1.png`** en la raíz: 3MB, trackeados, no los referencia
  ningún archivo. Preguntarle a Sebas si se borran.

### Fotos pendientes (bloquean secciones enteras)
- **Fotos de obra con nombre de cliente y ciudad** para activar Proyectos. Es lo
  que más falta: hoy se puede recorrer el sitio entero sin ver una prueba de que
  la empresa instaló algo alguna vez.
- La foto de **Nosotros** (`nosotrosfoto.webp`) son paletas y pelotas de pádel
  sobre el pasto, no el equipo trabajando, aunque el `alt` diga lo contrario.
- Las fotos de **Parquización** siguen sin mostrar un jardín de casa de familia,
  que es justo lo que haría sentir identificado al Perfil B. Hoy el carrusel
  tiene dos: `parquizacion.webp` (terraza comercial con muebles verdes) y
  `parquizacion-2.webp` (patio institucional con pista pintada). **Con una
  tercera foto de un jardín residencial real el carrusel gana solo**, no hay que
  tocar JS. Ojo: `parquizacion-1.webp` es byte a byte idéntica a
  `parquizacion.webp`, es un duplicado que se puede borrar.
- Fotos aéreas horizontales reales de fútbol y hockey (las actuales son
  verticales rotadas). Pedirlas cuando haya obra nueva con drone.

### Bloques pendientes (en orden)
- **Migración a dominio propio.** **Sebas lo paga el 21-09-2026** y avisa
  cuando lo conecte a Vercel. Al conectarlo hay que: actualizar las URLs
  absolutas del JSON-LD y del `og:url` en `index.html`, cambiar el link del
  README, y verificar que el `Strict-Transport-Security` del `vercel.json` no
  moleste mientras propaga el DNS. Comprar `grupocespad.com.ar` en nic.ar a
  nombre de Marcelo, conectar a Vercel, verificar redirects.
- **Bloque 6 — Insumos: falta el contenido real.** La sección ya está hecha
  (ver punto 6), pero publica placeholders. **No sacarle el `[unidad de venta]`
  sin el dato real.** Contexto original de la sección:
- ~~**Bloque 6 — Insumos y materiales (en definición, pausado).**~~ Marcelo pidió
  una sección para mostrar que también venden insumos sueltos: arena de relleno,
  césped sintético sin instalación, y otros materiales. Es un **público
  distinto** al del resto del sitio (compra material, no obra llave en mano), así
  que necesita copy y CTA propios ("Consultar por insumos"), si no se mezcla el
  funnel. Tratamiento visual propuesto: catálogo compacto (una foto expositiva
  de un lado, lista de 3-4 ítems con ícono del otro, reutilizando el lenguaje
  de las tarjetas de specs), en vez de repetir el layout narrativo de
  Nosotros/Parquización. Ubicación sugerida: después de Comparativa y antes de
  Proceso, o como franja compacta antes de Contacto.
  **No arrancar sin cerrar con Marcelo:** lista real de insumos, si hay fotos,
  si se muestra precio orientativo o todo va a consulta, y qué tan grande es ese
  negocio (define si merece sección propia o una mención dentro de otra).

### No bloqueante
- CLS desktop 0.191. Si desktop pasa a ser tráfico crítico, el fix requiere
  `size-adjust` en `@font-face` o self-hosting de fuentes.
- Verificar visualmente que el swatch de tenis terracota se ve bien contra el
  verde y el azul.

---

## 9b. Auditoría UX/UI (20-09-2026) — 3.6 → 4.3 → **4.5 / 5** tras el Bloque 8

Revisión de consistencia hecha con el sitio corriendo y midiendo, no a ojo.
El detalle largo está en la conversación; acá queda lo accionable.

### Lo que ya está bien y no hay que romper
- **Ritmo vertical:** las 9 secciones visibles usan `112px` arriba y abajo,
  sin una sola excepción.
- **Movimiento:** 32 de 32 transiciones salen de tokens. Sólo 3 duraciones en
  todo el sitio.
- **Botones:** una sola receta (mismo radio, padding, tamaño y familia) en las
  3 variantes.
- **Fondos:** alternancia disciplinada de 3 superficies (`#0a0a0a`, `#141414`,
  verde-pasto `#0d130c`).
- **Accesibilidad:** `:focus-visible` global de 3px, skip link, ARIA de tabs,
  targets de 44px. **Contraste AA verificado midiendo el pixel real** detrás
  del texto atenuado sobre el vidrio nuevo: 6.5:1, el 4B.2 no lo rompió.

### RESUELTO en el Bloque 8
- ~~Sin jerarquía entre secciones~~ → dos pesos de título, `--title-lg` y
  `--title-sm`. Queda una sola desalineación: Parquización alinea a la
  izquierda y el resto al centro, **y está bien así**, porque es la única
  sección a dos columnas.

### RESUELTO en el Bloque 7
- ~~Tipografía sin tokens~~ → escala de 10 escalones en `--text-*`.
- ~~Cuatro lenguajes de tarjeta~~ → dos estados: elevada y hundida.
- ~~Los 4 emojis de Contacto~~ → 5 símbolos nuevos del sprite.
- ~~Radios fuera de token~~ → regla de 4 radios, con `--radius-pill` nuevo.

### Lo que sigue abierto
Ordenado por lo que más mueve la aguja. Los tres primeros no los toqué porque
**cambian decisiones de diseño o de negocio, no de consistencia**, y esas las
decide Sebas.

1. **El H1 es un nombre, no un argumento.** El `<h1>` real mide 32px y lo que
   domina es "GRUPO CESPAD" a 160px. El hero está en la lista de "no tocar"
   del punto 6, así que esto queda reportado, no propuesto.
2. **Formulario de 7 campos, 4 obligatorios**, para terminar abriendo un chat
   de WhatsApp. Es una decisión de negocio: cuántos datos vale perder un lead.
3. **Espaciado:** los tokens `--space-*` existen pero los componentes siguen
   usando ~20 valores crudos. Es la misma deuda que tenía la tipografía, pero
   se nota mucho menos porque el ritmo entre secciones sí está tokenizado.
4. **Eyebrows con registro mezclado:** 4 de 9 arrancan con "Nuestro/a"
   (etiqueta), el resto son afirmaciones.

Lo de "asesores" y las "respuestas en menos de 24hs" quedó **confirmado por
Sebas**: son Marcelo y su hermano, y el plazo lo sostienen. No volver a
marcarlo.

### Lo que era el diagnóstico original
1. **Tipografía sin tokens.** 29 valores distintos de `font-size` en 47
   declaraciones, y `:root` no tiene un solo token tipográfico mientras color,
   espaciado, radios, sombras y transiciones sí. Entre `0.7rem` y `0.95rem`
   hay once valores que el ojo no distingue pero que delatan que no hay regla.
   Los H3 usan 4 tamaños distintos (22.4 / 24 / 35.2 / 64px).
2. **Cuatro lenguajes de tarjeta.** Cristal (radio 16px), Comparativa (sólida
   `#1e1e1e`, radio 24px), inputs del formulario (sólida `#141414`, radio 8px)
   y swatches (translúcida sin vidrio, radio 16px). El 4B.2 unificó cinco
   componentes y dejó afuera a los otros tres. **Es el punto que más se nota.**
3. **Los 4 emojis de Contacto.** `📞` (x2), `📍` y `🚗` son multicolor en una
   marca de dos colores. Además violan la regla del punto 4 de este archivo.
   Es el arreglo más barato de todos: 3 símbolos nuevos en el sprite.
4. **Sin jerarquía entre secciones.** Los 9 H2 miden 64px. Deportes (el funnel
   principal) grita igual que Proceso. Y 8 están centrados y 1 a la izquierda.
5. **El H1 es un nombre, no un argumento.** El `<h1>` real mide 32px y lo que
   domina la pantalla es "GRUPO CESPAD" a 160px. Atlantis (punto 12) titula
   *"Césped sintético hecho por la fábrica que lo instala"*. El titular más
   grande del sitio no dice qué vendemos ni por qué.
6. **Formulario de 7 campos, 4 obligatorios**, para terminar abriendo un chat
   de WhatsApp. Mucha fricción para el único objetivo del sitio.

### Menores
- Espaciado: los tokens `--space-*` existen pero los componentes usan ~20
  valores crudos (`0.4`, `0.6`, `0.65`, `0.7`, `0.75`, `0.8`, `0.85`…).
- 3 radios fuera de token: `2rem`, `1rem` (duplica `--radius-md`) y `2px`.
- Eyebrows con registro mezclado: 4 de 9 arrancan con "Nuestro/a" (etiqueta),
  el resto son afirmaciones.
- "Respuestas en menos de 24hs por nuestros asesores": promete un plazo que
  nadie confirmó y usa "asesores", primo hermano de "especialistas".

### Orden sugerido para cerrar la brecha
Tokens tipográficos → unificar Comparativa y formulario al lenguaje de cristal
→ emojis a sprite → jerarquía de H2. Con eso el sitio llega a 4.5.
**Los tres primeros están hechos (Bloque 7). Falta la jerarquía de H2.**

---

## 10. Datos que faltan de Marcelo


- Obras reales con nombre de cliente y ciudad (aunque sean 5).
- Años de trayectoria y cantidad de canchas instaladas, reales, para Stats.
- Plazos reales de obra por tipo de proyecto.
- Datos técnicos de cada deporte para reactivar las fichas.
- Si existe o se quiere crear un programa/descuento para arquitectos.

---

## 11. Aprendizajes (leer antes de proponer rediseños)

**Hubo un intento de rediseño de identidad (llamado 4C) que Sebas rechazó
entero y se borró.** Cambiaba tipografía (Chivo en vez de Bebas), paleta,
radios, alineaciones, sacaba el marquee y reemplazaba el H1. A Sebas le pareció
**amateur** y dijo que lo prefería como lo tenía. Lo único que rescató fueron
los botones de deporte.

Qué aprender de eso:
- No cambiar muchas variables a la vez y mostrar el resultado completo. Una
  variable por vez, así se ve qué mejora y qué empeora.
- El gusto de Sebas manda sobre cualquier regla de manual de diseño.
- No aplicar recomendaciones de skills de diseño en masa. Se sintió como
  cambios "al pedo".

---

## 12. La competencia

**Atlantis Sport** — https://atlantissport.com.ar/
Se presentan como la primera fábrica de césped sintético de Argentina, +30 años.
Están consolidados y su sitio está bien hecho (Vite + Tailwind).

Lo que hacen mejor y conviene tener presente:
- Su H1 es un argumento, no un nombre: *"Césped sintético hecho por la fábrica
  que lo instala"*.
- Tienen tres números de prueba arriba de todo.
- Listan **13 obras con nombre de cliente y ciudad**. Y acá está la lección más
  útil: **sus fotos son mediocres y no importa.** Lo que vende es el "Club
  Sarmiento - San Luis" debajo de la foto. La procedencia le gana a la calidad
  de producción.
- Ponen un calificador de una pregunta en el hero, no un formulario al final.

**No copiarlos, MEJORAR LO NUESTRO SIN DAR INDICIOS DE DISEÑO QUE TIRA COMO OUTPUT GENERICO DE IAS, hacer investigacion firme de diseños en webs de altisimo nivel y adaptar la personalidad, no solo "lo mas bueno y correcto"** No se compite contra ellos en escala ni en "somos la fábrica".
Sirven como referencia de qué tan alta está la vara y de qué convenciones del
rubro conviene respetar, no como modelo a imitar.

---

Meta final: cerrar el deploy en +92 PageSpeed sin perseguir perfección infinita, la prioridad es que funcione rapida y pueda mantener un gran diseño original.
