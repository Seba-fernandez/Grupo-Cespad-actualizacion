# Auditoría de Identidad Visual 4C - Grupo CESPAD vs Atlantis Sport

Fecha: 2026-09-17
Nuestro sitio: rama `bloque-4b-visuales`, commit `5b2ba33` (glass 4B.1 aplicado)
Competidor analizado: https://atlantissport.com.ar/
Complementa a: AUDITORIA_4B1.md, AUDITORIA_VISUAL_4B1.md, AUDITORIA_DISENO_4B1.md
Modo: análisis y planificación. No se tocó código en este documento.

---

## 0. La conclusión incómoda, primero

Tenías razón en la corazonada, pero el diagnóstico es peor de lo que pensabas: **en un test a ciegas, nuestro sitio se lee como "hecho con IA" más que el de ellos.**

La guía de diseño que usé para esta auditoría lista los clusters visuales donde se amontona el diseño generado por IA. Nuestro sitio cae en tres al mismo tiempo:

1. "Near-black con un único acento verde ácido" - somos `#0a0a0a` + `#c8f135`, literal.
2. "`rounded-lg` en todo" - tenemos un radio en cards, botones, formulario, panel, swatches, imágenes.
3. "Todo centrado" - hero, headers de sección, comparativa, proceso, contacto, y hasta el texto de Nosotros (que está centrado adentro de una columna de dos, que es directamente un error de oficio).

Atlantis está construido con herramientas muy parecidas a las nuestras (te lo confirmo abajo con evidencia técnica), pero escapó de dos de esos tres clusters: alineó todo a la izquierda y usó radio cero. Y eligió un verde que pertenece al pasto en vez de un verde que pertenece a una lata de bebida energizante.

Dicho de otra forma: ellos no tienen mejor gusto que nosotros, tienen **menos decoración y más contenido real**. Eso es lo que hay que atacar.

---

## 1. Qué es Atlantis por dentro (confirmando tu sospecha)

Evidencia técnica que saqué del sitio en vivo:

| Señal | Hallazgo |
|---|---|
| Build | Vite con assets hasheados (`index-CLi_2K5N.js`, un solo bundle + un solo CSS) |
| CSS | Utility-classes tipo Tailwind, con colores en `oklab()` (firma de Tailwind v4) |
| Tipografías | Anton (display) + Archivo (body), self-hosted en el bundle, no vía Google Fonts |
| Glass | `backdrop-filter: blur(8px)`, 12 usos. Existe pero es discreto |
| Radios | Prácticamente todo en 0px. El único radio es el pill de los botones |
| Sombras | Muy pocas, y raras: una `0 -12px 40px -12px` (sombra hacia arriba, para separar bandas) |
| Analytics | Google Tag Manager |

Sí, se nota la mano de una IA moderna en las decisiones: Tailwind v4 con oklab, un único H1, 5 `<section>`, jerarquía impecable de headings, alt texts prolijos. Pero la usaron bien: hay disciplina, no hay relleno.

---

## 2. Qué hacen mejor que nosotros (sin excusas)

**2.1. El H1 es un argumento, no un nombre.**
Ellos: *"Césped sintético hecho por la fábrica que lo instala"*. Ocho palabras que contienen la única razón por la que les comprarías en vez de a otro.
Nosotros: *"GRUPO CESPAD"* en 10rem, con un kicker que describe la categoría. A un desconocido nuestro nombre no le dice absolutamente nada. Estamos gastando el elemento más grande de la página en información que no le sirve a nadie que no nos conozca ya.

**2.2. La prueba está arriba de todo.**
Ellos ponen tres números en el hero: `1ª fábrica del país`, `+30 años fabricando`, `+80 años del grupo`. Están resueltos antes de que scrollees.
Nosotros tenemos la sección de Stats oculta y la de Proyectos oculta. Un visitante puede recorrer nuestra web entera sin ver una sola prueba de que alguna vez instalamos algo.

**2.3. Obras con nombre y apellido.**
Tienen 13 obras listadas con cliente y ubicación: Canchas Etcheverry, Club Sarmiento, Mapuche Country Club, Universidad Nacional de San Martín, Oficinas ICBC, SKF Argentina, GEPU, Polideportivo municipal, Puesta del Sol.
Y acá está la lección más importante de toda la auditoría: **sus fotos son mediocres**. Están lavadas, con encuadres inconsistentes, algunas parecen sacadas con celular. No importa. Lo que vende es la procedencia: un nombre propio y una ciudad debajo de cada foto. La foto perfecta sin nombre vale menos que la foto regular con "Club Sarmiento - San Luis" abajo.

**2.4. El calificador está en el hero, no en el sótano.**
Ellos abren con una tarjeta clara arriba a la derecha: *"Contanos qué necesitás - 5 preguntas cortas. Después seguís por WhatsApp con todo ya cargado."* Primera pregunta con 7 botones grandes.
Nosotros tenemos 7 campos al final de una página de 8,8 pantallas de alto. Vos mismo lo dijiste: "tengo alto formulario". Es peor que largo, está enterrado.

**2.5. Lista con reglas en vez de grilla de cards.**
Su sección de deportes es una lista: número, ícono de línea, nombre grande, descripción al costado, flecha. Filas separadas por hairlines, cero radio, cero glass. Se lee editorial y seguro. Nosotros metemos todo adentro de cards con radio y sombra, que aplana la jerarquía porque todo pesa lo mismo.

**2.6. El verde es un piso, no una salpicada.**
Tienen una banda full-bleed de verde con tipografía negra encima. Se animan a usar el color como superficie. Nosotros usamos el lima solamente como acento disperso, lo cual lo vuelve decorativo en vez de estructural.

---

## 3. Qué hacen peor (no copiemos sus errores)

**3.1. Numeración decorativa.** Ponen `01 / 02 / 03 / 04` en los deportes y en "por qué nosotros". Los deportes no son una secuencia: no hay un orden en el que pádel venga antes que hockey. La numeración debería codificar algo verdadero (un proceso, una cronología). Ahí es puro adorno, y es el tell más "generado" que tienen. **Ojo: nosotros tenemos el mismo problema en Proceso, pero ahí sí es legítimo** porque consulta → diseño → instalación → entrega es una secuencia real.

**3.2. Las fotos son flojas.** Ya lo dije como fortaleza (la procedencia le gana a la producción), pero es su flanco débil. Si conseguís fotos decentes con dron y buena luz, les pasás por arriba en esta dimensión sin esfuerzo.

**3.3. El logo es débil.** Es un raster de baja resolución, con un garabato verde y un `®` pegado. Si conseguís una marca bien dibujada, ganás esa comparación de entrada. Seguí buscando por ese lado, vale la pena.

**3.4. En mobile no hay CTA arriba del fold.** Su hero mobile termina en los stats y la tarjeta de presupuesto arranca abajo. Nosotros sí tenemos "Pedí tu presupuesto" visible sin scrollear en 375px (verificado). Eso lo tenemos ganado, no lo perdamos en el rediseño.

**3.5. Anton 84px mayúscula es lo que hace todo el mundo.** Es una decisión segura, no original. Acá hay una oportunidad grande que desarrollo en el punto 5.

---

## 4. Lo nuestro que hay que proteger

Antes de proponer cambios, esto NO se toca porque es donde ya somos mejores:

- **El hero de 5 paneles de deportes.** Es lo más original que tenemos y nadie en el rubro lo hace. Atlantis tiene una foto oscurecida y ya. Este es nuestro activo visual número uno.
- **El deep-link del hero a Deportes.** Clic en el ícono del deporte → se abre el tab correcto + scroll. Medido: 42ms para activar el tab, 2 clics totales hasta WhatsApp.
- **Los swatches de color de césped.** Elegís verde/azul/terracota y la foto cambia. Eso es un configurador de producto en miniatura. Atlantis no tiene nada parecido, y es un diferencial real, no cosmético.
- **La accesibilidad.** Tabs con ARIA completo, navegación por teclado, targets de 44px, contraste AA verificado por muestreo de píxeles (6,6:1 a 12,3:1). Ellos no lo hacen mejor.
- **El copy de Comparativa.** Es el texto con más voz de oficio de todo el sitio. Sirve de referencia de tono para reescribir el resto.

---

## 5. La propuesta de identidad: "la cancha es el sistema de diseño"

La idea central: **todo el lenguaje visual sale de cómo se ve una cancha terminada de verdad.** Líneas blancas sobre superficie de color. Nadie en el rubro construyó un sistema de diseño desde ahí (Atlantis lo roza con un diagrama de cancha de fondo en una banda, pero no lo desarrolla).

### 5.1. Color: la paleta ya la tenemos en el catálogo

Hoy la paleta es negro + lima ácido. Propuesta: **la paleta son los colores de superficie que vendemos.** Verde, azul, terracota, rojo, negro. Están literalmente en los swatches de Deportes.

Eso nos da algo que ningún competidor puede copiar sin copiar nuestra lógica de producto, y de paso nos saca del cluster "near-black + acid green pop".

Movimientos concretos:

- **Degradar el lima a color de interacción únicamente.** Hoy el `#c8f135` está en eyebrows, labels de specs, números de proceso, íconos, bullets, badges, links, bordes. Está en todos lados, y por eso se lee como "el acento de IA". La regla de diseño es gastar la audacia en un solo lugar: que el lima signifique **"esto se puede tocar"** y nada más. Botones, estados activos, foco. Nunca decoración.
- **Sesgar los grises.** Hoy son `#141414`, `#1e1e1e`, `#2a2a2a`: grises puros, que se leen como no elegidos. Sesgarlos hacia verde-negro (ya tenemos `#0d130c` en `bg-pasto`, hay que extender ese criterio). Atlantis hace esto con su `#1F221F`.
- **Sumar terracota y azul como colores de sección**, no solo como swatches. La sección de tenis puede respirar terracota, la de pádel azul. Eso rompe la monotonía del negro-sobre-negro sin inventar nada: son los colores de nuestro propio producto.

### 5.2. Tipografía: salir del carril condensado-mayúscula

Hoy: Bebas Neue + DM Sans. Ellos: Anton + Archivo. **Es la misma fórmula.** Display condensado en mayúscula + grotesca neutra. Bebas es además la fuente hipster de 2012-2016, más liviana y más vista que Anton. O sea que hoy parecemos una versión más débil de ellos.

No sirve buscar "una condensada mejor" (Oswald, Barlow Condensed, etc.): ese carril ya lo ocupan ellos localmente. Hay que cambiar de eje.

**Dirección recomendada: grotesca pesada ANCHA, en caja baja.**

Dos apuestas juntas, y las dos son baratas de ejecutar:

1. **Ancha en vez de condensada.** Invierte el eje exacto contra Anton y Bebas. Lee industrial, de ingeniería, de ficha técnica. Candidatas en Google Fonts: Chivo (pesos altos), Familjen Grotesk, Instrument Sans, Geist.
2. **Caja baja en vez de mayúscula.** En esta categoría el 100% de los competidores grita en mayúscula condensada. Un titular en caja baja, bien tracked, se lee más caro y más seguro, y es instantáneamente distinguible. Es el movimiento de mayor retorno por menor costo de todo este documento.

**Tercera voz: una monoespaciada para lo técnico.** Los mm, los gr/m², las medidas ITF/FIFA, los números de obra. Candidatas: JetBrains Mono, Geist Mono, IBM Plex Mono. Esto convierte nuestras tablas de specs (que hoy son cards genéricas) en una firma visual, y refuerza la idea de "estos tipos saben de material, no solo de vender".

Aclaración honesta: la elección final de tipografía hay que verla montada, no decidirla en un documento. Esto es dirección + candidatas, no veredicto.

### 5.3. Forma: geometría de cancha en vez de card redondeada

Hoy todo tiene radio. Ellos tienen radio cero. El punto medio que nos pertenece:

- **El radio se gana, no se reparte.** Que el radio signifique "esto es presionable": botones, pills, swatches. Los paneles estructurales van rectos.
- **Divisores = líneas de cancha.** Hairlines blancas de baja opacidad, no bordes genéricos de card.
- **Marcas de esquina en vez de cajas completas.** En vez de encerrar un bloque en un rectángulo redondeado con borde, marcar solo las esquinas, como el área de servicio de una cancha. Es más liviano visualmente y es nuestro.

### 5.4. Glass: qué le falta para leerse como cristal de verdad

Lo que hicimos en 4B.1 (sheen diagonal + highlight superior) va en la dirección correcta. Lo que falta para que se lea iOS y no "plástico esmerilado":

1. **El glass necesita algo que valga la pena desenfocar detrás.** Esta es la más importante y no es CSS, es layout. Sobre negro plano, el `backdrop-filter` es costo de GPU invisible. Hoy `.por-que-item` está sobre `bg-pasto` (bien, hay textura) pero `.deportes-panel` está mayormente sobre negro (ahí el blur casi no hace nada). Regla: glass solo sobre foto o textura.
2. **Falta el canto inferior oscuro.** El vidrio real tiene espesor: un `inset` claro arriba (ya lo tenemos) y uno oscuro abajo (nos falta). Con los dos, la pieza deja de ser una capa y pasa a ser un objeto.
3. **`saturate()` es lo que da la sensación de cristal.** El blur solo da niebla. Estamos en 1.5-1.6, que está bien. Ese es el parámetro que hace la diferencia entre "vidrio" y "vidrio esmerilado de baño".
4. **Reglas de rendimiento, para que no se pague caro:** el costo escala con área × radio de blur. Glass en piezas chicas (tabs, cards), nunca en bandas full-width. Nunca animar el blur. Techo de ~20px. Con eso no movemos la aguja de PageSpeed.

### 5.5. Movimiento

Menos es más acá. Una secuencia orquestada al cargar el hero vale más que efectos sueltos repartidos. Y ya tenemos identificado el pulso infinito del botón Contacto como candidato a acotarse (está en el roadmap de la auditoría visual).

---

## 6. La regla de los 20 segundos: hay que reordenar la página

Hoy nuestra página mide 8,8 pantallas de alto y un visitante puede recorrerla entera sin ver una prueba de que existimos como empresa. Así se reparten los 20 segundos:

| Tiempo | Qué tiene que pasar | Estado hoy |
|---|---|---|
| 0-5s | Qué hacemos, dónde, y por qué nosotros | Falla: el H1 es nuestro nombre |
| 5-12s | Prueba de que lo hicimos antes | Falla: no existe en la página |
| 12-20s | Cómo pido presupuesto sin esfuerzo | Falla: formulario de 7 campos al final |

**Reordenamiento propuesto:**

1. Hero (se mantiene el selector de 5 paneles, cambia el H1 por un argumento).
2. **Franja de prueba, nueva y arriba:** 3 números reales + 3 fotos de obra con nombre de cliente y ciudad. Esto es lo que hoy está oculto en Stats y Proyectos, subido al lugar donde sirve.
3. Deportes (con los datos técnicos reales que ya te pasó tu papá).
4. El resto como está.

Y **un calificador de una sola pregunta cerca del hero**: "¿Para qué lo necesitás?" con los botones de deporte/jardín, que dispare WhatsApp con el contexto ya cargado.

Acá hay un ángulo competitivo concreto: **ellos te hacen contestar 5 preguntas, nosotros te llevamos a WhatsApp en 1 toque.** "Menos preguntas que el otro" es una ventaja real y medible, no una frase de marketing. El formulario largo de 7 campos no se borra: baja a ser el camino opcional de "presupuesto detallado" para quien lo quiera.

---

## 7. Cosas sin propósito que hay que sacar

Auditoría de relleno, sección por sección:

- **El marquee** (51px). Lista los mismos 5 deportes que el hero acaba de listar y que la sección Deportes va a listar de nuevo. Es la tercera repetición de la misma lista. No aporta nada.
- **Bandas vacías en Proceso y Comparativa.** En Proceso el contenido ocupa unos 200px de una sección de 584px: hay dos franjas negras grandes arriba y abajo sin nada. Lo mismo abajo de Comparativa. Es espacio que no está descansando, está sobrando.
- **Eyebrows en 7 de 9 secciones.** Ya estaba marcado en la primera auditoría. Con el reordenamiento conviene dejarlos en 2 o 3 como máximo.
- **Texto centrado dentro de columnas.** El párrafo de Nosotros está centrado adentro de su columna en un layout de dos columnas. Eso es un error de oficio, no una decisión. A la izquierda.
- **Radio y sombra repartidos parejo.** Cuando todo tiene el mismo radio y la misma sombra, nada destaca. Hay que gastarlos donde signifiquen algo.

---

## 8. Bloques que faltan, con criterio de diseño

- **Proyectos / Obras (crítico).** Ya está diseñado en AUDITORIA_DISENO_4B1.md: grilla de proporción fija con filtro simple, evolucionando a obra destacada + grilla. Lo que agrega esta auditoría después de ver a Atlantis: **cada foto lleva nombre de cliente y ciudad debajo, sí o sí.** Sin eso la foto no vende. Si no hay permiso para nombrar un cliente, va el tipo de obra y la ciudad ("Complejo de pádel - Villa Allende").
- **Parquización.** Rediseño ya propuesto en 4B1: intro ancha + franja de 3 fotos residenciales con micro-descripción.
- **Bloque 6, insumos y materiales.** Brief ya documentado en CONTEXTO_CLAUDE.md y en AUDITORIA_DISENO_4B1.md sección 4.
- **Bloque 3, carrusel de Parquización.** Pendiente de antes.

---

## 9. Qué necesito de tu viejo (y qué ya podés destrabar)

Dijiste que ya tenés la data para los placeholders. Con eso se destraban de una: specs técnicas de los 5 deportes, copy de Parquización, y los datos de Stats.

Lo que conviene pedirle además, ahora que sabemos contra qué competimos:

1. **Lista de obras con nombre y ciudad.** Aunque sean 5. Es lo que más nos falta y lo que ellos usan mejor.
2. **Los tres números del hero.** Años de trayectoria, canchas instaladas, y algún tercero que sea nuestro (¿provincias donde trabajamos? ¿m² instalados?). Ellos tienen "1ª fábrica del país / +30 años / +80 años del grupo". Necesitamos nuestra versión verdadera, sin inflar.
3. **La respuesta a: ¿por qué nos elegirían a nosotros y no a Atlantis?** Literal, como lo diría él por teléfono. Esa frase es el H1 nuevo. No la puedo inventar yo.
4. **Plazos reales de obra** por tipo de proyecto.

---

## 10. Orden sugerido de ejecución

No todo junto. Propuesta de secuencia, de mayor a menor retorno:

**Primero (contenido, sin tocar diseño):** rellenar todos los placeholders con la data que ya tenés, corregir el número de WhatsApp, y montar Proyectos con las fotos y nombres que consigas. Esto solo ya nos pone a competir, porque hoy el problema más grave no es estético.

**Segundo (estructura):** reordenar para la regla de los 20 segundos, subir la prueba, sumar el calificador de una pregunta, sacar el marquee y las bandas vacías.

**Tercero (identidad):** tipografía nueva, degradar el lima a color de interacción, sesgar los grises, geometría de cancha, glass solo sobre textura.

El orden importa: cambiar la tipografía sobre una página que todavía dice "[Ej: Acero 3mm]" es pintar una pared que se está por demoler.

---

## 11. Una cosa más, sobre el logo

Estás buscando logo, seguí. Dos criterios que salen de esta comparación:

- El de ellos es débil (raster de baja resolución, garabato, `®` pegado). Es una pelea que podés ganar barato.
- Si la identidad va por "la cancha es el sistema", la marca debería poder convivir con geometría de líneas de cancha. Un monograma o una marca que funcione en un solo color, chica, sobre foto. Evitá el degradé y el 3D: no sobreviven al favicon ni al sello en una foto de obra.
