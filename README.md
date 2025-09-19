Rick & Morty Explorer

Aplicación construida con Next.js 15 y React 19 que permite explorar personajes de la serie Rick & Morty, seleccionar dos personajes y comparar los episodios en los que aparecen.
El proyecto hace uso de React Server Components (RSC) para optimizar performance y consumo de datos.

🚀 Stack Tecnológico

Next.js 15 (App Router + RSC)

React 19

TypeScript

TailwindCSS para estilos

shadcn/ui para componentes base

Rick & Morty API → rickandmortyapi.com

📦 Instalación y ejecución

Cloná el repositorio:

git clone <repo_url>
cd <repo>


Instalá dependencias (usa el gestor que prefieras, aquí pnpm como ejemplo):

pnpm install


Ejecutá en desarrollo:

pnpm dev


Compilá para producción:

pnpm build
pnpm start

🏗️ Decisiones de Arquitectura

El proyecto sigue una estructura modular clara:

/app         → rutas y server components
/components → componentes UI reutilizables
/hooks      → hooks de lógica de negocio
/lib        → capa de API y tipados

🔹 Fetching de datos

Characters (server-side): se cargan mediante React Server Components para aprovechar caching y performance.

Episodes (client-side): se consultan dinámicamente al seleccionar personajes, ya que dependen de la interacción del usuario.

🔹 API Layer

La API está centralizada en /lib/api.ts como funciones puras en lugar de clases, para una integración más natural con RSC y mejorar testabilidad.
