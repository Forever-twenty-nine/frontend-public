# API Routes - Backend Public

**Base URL:** `http://localhost:8080/api/v1`

## Cursos

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/courses/public` | Lista de cursos publicados (paginada) |
| `GET` | `/courses/home` | Cursos destacados para home |
| `GET` | `/courses/public/:courseId` | Detalle de un curso |

## Capacitaciones Empresariales

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/businessTraining/createBusinessTraining` | Solicitar capacitación empresarial |

## FAQs (Preguntas Frecuentes)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/faqs` | Todas las FAQs |
| `GET` | `/faqs/categories` | Categorías de FAQs |
| `GET` | `/faqs/category/:category` | FAQs por categoría |

## Solicitudes de Capacitación

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/iwanttotrain/createIWantToTrain` | Solicitud "Quiero Capacitarme" |

## Solicitudes de Curso

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/requestACourse/createRequestACourse` | Solicitar un curso específico |

## Datos Públicos

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/public/company-data` | Datos públicos de la compañía (políticas, términos) |

## CDN (Bunny)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/bunny/course/:imageFileName` | Imagen de curso (redirect a CDN) |
| `GET` | `/bunny/teacher/:imageFileName` | Imagen de profesor (redirect a CDN) |

---

**Notas:**
- Todos los archivos multimedia se sirven desde **Bunny CDN**
- Los endpoints de Bunny devuelven un **redirect 302** a la URL del CDN
- No se requiere autenticación para ningún endpoint
