# Flujo de Trabajo Profesional (Gitflow Adaptado)

Este documento describe el flujo de trabajo para el desarrollo en el proyecto **Cursala Frontend Public**.

## Estructura de Ramas

1.  **`main`**: Rama de producción. Solo el administrador (el usuario actual) puede fusionar cambios en esta rama. Representa el código estable en producción.
2.  **`development`**: Rama de integración. Aquí se agrupan todas las nuevas funcionalidades y correcciones antes de pasar a `main`. Es la rama base para todos los desarrolladores.
3.  **Ramas de Tarea (`feature/`, `fix/`, `task/`)**: Ramas temporales creadas para realizar una tarea específica.

## Procedimiento para el Desarrollador

### 1. Preparación
Antes de empezar cualquier tarea, asegúrate de estar en `development` y tener los últimos cambios:
```bash
git checkout development
git pull origin development
```

### 2. Crear una rama para la tarea
Usa un nombre descriptivo para la rama:
```bash
git checkout -b feature/nombre-de-la-tarea
# o
git checkout -b fix/correccion-de-error
```

### 3. Desarrollar y Hacer Commits
Realiza tus cambios y haz commits atómicos:
```bash
git add .
git commit -m "feat: descripción corta de la tarea"
```

### 4. Sincronizar y Subir
Antes de terminar, asegúrate de no tener conflictos con `development`:
```bash
git pull origin development
git push origin feature/nombre-de-la-tarea
```

### 5. Crear Pull Request
Abre un Pull Request (PR) desde tu rama de tarea hacia la rama **`development`**.

## Reglas de Oro
- **NUNCA** hacer push directo a `main`.
- **NUNCA** hacer push directo a `development` sin un PR previo (si se desea un control estricto).
- Todas las fusiones a `main` deben ser realizadas únicamente por el responsable del repositorio.

## Integración Continua (CI/CD)
- **Producción (`main`)**: Solo cuando el administrador fusiona (`pull request`) o hace un `push` a `main`, se activa automáticamente la **creación de la imagen Docker** y el despliegue automático. Esto garantiza que solo código verificado por ti llegue a producción.
- **Pruebas (opcional)**: Se pueden configurar tareas de linting o tests para la rama `development`.

## Configuración Recomendada de Protección (GitHub/GitLab)
Para que este flujo sea efectivo, el administrador debe:
1. Ir a **Settings > Branches**.
2. Añadir una **Branch protection rule** para `main`:
    - Marcar "Require a pull request before merging".
    - Marcar "Require approvals" (opcional).
    - Marcar "Restrict who can push to matching branches" (Solo el administrador).
3. Añadir una regla para `development`:
    - "Require a pull request before merging".
