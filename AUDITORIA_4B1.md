# Auditoría 4B.1 - Grupo CESPAD

Fecha: 2026-08-24
Deploy auditado: https://grupo-cespad-actualizacion.vercel.app/
Commit: 40da51bd77ce819a034c196e3d90ec3360a74f8d

## 1. Los tres recorridos

### 1.A Perfil A - Dueño de complejo deportivo

- Segundos 0-15: Entro y veo el hero dividido en 5 paneles aéreos, uno por deporte. Se ve prolijo, con buena fotografía de drone y tipografía grande. "Del club profesional, al patio de tu casa" me dice que trabajan con clubes, que es justo lo que busco. Primera impresión: parece una empresa seria, no un changarín.
- Segundos 15-30: Bajo a Nosotros. La foto no es del equipo trabajando, son paletas y pelotas de pádel tiradas sobre el pasto, una imagen más de stock que de obra real. Sigo a Deportes y toco la pestaña de Tenis porque es lo que me interesa reemplazar. Ahí me encuentro con "[DESCRIPCIÓN CORTA TENIS: 1 línea, ej: 'Superficies de césped sintético o polvo de ladrillo...']" y specs que dicen literalmente "[Ej: Césped 15mm]", "[Ej: ITF regulación]". Esto está en producción, no es un mockup. En este momento ya dudo si esta empresa realmente está operativa o si el sitio está a medio hacer.
- Segundos 30-60: Busco obras terminadas de tamaño similar a lo que necesito y no encuentro ninguna sección de proyectos visible. Tampoco hay número de canchas instaladas ni años de trayectoria. El formulario de contacto está bien armado pero no tengo ningún motivo adicional para confiar en que esta empresa va a sostener una obra de $30-100M ARS. Cierro la pestaña antes de completar el formulario.
- Veredicto: No convertí. Los textos placeholder visibles en la sección que más me interesaba (specs técnicas) y la ausencia total de obra terminada o números de trayectoria son suficiente motivo para no confiar mi presupuesto más grande a esta empresa.
- Screenshots tomados: d_01_hero.png, d_04_deportes_tenis.png, d_02_nosotros.png

### 1.B Perfil B - Familia con jardín / quincho

- Segundos 0-15: El hero me muestra cinco deportes de club (fútbol, pádel, tenis, rugby, hockey), todo con fotografía aérea de cancha profesional. Se ve lindo pero mi primera sensación es "esto es para clubes grandes, no sé si es para mi patio". El subtítulo dice "al patio de tu casa" así que sigo mirando con algo de esperanza.
- Segundos 15-30: Scrolleo por Nosotros (foto de paletas de pádel, no me dice nada) y por Deportes, que no me interesa directamente. Cuando llego a Parquización, que es la sección pensada para mí, la foto es una terraza con muebles verde neón que parece un bar o rooftop de hotel, no un jardín de casa de familia. El texto debajo dice literalmente "[PLACEHOLDER: 2 o 3 líneas vendiendo confort...]" y los tres bullets también están entre corchetes. Me siento invisible: la única sección pensada para mi perfil está sin terminar.
- Segundos 30-60: El botón "Quiero mi presupuesto de parquización" existe y es claro, y el formulario tiene una opción de "Casa particular" que me hace sentir contemplada en la estructura. Pero entre la foto que no se parece a mi casa y el texto placeholder, no tengo la sensación de que me vayan a entender como clienta chica. Lo pienso, no cierro la pestaña de una, pero tampoco escribo todavía.
- Veredicto: Casi. La estructura del sitio me da un lugar (categoría de proyecto, sección dedicada), pero la foto corporativa y el copy sin terminar en la única sección para mí me hacen dudar antes de escribir.
- Screenshots tomados: m_01_hero.png, d_05_parquizacion.png, d_02_nosotros.png

### 1.C Perfil C - Arquitecta o paisajista

- Segundos 0-15: El sitio se ve prolijo visualmente, con buena dirección de arte en el hero. Como profesional que evalúa proveedores, esto suma puntos de entrada: parece una empresa con criterio de diseño, no un instalador improvisado.
- Segundos 15-30: Voy directo a Deportes porque necesito ficha técnica de materiales para poder incluir a CESPAD en un proyecto mío. Toco cada pestaña buscando datos de estructura, espesor de césped, densidad, backing. Encuentro en cada una: "[Ej: Acero 3mm]", "[Ej: Templados TÜV 12mm]", "[Ej: 12mm · 1500 gr/m²]". Es decir, no hay ni un solo dato técnico real en toda la sección. Para mi uso profesional esto es inutilizable: no puedo especificar un material a un cliente con un corchete.
- Segundos 30-60: Busco un portfolio de proyectos terminados para evaluar calidad de terminación y no hay ninguna sección visible con fotos de obra. Tampoco encuentro mención de programa profesional, descuento por volumen o canal diferenciado para arquitectos. No tengo ningún dato concreto para justificar sumar a CESPAD a mi lista de proveedores frente a otro que sí muestre ficha técnica y portfolio.
- Veredicto: No convertí. Sin ficha técnica real ni portfolio de obra, no tengo con qué evaluar a CESPAD como proveedor profesional, más allá de que el sitio se vea bien.
- Screenshots tomados: d_03_deportes_padel.png, d_04_deportes_tenis.png, d_07_contacto.png

## 2. Hallazgos por impacto

### 2.A Bloqueadores críticos (max 3)

**1. Textos placeholder entre corchetes visibles en producción.** Qué es: toda la sección Deportes (descripción corta y specs técnicas de los 5 deportes) y toda la sección Parquización (descripción y 3 bullets) muestran literalmente texto tipo "[Ej: Acero 3mm]" en el sitio en vivo, no en un borrador. Afecta a: los tres perfiles, con mayor peso en A y C. Por qué bloquea: en el momento exacto en que el visitante busca información técnica o emocional para decidir, encuentra un sitio que parece a medio terminar, lo que rompe la confianza de forma inmediata e irrecuperable en esa misma visita.

**2. Discrepancia en el número de WhatsApp.** Qué es: el número que figura como contacto real del negocio en este brief es +54 9 351 378-5192 (Córdoba), pero el número programado en el sitio (CONFIG.whatsapp en main.js y el campo telephone del JSON-LD) es +54 9 11 3149-6374 (Buenos Aires). No encontré el número de Córdoba en ningún archivo del proyecto. Afecta a: los tres perfiles por igual. Por qué bloquea: el objetivo comercial declarado del sitio ES el clic a WhatsApp. Si el número programado no es el correcto o no es el que Marcelo monitorea activamente, cada lead generado se pierde sin que nadie lo note hasta que ya sea tarde.

**3. Ausencia total de prueba social y obra terminada de escala.** Qué es: las secciones Proyectos, Testimonios y Stats (canchas instaladas, años de trayectoria, % de satisfacción) están las tres ocultas (`hidden`) en el HTML. Afecta a: principalmente al Perfil A, también a C. Por qué bloquea: el propio criterio de decisión del Perfil A es explícito, si en 60 segundos no ve una obra grande terminada, cierra la pestaña. Hoy no hay ninguna foto de obra grande, ningún número de trayectoria y ningún testimonio en todo el sitio.

### 2.B Fricciones importantes (5-8)

- **Foto de Nosotros no muestra al equipo.** La imagen son paletas y pelotas de pádel sobre el pasto, no personas trabajando, pese a que el alt text dice "Equipo de Grupo CESPAD trabajando en obra". No comunica humano-cercano-profesional. Afecta a: B. Duele: medio-alto.
- **Foto de Parquización con estética comercial, no residencial.** Es una terraza tipo bar/rooftop con muebles verde neón, no un jardín o quincho de casa de familia. Es justo la sección que debería hacer sentir identificado al Perfil B y hace el efecto contrario. Afecta a: B. Duele: alto.
- **Vocabulario "césped sintético" en vez de "pasto sintético".** El H1, la meta description, el JSON-LD y la sección de Parquización usan el término técnico "césped sintético", cuando el término que un cliente argentino tipea en Google es "pasto sintético". Afecta a: todos los perfiles en fase de búsqueda (SEO y primera lectura). Duele: medio.
- **Eyebrows repetidos en casi todas las secciones.** El label chico en mayúscula ("Nuestra historia", "Cada deporte, su cancha", "También en tu casa", "Nuestro diferencial", "La diferencia se nota", "Como trabajamos", "Hablemos") aparece en 7 de las 9 secciones visibles con contenido. Genera monotonía de plantilla y rompe la regla de máximo 1 cada 3 secciones. Afecta a: todos, vía percepción de calidad de diseño. Duele: medio.
- **Sin plazo de obra visible en ningún lado.** Ni en Proceso ni en Por qué elegirnos se menciona un plazo aproximado de instalación. El Perfil A lo busca explícitamente como criterio de decisión. Afecta a: A. Duele: alto.
- **Sin gancho dedicado a arquitectos/paisajistas.** No hay mención de programa profesional, descuento por volumen ni canal diferenciado para el Perfil C en ningún punto del sitio. Afecta a: C. Duele: alto.
- **Cuatro fórmulas distintas para el mismo intent de "consultar/presupuesto".** "Pedí tu presupuesto", "Consultar por cancha de X" (5 variantes), "Quiero mi presupuesto de parquización", "Enviar consulta por WhatsApp". Están bien contextualizadas pero generan ruido de sistema. Afecta a: todos, impacto bajo en conversión real. Duele: bajo-medio.
- **Formulario de contacto largo (7 campos, 4 obligatorios) antes de llegar al envío.** Tiene sentido para un ticket alto y decisión meditada, pero puede generar más fricción de la necesaria en el momento más emocional del Perfil B. Afecta a: B. Duele: bajo-medio.

### 2.C Detalles de acabado (abierto)

- Typo sin tilde: "Materiales con presencia en mas de 10 países" (falta el acento en "más"), en la tarjeta flotante de Nosotros.
- El claim "+10 países" no tiene fuente ni contexto visible: no queda claro si se refiere al origen del material o a dónde instaló CESPAD.
- La foto aérea de pádel en el hero se ve notablemente más oscura y con menos contraste que las otras 4 fotos del selector (tenis, fútbol, rugby, hockey).
- Los botones "Consultar por cancha de X" tienen en el HTML crudo `href="#contacto" target="_blank"`. El JS los reescribe a un link de WhatsApp al cargar la página, pero si JavaScript falla o está desactivado, abren una pestaña nueva que sólo hace scroll a #contacto, un comportamiento confuso.
- La sección "Comparativa" (cancha estándar vs cancha CESPAD) no estaba en la lista de secciones a auditar del brief pero existe, funciona bien y su copy es uno de los más creíbles de todo el sitio.
- Hex codes sueltos fuera de `:root` en styles.css (`#0a0a0a` repetido unas 8 veces, `#fff`, `#25d366`), en vez de usar las variables de tokens ya definidas. No genera ningún problema visual hoy, es una nota de mantenimiento a futuro.
- El paso "Instalación" de Proceso no menciona plazo concreto, sólo dice "nuestro equipo ejecuta la obra con supervisión constante".

## 3. Recomendaciones por sección de la web

### Header
- Diagnóstico: logo + nav de 4 links + CTA "Contacto" en verde. En desktop es una sola línea de 80px de alto, en mobile colapsa a hamburguesa.
- Problema(s) identificado(s): ninguno grave. Cumple la regla de anti-slop de nav en 1 línea con altura máxima.
- Recomendación concreta: sin cambios necesarios en esta pasada.
- Prioridad: 1
- Complejidad: baja
- Afecta a perfil(es): todos (neutral, no es un problema)

### Hero
- Diagnóstico: selector de 5 paneles con foto aérea por deporte, headline "Grupo CESPAD" con kicker de keyword+geo, subtítulo de 14 palabras y CTA "Pedí tu presupuesto" visible sin scroll en desktop y mobile.
- Problema(s) identificado(s): la foto de pádel se ve más oscura que el resto (Eje 3, art direction). Fuera de eso, cumple todas las reglas de anti-slop del Eje 1 (headline en 1 línea, subtítulo bajo 20 palabras, CTA visible sin scroll).
- Recomendación concreta: revisar exposición/brillo del recorte de la foto de pádel para emparejarla visualmente con las otras 4.
- Prioridad: 2
- Complejidad: baja
- Afecta a perfil(es): todos

### Stats
- Diagnóstico: sección oculta (`hidden`) con contador animado para canchas instaladas, años de trayectoria y % de clientes satisfechos, con números de ejemplo (15, 5, 98%) que no son datos reales.
- Problema(s) identificado(s): es exactamente el tipo de prueba social que el Perfil A busca en los primeros 15-30 segundos, y hoy no existe en el sitio (Eje 3 y bloqueador crítico 2.A.3).
- Recomendación concreta: activar esta sección únicamente cuando Marcelo confirme números reales. No sacar el `hidden` con los valores de ejemplo actuales bajo ninguna circunstancia.
- Prioridad: 5
- Complejidad: baja (una vez que estén los datos reales)
- Afecta a perfil(es): A, C

### Nosotros
- Diagnóstico: bloque de texto (historia + misión) a la izquierda, foto con tarjeta flotante a la derecha en desktop.
- Problema(s) identificado(s): la foto son paletas y pelotas de pádel sobre pasto, no el equipo trabajando, contradiciendo su propio alt text (Eje 3, art direction). El claim "+10 países" no tiene fuente (Eje 6). Typo sin tilde en "mas".
- Recomendación concreta: reemplazar la foto por una que muestre al equipo real en obra. Corregir el typo. Revisar o sacar el claim de los 10 países hasta poder verificarlo con Marcelo.
- Prioridad: 4
- Complejidad: media (depende de disponibilidad de fotos reales)
- Afecta a perfil(es): B, A

### Deportes
- Diagnóstico: panel con tabs por deporte (glass en desktop y mobile) y card de detalle con foto, selector de color de pasto, specs técnicas y botón de consulta específico por deporte.
- Problema(s) identificado(s): descripciones cortas y specs técnicas en placeholder de corchetes, visibles en producción, en los 5 deportes (bloqueador crítico 2.A.1). La interacción de tabs y swatches en sí funciona bien y es accesible.
- Recomendación concreta: completar con Marcelo los datos técnicos reales de cada deporte (estructura, vidrios/césped, medidas, iluminación) antes de cualquier otro cambio en esta sección. Es el cambio de mayor impacto de todo el sitio.
- Prioridad: 5
- Complejidad: baja (es contenido, no código)
- Afecta a perfil(es): A, C, todos

### Parquización
- Diagnóstico: banda simple con foto grande a la izquierda, texto + 3 bullets + CTA a la derecha en desktop.
- Problema(s) identificado(s): foto de estética comercial/hospitality en vez de jardín residencial (Eje 3). Descripción y los 3 bullets en placeholder de corchetes (bloqueador crítico 2.A.1). Es la única sección pensada para el Perfil B y hoy no cumple ninguna de las dos cosas que necesita.
- Recomendación concreta: reemplazar la foto por una imagen de jardín/quincho de casa particular. Completar el copy real con Marcelo, enfocado en el vocabulario emocional que describe el brief (verde todo el año, sin barro, apto chicos y mascotas).
- Prioridad: 5
- Complejidad: media
- Afecta a perfil(es): B

### Por qué elegirnos
- Diagnóstico: grid de 4 tarjetas glass sobre fondo de textura de pasto (durabilidad, instalación especializada, drenaje, presupuesto sin cargo).
- Problema(s) identificado(s): "Materiales premium probados..." usa el adjetivo cliché "premium" (Eje 6). Respeta bien las convenciones de categoría local (presupuesto sin cargo, garantía por escrito).
- Recomendación concreta: reescribir la descripción de "Alta Durabilidad" sacando "premium" y agregando un dato o caso más concreto si existe.
- Prioridad: 3
- Complejidad: baja
- Afecta a perfil(es): todos

### Proceso
- Diagnóstico: 4 pasos numerados (consulta, diseño, instalación, entrega) con línea conectora, sin fotos.
- Problema(s) identificado(s): ningún paso menciona un plazo concreto de obra, que es un criterio de decisión explícito del Perfil A (Eje 4, convenciones de categoría).
- Recomendación concreta: sumar un plazo aproximado por tipo de proyecto (ej. "cancha de club: X a X semanas") una vez que Marcelo lo confirme.
- Prioridad: 4
- Complejidad: baja (contenido)
- Afecta a perfil(es): A

### Contacto
- Diagnóstico: bloque de información (teléfono, zona, visita sin cargo, tiempo de respuesta) a la izquierda, formulario de 7 campos que arma un mensaje estructurado de WhatsApp a la derecha.
- Problema(s) identificado(s): el número de teléfono visible es +54 9 11 3149-6374, que no coincide con el número real declarado en este brief (bloqueador crítico 2.A.2). El formulario es largo pero está bien pensado para pre-calificar leads de ticket alto.
- Recomendación concreta: confirmar con Marcelo el número correcto y corregirlo en `main.js` (CONFIG.whatsapp) y en el JSON-LD de `index.html`. No tocar la estructura del formulario.
- Prioridad: 5
- Complejidad: baja
- Afecta a perfil(es): todos

### Footer
- Diagnóstico: marca, copyright con año dinámico, link a Instagram.
- Problema(s) identificado(s): ninguno.
- Recomendación concreta: sin cambios.
- Prioridad: 1
- Complejidad: baja
- Afecta a perfil(es): ninguno en particular

### FAB WhatsApp
- Diagnóstico: botón flotante fijo abajo a la derecha, visible sin scroll en desktop y mobile, con buen tamaño de touch target.
- Problema(s) identificado(s): hereda el mismo número de teléfono incorrecto del bloqueador crítico 2.A.2.
- Recomendación concreta: se corrige automáticamente al arreglar CONFIG.whatsapp en main.js, ya que todos los `data-wa-link` toman el número de ahí.
- Prioridad: 5 (por la dependencia del bloqueador 2.A.2)
- Complejidad: baja
- Afecta a perfil(es): todos

### Comparativa (sección adicional, no listada en el brief pero presente en el sitio)
- Diagnóstico: dos columnas, "cancha estándar" vs "cancha CESPAD", con checklist de 6 puntos cada una.
- Problema(s) identificado(s): ninguno. Es el copy más creíble y con más vocabulario de oficio de todo el sitio.
- Recomendación concreta: usar el tono de esta sección como referencia al reescribir el resto del copy AI-slop detectado.
- Prioridad: 1
- Complejidad: baja
- Afecta a perfil(es): A

## 4. AI-slop copy flaggeado

| Sección | Frase actual | Diagnóstico | Reescritura sugerida |
|---|---|---|---|
| Title / meta / og | "Grupo CESPAD - Canchas Deportivas Premium" | Adjetivo-cliché "premium" repetido en 5 lugares del sitio | "Grupo CESPAD - Canchas de pasto sintético en Córdoba y Buenos Aires" |
| Nosotros (h2) | "Pasión por el detalle, obsesión por la calidad." | Frase genérica de agencia, sin referente concreto, ningún dueño de club la diría por teléfono | "Hacemos canchas para que aguanten, no para la foto del día de la entrega." |
| Nosotros (desc) | "...proyectos llave en mano que superan toda expectativa." | Frase sin referente claro, tipo "comprometidos con la excelencia" | "...proyectos llave en mano, con el mismo cuidado que le pondríamos a nuestra propia cancha." |
| Por qué elegirnos | "Materiales premium probados en clubes profesionales que soportan uso intensivo por más de 10 años." | Adjetivo-cliché "premium" | "El mismo material que usan los clubes, pensado para aguantar años de uso intensivo sin pelarse." |
| Nosotros (float card) | "Materiales con presencia en mas de 10 países" | Número fake-preciso sin fuente visible, además de typo sin tilde | Sacar el dato hasta confirmarlo con Marcelo, o reformular como "Trabajamos con el mismo césped que se usa en canchas profesionales de Europa y Sudamérica" si es verificable |
| Meta description | "...Del club profesional al patio de tu casa." (repetida igual en el H1) | No es AI-slop en sí, pero es una repetición literal entre meta y hero que desperdicia la oportunidad de sumar la keyword real "pasto sintético" en la meta | "Pasto sintético para canchas de fútbol, pádel, tenis, rugby y hockey. Instalación en Córdoba y Buenos Aires." |

## 5. Estrategia y diferenciación

- Key message actual (como se lee HOY): "Instalamos césped sintético para canchas deportivas de nivel profesional y también para el patio de tu casa, en Córdoba y Buenos Aires."
- Key message sugerido (para maximizar conversión en el nicho): "El instalador de canchas sintéticas de Córdoba en el que un dueño de complejo puede confiar su próxima obra grande." Justificación: es el ticket más alto del negocio ($30-100M ARS) y el sitio ya está estructurado alrededor de los 5 deportes; reforzar esa columna con prueba social real sirve también al Perfil C sin sacrificar demasiado al Perfil B, que ya tiene su propia sección de Parquización.
- Audiencia primaria sugerida: A (dueño de complejo deportivo). Justificación: es el proyecto de mayor valor económico y el sitio ya invierte la mayor parte de su estructura (hero, tabs de deportes, comparativa) en hablarle a este perfil; el problema hoy no es la estructura sino que le faltan los contenidos (specs reales, obra terminada, plazos) que ese mismo perfil necesita para confiar.
- Convención de la categoría que CESPAD podría romper para diferenciarse: mostrar un rango de precio orientativo por tipo de proyecto (ej. "desde $X según superficie"), en vez de la convención local de nunca mostrar precio y ocultar todo detrás de "presupuesto sin cargo". Riesgo asociado: puede filtrar clientes de ticket bajo antes de que escriban, lo cual puede ser bueno o malo según qué priorice Marcelo; es una decisión estrictamente comercial que hay que consultarle antes de implementar.

## 6. Roadmap de próximas 3 pasadas de código

### Pasada 1 - CRITICA (5-8 cambios máx)

1. `index.html` (sección Deportes): reemplazar las descripciones cortas y specs técnicas en placeholder de los 5 deportes por contenido real que confirme Marcelo (estructura, vidrios/césped, medidas, iluminación). Impacto esperado: destraba a A y C, es el cambio de mayor impacto de todo el sitio.
2. `index.html` (sección Parquización): reemplazar la descripción y los 3 bullets en placeholder por copy real. Impacto esperado: destraba a B.
3. `main.js` (CONFIG.whatsapp) + `index.html` (JSON-LD telephone): confirmar con Marcelo el número de WhatsApp correcto y unificarlo en ambos lugares. Impacto esperado: destraba a los tres perfiles, sin esto ningún lead llega a destino.
4. `index.html` (sección Proyectos): activar la sección sacando el `hidden` únicamente cuando haya al menos 3-4 fotos reales de obra subidas, priorizando 1-2 obras de escala club. Impacto esperado: destraba a A.
5. `index.html` (imagen de Nosotros): reemplazar `nosotrosfoto.webp` por una foto real del equipo trabajando en obra. Impacto esperado: destraba a B, suma confianza para A.
6. `index.html` (imagen de Parquización): reemplazar `parquizacion.webp` por una foto de jardín o quincho residencial, no de terraza comercial. Impacto esperado: destraba a B.

### Pasada 2 - IMPORTANTE (8-12 cambios)

1. `index.html`: cambiar "césped sintético" por "pasto sintético" en el kicker del H1, la meta description, el title tag y el JSON-LD.
2. `index.html` / `styles.css`: reducir los "section-eyebrow" a 2-3 secciones clave (ej. Deportes y Contacto) y sacarlos del resto.
3. `index.html`: reescribir el title/meta/og sacando "premium" (ver tabla del punto 4).
4. `index.html`: reescribir el h2 de Nosotros "Pasión por el detalle, obsesión por la calidad."
5. `index.html`: reescribir la descripción de "Alta Durabilidad" en Por qué elegirnos, sacando "premium".
6. `index.html`: corregir el typo de "mas" y revisar con Marcelo la fuente del claim "+10 países" en la tarjeta flotante de Nosotros.
7. `index.html` (sección Proceso): sumar un plazo aproximado de obra por tipo de proyecto, una vez confirmado con Marcelo.
8. `index.html` (Por qué elegirnos o Contacto): sumar una línea o badge para arquitectos/paisajistas si Marcelo confirma que existe o quiere crear ese programa.
9. `index.html`: revisar si conviene unificar alguna de las 4 fórmulas de CTA de "consultar/presupuesto", manteniendo las que están bien contextualizadas (como "Consultar por cancha de X").
10. `index.html` (sección Stats): activar con números reales de canchas instaladas y años de trayectoria, una vez confirmados con Marcelo. No usar los valores de ejemplo actuales.

### Pasada 3 - PULIDO (abierto)

- Revisar la exposición/brillo del recorte de la foto aérea de pádel en el hero para emparejarla con las otras 4.
- Tokenizar los hex codes sueltos en `styles.css` (`#0a0a0a`, `#fff`, `#25d366`) como variables, sin urgencia.
- Revisar el fallback de los botones "Consultar por cancha de X" para el caso sin JavaScript.
- Activar la sección de Testimonios cuando existan testimonios reales de clientes.
- Sumar un dato numérico concreto por etapa en la sección Proceso si existe (ej. tiempo estimado).

## 7. Qué NO cambiar

- El sistema de botones (`.btn--primary` / `.btn--outline` / `.btn--full`) es limpio, consistente y con variantes semánticamente justificadas, no hay redundancia de estilos.
- La implementación de los tabs de Deportes (roles ARIA tablist/tab/tabpanel, roving tabindex, navegación por teclado con flechas) está muy bien hecha, no tocar la estructura ni la accesibilidad.
- El selector de 5 paneles del hero con deep-link a la sección Deportes es una solución de interacción elegante que funciona bien en desktop y mobile.
- El copy de la sección Comparativa ("cancha estándar vs cancha CESPAD") es el más creíble y con más vocabulario de oficio de todo el sitio, usarlo como referencia de tono al reescribir el resto.
- El formulario que arma automáticamente el mensaje de WhatsApp con todos los datos estructurados es un patrón sólido para pre-calificar leads de ticket alto, no tocarlo estructuralmente.
- No se detectaron errores de consola ni imágenes rotas en esta auditoría, la base técnica está sana.
- El trabajo de performance de bloques anteriores (PageSpeed 88-92, LCP resuelto) no debe reabrirse en este bloque.

## 8. Información faltante

- Confirmar cuál es el número de WhatsApp correcto: el declarado en este brief (+54 9 351 378-5192) no coincide con el que está programado en el sitio (+54 9 11 3149-6374).
- Nombres de 2-3 competidores locales que Marcelo identifica como referencia, para comparar posicionamiento.
- Cantidad real de obras terminadas y disponibilidad de fotos de clientes con la obra ya hecha, para activar Proyectos y reemplazar la foto de Nosotros.
- Plazos reales de obra por tipo de proyecto (cancha chica, cancha de club, jardín residencial).
- Años reales de trayectoria y cantidad de canchas instaladas, para activar Stats con datos reales.
- Si existe o se quiere crear un programa o descuento para arquitectos y paisajistas (Perfil C).
- Si conviene mostrar algún rango de precio orientativo o mantener 100% "presupuesto sin cargo" sin ancla de precio.
- Fuente del dato "materiales con presencia en más de 10 países", si es verificable o hay que sacarlo.
- Fecha real de las fotos aéreas usadas en el hero, para saber si conviene actualizarlas con obra más reciente.

## 9. Screenshots

- `d_01_hero.png` - Hero completo, desktop 1440x900, selector de 5 deportes con headline y CTA.
- `d_02_nosotros.png` - Sección Nosotros, desktop, texto + foto con tarjeta flotante.
- `d_03_deportes_padel.png` - Sección Deportes, desktop, pestaña Pádel activa (estado por defecto).
- `d_04_deportes_tenis.png` - Sección Deportes, desktop, pestaña Tenis activa, muestra los placeholders de specs técnicas.
- `d_05_parquizacion.png` - Sección Parquización, desktop, foto de terraza comercial + copy placeholder.
- `d_06_porque.png` - Sección Por qué elegirnos, desktop, grid de 4 tarjetas.
- `d_07_contacto.png` - Sección Contacto, desktop, información de contacto (número de teléfono visible) + formulario.
- `m_01_hero.png` - Hero completo, mobile 375x812.
- `m_02_deportes.png` - Sección Deportes, mobile, pestaña Pádel activa, muestra el placeholder de descripción corta.
- `m_03_contacto.png` - Sección Contacto, mobile, número de teléfono + inicio del formulario.

## 10. Metodología

- **Anti-slop visual / taste de landing**: se midió layout discipline puro (líneas de headline, palabras de subtítulo, cantidad de eyebrows, patrones de sección repetidos, variantes de CTA) contra reglas cuantitativas explícitas, no contra gusto personal.
- **Design standards de producción**: se revisó consistencia de tokens CSS, hex codes sueltos, touch targets y escala de spacing directamente en el código fuente de `styles.css` e `index.html`.
- **Art direction**: se evaluó cada foto real contra lo que su sección necesita comunicar (obra real, jardín residencial, equipo humano), navegando el deploy en vivo en desktop y mobile con capturas de pantalla.
- **Brand discovery**: se comparó el vocabulario del sitio contra el vocabulario real de búsqueda del cliente argentino, y se evaluó a qué perfil de audiencia le habla cada sección, simulando los tres recorridos de cliente descriptos en el punto 1.
- **Creative brief evaluation**: se extrajo el mensaje único tal como se lee (no como se desearía que fuera), se revisó consistencia de voz entre secciones y se verificó si todo el flujo empuja hacia el único objetivo declarado del sitio (el clic a WhatsApp).
