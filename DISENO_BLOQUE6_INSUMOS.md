# Bloque 6 — Insumos y materiales · Propuesta de diseño

Estado: **IMPLEMENTADA** (22-09-2026). El mockup `_mockup-insumos.html` se borró.

## Cómo quedó, y de dónde salió cada cosa

De esta propuesta sobrevivieron el planteo del problema (dos compras distintas
en una misma página), la ubicación entre Proceso y Contacto, el peso de título
chico, el fondo `bg-pasto`, el panel de vidrio con filas en vez de tarjetas, la
pastilla de unidad y el auto-ocultado con `:has()`.

**Lo que cambió, y vino de un diseño que armó Sebas aparte con Claude Design:**

1. **La lista no muestra: registra.** Cada fila tiene una casilla, y lo marcado
   arma el mensaje de WhatsApp. Eso convierte a la sección de vidriera en
   herramienta, y engancha con el módulo que ya existía para el formulario. Es
   la mejora más grande y no estaba en esta propuesta.
2. **Salida explícita al funnel de obra:** *"¿Buscás la obra completa? Pedí tu
   presupuesto"*. Resuelve el problema de los dos públicos mejor que nada de lo
   que yo había planteado: el que cayó acá por error vuelve sin scrollear.
3. **"También podés escribirnos sin marcar nada"**, para que la casilla no se
   lea como obligatoria.
4. **"¿No está en la lista? Escribinos qué necesitás"** en el pie del panel.
   Cubre el catálogo incompleto, que es justo el estado en el que está el
   negocio.
5. **Encabezado del panel** con "Lista de consulta" y el contador de marcados,
   que le da identidad de herramienta.
6. Copy más preciso: *"Lastra el paño y mantiene las fibras erguidas"* en vez de
   un placeholder.

**Lo que agregué yo al implementarlo, que el diseño no resolvía:**

- La casilla es un `<input type="checkbox">` real, oculto visualmente pero
  operativo, con el `<label>` envolviendo **toda la fila**: área táctil de
  145px de alto y navegación por teclado gratis.
- `aria-live="polite"` en el contador, para que un lector de pantalla anuncie
  los cambios.
- **Sin JavaScript la sección sigue sirviendo**: el CTA ya trae un `href` válido
  del módulo 08 y el JS sólo lo reescribe cuando hay algo marcado.
- Un solo listener delegado: sumar un insumo es markup, no JS.

---

## 1. El problema, bien planteado

No es "falta una sección". Es que **una misma página tiene que atender dos
compras que no se parecen en nada**.

| | Obra llave en mano | Insumos |
|---|---|---|
| Qué compra | un resultado terminado | una materia prima |
| Quién decide | dueño de club, familia, arquitecta | constructor, contratista, alguien que ya tiene instalador |
| Cómo se convence | viendo cómo queda | sabiendo qué es y cómo se vende |
| Unidad | el proyecto | m², tonelada, rollo |

Todo el sitio, hasta hoy, vende **resultados**: fotos aéreas de canchas
terminadas, jardines listos, el antes y después de la Comparativa. Es
aspiracional y funciona.

Insumos vende lo contrario: **el material antes de ser nada.**

Si le aplico el mismo tratamiento —foto grande, promesa, aspiración— el
visitante de obra se confunde y el de insumos no se reconoce. Si le aplico algo
completamente distinto, rompo el sitio.

## 2. La decisión central

**La sección no se diferencia por verse más linda ni más grande. Se diferencia
por cambiar de registro: de fotografía a especificación.**

El resto del sitio muestra. Esta sección **lista**. Mismos tokens, misma paleta,
mismas superficies — pero la composición deja de ser una galería de tarjetas y
pasa a ser una **ficha de materiales**.

Tres consecuencias buenas de esa decisión:

1. **Resuelve el problema de las fotos.** Hoy no hay fotos de insumos y
   probablemente no las haya al lanzar. Una sección construida sobre
   especificación no las necesita: la restricción se vuelve el concepto, en vez
   de ser un agujero tapado.
2. **Se lee distinta en un vistazo**, sin gritar. El visitante entiende que acá
   se vende otra cosa antes de leer una palabra.
3. **Escala bien.** Una lista aguanta 3 ítems o 12. Una grilla de tarjetas con
   5 ítems te deja una huérfana.

## 3. Ubicación: entre Proceso y Contacto

Las dos candidatas eran "después de Comparativa" y "franja antes de Contacto".
Me quedo con la segunda, y el argumento es el recorrido:

El orden actual es **oferta → argumento → acción**:

```
Deportes · Parquización  →  Por qué · Comparativa · Proceso  →  Contacto
      (las ofertas)            (por qué nosotros)              (acción)
```

Comparativa y Proceso son **específicamente de obra** ("cancha estándar vs
cancha CESPAD", "de la consulta al primer partido"). Meter Insumos en el medio
de ese bloque parte el argumento de obra al medio, justo cuando está cerrando.

Puesta **después de Proceso y antes de Contacto**, Insumos funciona como lo que
es: *"y si nada de esto era lo tuyo, también vendemos el material"*. Cae
exactamente en el punto donde el visitante que no enganchó con obra estaba por
irse. Y su CTA queda pegado al formulario, que es la zona de conversión.

**Con una condición que no es opcional:** hay que sumar **"Insumos" al nav del
header**. Sin eso, el que viene buscando arena tiene que scrollear la página
entera de obra para encontrarla. El nav es el atajo y es barato.

## 4. Peso visual: el chico, a propósito

**Título en `--title-sm` (hasta 48px), no en `--title-lg`.**

Sé que la regla que escribimos dice que `--title-lg` es para las secciones donde
el visitante decide algo, e Insumos es una de ellas. Pero la jerarquía visual
tiene que espejar la jerarquía del negocio, y esta es una línea secundaria que
Marcelo describe como "vender aparte".

**La sección no necesita ser más grande para destacarse, porque se destaca por
ser distinta.** Diferenciar por textura en vez de por tamaño es la jugada más
fina de las dos, y además no le compite a Deportes, que es el funnel que paga
las cuentas.

**Fondo: `bg-pasto`** (#0d130c con textura). Respeta la alternancia — Proceso es
#0a0a0a y Contacto es #141414, así que ninguno de los dos se repite — y encima
la textura de pasto es temáticamente correcta: literalmente es el material.

## 5. El layout

### Composición

Una sola **pieza de vidrio elevada** (la superficie que ya existe: bevel + canto
+ backdrop-filter + frost), con los materiales adentro como **filas separadas
por hairlines**.

No tarjetas. El sitio ya tiene tres grillas de tarjetas (Por qué, Comparativa,
los tabs). Una cuarta sería ruido. **Un panel con filas se lee como documento,
que es exactamente el registro que busco.**

### La fila

```
┌──────────────────────────────────────────────────────────┐
│  [ícono]   NOMBRE DEL MATERIAL              ( por m² )   │
│            una línea de especificación corta              │
├──────────────────────────────────────────────────────────┤
│  [ícono]   OTRO MATERIAL                 ( por tonelada ) │
│            una línea de especificación corta              │
└──────────────────────────────────────────────────────────┘
```

- **Ícono**: del sprite, mismo trazo 1.75 que todos.
- **Nombre**: Bebas, `--text-xl` (24px), el mismo cuerpo que los títulos de
  tarjeta del resto del sitio.
- **Especificación**: DM Sans, `--text-md` (15px), atenuado.
- **Pastilla de unidad**: `--radius-pill`, `--text-2xs` (12px), en acento.

### La pastilla de unidad es el detalle que sostiene todo

**Nada en el sitio tiene unidades.** Todo se vende por proyecto. Esa pastilla
—"por m²", "por tonelada", "por rollo"— es lo único que aparece en la página
entera que dice *"esto se compra por cantidad, no por obra"*.

Es un elemento chico, honesto y que no existe en ningún otro lado. Es lo que
separa los dos funnels de un vistazo, sin cartel explicativo.

### Comportamiento por cantidad, sin JS

Con `:has()`, que ya es estándar en todos los navegadores:

- **Hasta 4 ítems** → una columna. Filas anchas, con aire para la
  especificación.
- **5 o más** → dos columnas desde 1024px. Sigue una sola columna en mobile.
- **Cero ítems** → **la sección entera se oculta sola.**

Ese último punto importa: **podemos dejar la sección escrita y publicada hoy, y
no aparece hasta que haya un solo ítem cargado.** Es la misma filosofía del
`[hidden]` que ya usamos en Proyectos y Testimonios, pero automática — nadie se
tiene que acordar de encenderla.

### Y si algún día hay foto

Una sola, expositiva, a la izquierda en desktop. La grilla se adapta con
`:has()`: si hay foto, dos columnas; si no, la lista ocupa todo. **Sin foto es
el estado por defecto, no el degradado.**

### Los tres breakpoints

| | < 760px | 760–1024px | > 1024px |
|---|---|---|---|
| Sección | todo apilado | todo apilado | intro izq + panel der, o intro arriba |
| Filas | ícono + nombre, unidad en su propia línea | unidad al lado del nombre | 1 o 2 columnas según cantidad |
| CTA | ancho completo | ancho completo | al ras izquierdo |

## 5b. Lo que cambió al maquetarlo

El mockup corrigió tres cosas que en papel parecían bien:

1. **Sin foto, el panel a ancho completo dejaba media pantalla muerta.** El
   texto del intro usa 45 caracteres de ancho y al lado no había nada. Ahora
   en desktop son **siempre dos columnas** —intro a la izquierda, panel a la
   derecha— haya foto o no. El intro queda `sticky` mientras se recorre la
   lista.
2. **Con 5 ítems o más, dos columnas adentro de la columna angosta apretaban
   todo**: los nombres se partían en dos renglones y las specs en tres. Ahora
   a partir del quinto ítem **el panel se lleva el ancho completo** y el intro
   se va arriba en una línea. Cada fila pasa de ~320px a ~552px.
3. **En mobile la pastilla al lado del nombre dejaba dos columnas flacas.**
   Baja a su propia línea abajo del nombre; recién desde 760px vuelve al
   costado.

Ninguna de las tres se veía leyendo la propuesta. Por eso conviene mirarlo.

## 6. Copy

Bajo las reglas de siempre. Los materiales van con placeholders porque **no
tengo la lista real y no la voy a inventar**.

- **Eyebrow:** `También vendemos el material`
- **Título:** `Materiales sueltos, sin instalación`
- **Bajada:** `El mismo material que ponemos en obra, por cantidad. Para quien ya tiene quién se lo instale.`
- **CTA:** `Consultar por insumos`

"Sin instalación" hace todo el trabajo de segmentación en dos palabras. Y la
bajada nombra al comprador sin describirlo de más.

Filas, con lo que Sebas ya adelantó que va a haber:

| Nombre | Especificación | Unidad |
|---|---|---|
| Arena de relleno | `[granulometría y tipo]` | `[por tonelada / por bolsa]` |
| Césped sintético | `[altura de hilo y densidad]` | `[por m² / por rollo]` |
| `[tercer material]` | `[especificación]` | `[unidad]` |

**Ninguna promesa nueva.** Nada de stock, plazos ni precios: eso no está
confirmado y el CTA manda a consultar, que es lo honesto.

## 7. Costos técnicos

| | |
|---|---|
| Peso | **0 KB de imágenes** en el estado por defecto |
| JS | **Ninguno.** La cantidad la resuelve `:has()`, el reveal ya existe |
| Fuentes | ninguna nueva |
| Íconos | 2 o 3 símbolos nuevos en el sprite (~200 bytes) |
| Superficies | ninguna nueva: elevada, la que ya existe |
| Tokens | ninguno nuevo |
| PageSpeed | sin impacto medible |

Accesibilidad: lista real (`<ul>`), la unidad es texto y no sólo color, CTA de
44px, contraste AA sobre pasto (a verificar midiendo el pixel, como siempre),
reveal respetando `prefers-reduced-motion`.

## 8. Qué descarté y por qué

- **Grilla de tarjetas** (lo que decía el contexto): con 5 ítems deja huérfana,
  y suma una cuarta grilla de tarjetas a un sitio que ya tiene tres.
- **Carrusel de materiales**: ya hay uno en Parquización. Dos carruseles en una
  landing es un tic, no una decisión.
- **Tabla con precios**: no hay precios confirmados, y una tabla vacía es peor
  que no tener la sección.
- **Acordeón**: esconde justo lo que hay que mostrar, y con 3 ítems es
  ceremonia al pedo.
- **Título en `--title-lg`**: le daría a una línea secundaria el mismo peso que
  a Deportes.

## 9. Lo que me falta para cerrarla

1. **La lista real de materiales.** Sebas ya adelantó arena y sintético. ¿Qué
   más? El layout aguanta de 3 a 12, pero el número cambia si va a una o dos
   columnas.
2. **La unidad de venta de cada uno.** Es el elemento que sostiene todo el
   concepto. Si resulta que todo va "a consultar" sin unidad, hay que repensar
   la pastilla.
3. **Una línea de especificación por material.** No hace falta que sea técnica
   ni exacta, pero algo tiene que decir. Si no hay nada, las filas quedan
   flacas y conviene otro layout.
4. **¿El CTA de insumos va al mismo WhatsApp que el resto?** Si Marcelo quiere
   separar las consultas de material de las de obra, `CONFIG.ruteo` en
   `main.js` ya está preparado para derivarlo a otro número.

Nada de esto bloquea empezar a maquetar: el layout no depende de la lista final.
Sí bloquea publicarla.
