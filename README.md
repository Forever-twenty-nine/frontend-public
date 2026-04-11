Cursala - Frontend Público

Este es el repositorio del frontend público de la plataforma Cursala, desarrollado con Next.js 16 y React 19.

🚀 Inicio Rápido

Requisitos Previos:
    . Node.js: Se recomienda la versión LTS más reciente.
    . MongoDB: Tener una instancia local corriendo en mongodb://127.0.0.1:27017/Cursala.

Instalación
    1. Clonar el repositorio.
    2. Instalar dependencias:

        npm install
    3. Instalar navegadores de Playwright (necesario para tests):

        npx playwright install

Configuración
Crear un archivo .env.local en la raíz (basarse en .env.local existente) con las siguientes variables:

    . MONGODB_URI: Conexión a la base de datos.
    . NEXT_PUBLIC_API_URL: URL del backend (por defecto http://localhost:3001/api/v1).
    . NEXT_PUBLIC_FRONTEND_URL: URL local del front (http://localhost:3002).

______________________________________________________________________________________________

🛠️ Scripts Disponibles

Comando                Descripción                                            Puerto
npm run dev            Inicia el servidor con 4GB de RAM (usando cross-env)    3002
npm run dev:fast       Modo desarrollo ultra rápido usando el motor Turbo      3002
npm run build          Compila la aplicación para producción                     -
npm run start          Inicia la app en modo producción (local)                3001

_______________________________________________________________________________________________

🧪 Testing
El proyecto cuenta con dos entornos de pruebas:

1. Pruebas Unitarias (Vitest):
   
   npm run test

2. Pruebas End-to-End (Playwright):
   
   npm run test:e2e

_____________________________________________________________________________________________

🏗️ Stack Tecnológico

. Core: Next.js 16 (App Router), React 19, TypeScript.

. Estilos: Tailwind CSS 4.

. Base de Datos: Mongoose (MongoDB).

. Formularios: React Hook Form.

. Comunicación: Axios.

. Seguridad: NextAuth, Bcryptjs.
