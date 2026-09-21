# Bloque 6 — Insumos y materiales · Propuesta de diseño

Estado: **propuesta, sin implementar.** No se tocó `index.html`, `styles.css` ni
`main.js`. Esto se discute y recién después se escribe.

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
| Panel | una columna | una columna | foto + lista, o lista sola |
| Filas | apiladas, unidad debajo del nombre | apiladas | 1 o 2 columnas según cantidad |
| CTA | ancho completo | ancho completo | al ras izquierdo |

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
