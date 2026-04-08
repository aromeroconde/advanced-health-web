# GEO-SEO AUDIT REPORT
## Advanced Health Company SAS — advancedhealth.com.co
### Fecha: 3 de abril de 2026

---

## GEO SCORE COMPUESTO: 23/100 (Critico)

| Categoria | Peso | Score | Ponderado |
|---|---|---|---|
| AI Citability & Visibility | 25% | 18/100 | 4.5 |
| Brand Authority Signals | 20% | 28/100 | 5.6 |
| Content Quality & E-E-A-T | 20% | 32/100 | 6.4 |
| Technical Foundations | 15% | 38/100 | 5.7 |
| Structured Data (Schema) | 10% | 0/100 | 0.0 |
| Platform Optimization | 10% | 14/100 | 1.4 |

> **El sitio se encuentra virtualmente invisible para motores de busqueda AI (ChatGPT, Perplexity, Google AI Overviews, Gemini).** Las correcciones urgentes son factibles y el retorno de inversion sera alto dado que solo el 23% de marketers estan invirtiendo en GEO.

---

## Hallazgos Criticos (Prioridad Inmediata)

### 1. CERO Schema JSON-LD (Score: 0/100)
**Severidad: CRITICA**

No existe un solo bloque `<script type="application/ld+json">` en todo el sitio. Google, ChatGPT y Perplexity dependen fuertemente de datos estructurados para entender entidades y relaciones.

**Schema requerido (en orden de prioridad):**
- `Organization` — en layout.tsx (nombre, logo, contacto, sameAs redes)
- `WebSite` + `SearchAction` — en home
- `Product` — en cada pagina de producto (nombre, precio, rating, disponibilidad)
- `ItemList` — en paginas de categorias
- `Article` / `BlogPosting` — en blog posts (autor, fecha, imagen)
- `FAQPage` — en /soporte
- `BreadcrumbList` — en todas las paginas
- `LocalBusiness` — si hay tienda fisica en Colombia

### 2. CERO robots.txt (Score: 5/100)
**Severidad: CRITICA**

No existe archivo robots.txt. Los crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, etc.) no tienen instrucciones de como acceder al sitio. En ausencia de robots.txt, la mayoria de crawlers asumen acceso permitido, pero no es una estrategia deliberada.

**Accion:** Crear `public/robots.txt` permitiendo todos los crawlers AI y referenciando el sitemap.

### 3. CERO sitemap.xml (Score: 0/100)
**Severidad: CRITICA**

No hay sitemap.xml ni generador configurado. Sin sitemap, el descubrimiento de paginas depende exclusivamente de links internos.

**Accion:** Instalar `next-sitemap` y generar sitemap automatico con todas las rutas.

### 4. Metadata duplicada en todas las paginas (Score: 30/100)
**Severidad: CRITICA**

Todas las paginas comparten el mismo `<title>` y `<meta description>`:
- Title: "Advanced Health | Clinical Excellence & Editorial Vitality"
- Description: "Nutricion avanzada disenada para el rendimiento humano..."

**Problemas especificos:**
- No hay `generateMetadata()` en ninguna pagina principal (home, productos, blog, nosotros, soporte)
- El OpenGraph `locale: 'es_CO'` se aplica incluso a la version en ingles
- No hay `hreflang` ni `canonical` tags
- El blog no genera metadata dinamica por post (titulo del post no aparece en `<title>`)

### 5. Sin llms.txt (Score: 0/100)
**Severidad: ALTA**

El estandar `llms.txt` es la forma principal en que los crawlers de IA descubren la estructura de un sitio. Sin el, los LLMs dependen exclusivamente del crawling tradicional.

**Accion:** Generar `/llms.txt` con resumen de la empresa, productos y estructura del sitio.

---

## Detalle de Analisis por Subagente

### A. AI Visibility (Score Global: 14/100)

| Metrica | Score |
|---|---|
| AI Citability | 22/100 |
| AI Crawler Access | 5/100 |
| llms.txt | 0/100 |
| Brand Authority | 28/100 |

**Hallazgos clave:**
- Cero pasajes citables por IA encontrados (el optimo es 134-167 palabras, autocontenidos, ricos en hechos)
- El mejor contenido esta en /nosotros (~140 palabras de historia) pero carece de datos duros
- Las descripciones de productos son de 20-30 palabras — insuficientes para ser citadas
- Los excerpts del blog son prometedores topicamente pero solo tienen 30-40 palabras
- Redes sociales apuntan a "NeoflexPlus" en Facebook/Instagram, no a "Advanced Health"
- No hay sameAs links en datos estructurados

### B. Platform Optimization (Score Global: 14/100)

| Plataforma | Score | Estado |
|---|---|---|
| ChatGPT Readiness | 18/100 | Critico |
| Google AI Overviews | 15/100 | Critico |
| Perplexity Readiness | 12/100 | Critico |
| Gemini Readiness | 10/100 | Critico |

**Razones principales:**
- Sin contenido factual/comparativo (tablas nutricionales, datos clinicos, estudios)
- Sin FAQPage schema (las FAQs en /soporte usan `<details>/<summary>` pero sin schema)
- Sin respuestas estructuradas tipo Q&A
- Sin datos especificos de productos (ingredientes, dosificacion, estudios)
- Sin pagina de "Ciencia" con contenido enciclopedico

### C. Technical SEO (Score Global: 38/100)

| Aspecto | Score |
|---|---|
| SSR/Rendering | 65/100 |
| Meta Tags & Titles | 30/100 |
| Crawlability & Indexability | 10/100 |
| Mobile & Performance | 45/100 |
| Security & Best Practices | 40/100 |
| Internal Linking | 40/100 |

**Positivo:**
- Next.js App Router con Server Components en la mayoria de paginas
- i18n funcional con middleware de redireccion
- Layout global es Server Component

**Negativo:**
- `/soporte/page.tsx` es `'use client'` — las FAQs no se renderizan en servidor
- No hay `hreflang` tags para i18n
- Imagenes de Unsplash directamente (sin optimizacion Next Image)
- `next.config.ts` vacio sin configuracion de dominio, redirects o headers
- Sin canonical tags
- Copyright en footer dice "2024" (desactualizado)

### D. Content Quality & E-E-A-T (Score Global: 32/100)

| Dimension | Score |
|---|---|
| Experience | 25/100 |
| Expertise | 35/100 |
| Authoritativeness | 30/100 |
| Trustworthiness | 38/100 |

**Positivo:**
- Terminologia cientifica correcta en blog ("eje hipotalamo-hipofiso-suprarrenal", "metilcobalamina sublingual", "biodisponibilidad")
- 5 articulos con rigor cientifico (colageno, magnesio, D3+K2, adaptogenos, microbioma)
- Registro INVIMA mencionado
- Paginas legales completas (terminos, retracto, privacidad)
- Disclaimer medico en footer

**Negativo:**
- Cero autores identificables con credenciales (MD, PhD, nutricionista)
- Cero referencias bibliograficas o links a PubMed
- Cero testimonials verificables con nombres
- Redes sociales apuntan a marca diferente (NeoflexPlus)
- Sin certificaciones de terceros (GMP, NSF, USP)
- Descripciones de productos muy cortas (20-30 palabras)

### E. Schema Markup (Score: 0/100)

Confirmado: zero datos estructurados en todo el sitio. Ver seccion de Hallazgos Criticos #1.

---

## Plan de Accion Priorizado

### Quick Wins (1-3 dias)

| # | Accion | Impacto | Dificultad |
|---|--------|---------|------------|
| 1 | Crear `public/robots.txt` permitiendo crawlers AI | Alto | Baja |
| 2 | Instalar `next-sitemap` y generar sitemap.xml | Alto | Baja |
| 3 | Crear `public/llms.txt` con resumen del sitio | Alto | Baja |
| 4 | Agregar `generateMetadata()` en cada pagina principal | Alto | Media |
| 5 | Agregar schema `Organization` en layout.tsx | Alto | Baja |
| 6 | Actualizar copyright a 2026 | Bajo | Baja |
| 7 | Corregir redes sociales (NeoflexPlus → Advanced Health) | Medio | Baja |

### Mediano Plazo (1-2 semanas)

| # | Accion | Impacto | Dificultad |
|---|--------|---------|------------|
| 8 | Agregar schema `Product` en pagina de productos | Alto | Media |
| 9 | Agregar schema `BlogPosting` en blog posts | Alto | Media |
| 10 | Agregar schema `FAQPage` en /soporte | Medio | Baja |
| 11 | Agregar `hreflang` y `canonical` tags | Alto | Media |
| 12 | Expandir descripciones de productos (100+ palabras cada una) | Alto | Media |
| 13 | Crear pagina `/ciencia` con contenido enciclopedico | Alto | Media |
| 14 | Convertir /soporte a Server Component | Medio | Baja |

### Estrategico (1+ meses)

| # | Accion | Impacto | Dificultad |
|---|--------|---------|------------|
| 15 | Agregar autores con credenciales al blog | Alto | Media |
| 16 | Agregar referencias cientificas (PubMed links) en blog | Alto | Media |
| 17 | Crear comparaciones de productos con tablas nutricionales | Alto | Media |
| 18 | Implementar testimonials verificables | Medio | Media |
| 19 | Optimizar imagenes con Next `<Image>` | Medio | Media |
| 20 | Crear Google Business Profile y vincular con LocalBusiness schema | Alto | Media |
| 21 | Campana de menciones de marca en plataformas AI-citadas | Alto | Alta |

---

## Scoring Summary

```
GEO SCORE COMPUESTO: ████████░░░░░░░░░░░░░░░░░░░░░░░░░░ 23/100

AI Citability:      ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ 22/100
AI Crawler Access:  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  5/100
llms.txt:           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0/100
Brand Authority:    █████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 28/100
E-E-A-T:            ██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ 32/100
Technical SEO:      ████████████░░░░░░░░░░░░░░░░░░░░░░░░░ 38/100
Schema Markup:      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0/100
ChatGPT Readiness:  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 18/100
Google AIO:         █████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 15/100
Perplexity:         ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 12/100
Gemini:             ███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 10/100
```

---

*Reporte generado con GEO-SEO Claude Code Skill*
*URL analizada: http://localhost:3000 (dev) | Produccion: https://www.advancedhealth.com.co*
*Empresa: Advanced Health Company SAS | Tipo: E-commerce Suplementos/Nutricion | Pais: Colombia*
