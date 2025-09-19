# Rick & Morty Character Explorer

Aplicación construida con **Next.js 15** y **React 19** que permite explorar personajes de la serie Rick & Morty, seleccionar dos personajes simultáneamente y comparar los episodios en los que aparecen.

---

## 🚀 Stack Tecnológico

* **Next.js 15.5.3** (App Router + RSC)
* **React 19**
* **TypeScript**
* **TailwindCSS 4.1.9** para estilos
* **shadcn/ui** para componentes base
* **Lucide React** para iconografía
* **Rick & Morty API** → [https://rickandmortyapi.com/](https://rickandmortyapi.com/)

---

## 📦 Instalación y ejecución

Cloná el repositorio:

```bash
git clone <repo_url>
cd conexa-challenge
```

Configurá las variables de entorno:

```bash
# Creá un archivo .env.local con:
NEXT_PUBLIC_API_RICKANDMORTY=https://rickandmortyapi.com/api
```

Instalá dependencias:

```bash
pnpm install
```

Ejecutá en desarrollo:

```bash
pnpm dev
```

Compilá para producción:

```bash
pnpm build
pnpm start
```

---

## 🏗️ Estructura del proyecto / Decisiones de arquitectura

```
/app            → rutas y server components (RSC)
  ├─ layout.tsx
  ├─ globals.css
  ├─ page.tsx
  ├─ fonts/     → fuentes locales (Geist)
  └─ icons/     → iconos personalizados
/components     → componentes UI reutilizables
  ├─ ui/        → componentes base de shadcn/ui
  ├─ __test__/  → tests de componentes
  └─ resto de componentes específicos
/contexts       → context providers globales
  └─ character-context.tsx
/hooks          → hooks de lógica de negocio y utilitarios
  ├─ use-episodes.ts
  ├─ use-local-storage.ts
  └─ use-character-selection.ts
/lib            → capa de API, tipados y utilidades
  ├─ api.ts
  ├─ types.ts
  ├─ utils.ts
  ├─ storage-keys.ts
  └─ url-params.ts
```

### 🔹 Principales decisiones y por qué

* **RSC para characters (server-side):**
  Los listados de personajes son datos públicos y paginados que no dependen del usuario. Se cargan en el servidor con cache de 1 hora (`revalidate: 3600`) para optimizar performance y reducir JS en el cliente.

* **Client-side para episodes:**
  Los episodios dependen de la interacción del usuario (selección de 2 personajes). Se traen desde el cliente cuando ambos personajes están seleccionados, permitiendo UX reactiva con skeletons y manejo de estados.

* **Doble paginación independiente:**
  Cada lista de personajes maneja su propia paginación a través de URL params (`page1`, `page2`), permitiendo navegación independiente y estado persistente en la URL.

* **Context para estado global:**
  `CharacterProvider` maneja el estado de los personajes seleccionados globalmente, evitando prop drilling y permitiendo que múltiples componentes accedan al estado.

* **Hooks especializados:**
  * `use-character-selection` → manejo de paginación y fetching por lista.
  * `use-episodes` → fetch/categorización de episodios con memoización y manejo de errores.
  * `use-local-storage` → persistencia opcional en localStorage.

* **Tipado estricto:**
  Tipos centralizados en `/lib/types.ts` con interfaces específicas para API responses, characters, episodes y categorías.

* **Configuración centralizada:**
  * `storage-keys.ts` → claves de localStorage centralizadas.
  * `url-params.ts` → parámetros URL centralizados.

---

## 🧩 Flujo de datos

1. **Server-side inicial:** `page.tsx` (Server Component) obtiene ambas páginas de personajes en paralelo vía `getCharacters(page1)` y `getCharacters(page2)`.

2. **Hidratación:** Los datos se pasan como props iniciales a `CharacterSelection` (Client Component).

3. **Selección:** `CharacterProvider` mantiene estado global de `character1` y `character2` seleccionados.

4. **Paginación independiente:** Cada lista maneja su propia página vía `useCharacterSelection`, actualizando URL params.

5. **Fetch de episodios:** Cuando ambos personajes están seleccionados, `useEpisodes` hace fetch client-side y categoriza:
   * Episodios solo de character1
   * Episodios compartidos
   * Episodios solo de character2

6. **Renderizado:** `EpisodesDisplay` muestra las tres categorías con estados de loading/error/empty.

---

## ✅ Características implementadas

* **Paginación dual independiente** con estado en URL
* **Selección visual** de personajes con feedback inmediato
* **Categorización automática** de episodios (únicos/compartidos)
* **Estados de loading** con skeletons durante fetch
* **Manejo robusto de errores** con reintentos
* **Responsive design** con grid adaptativo
* **Optimización de renders** con memoización
* **Cache inteligente** para datos del servidor
* **Tipado completo** en TypeScript

---

## ✅ Testing y Calidad

El proyecto cuenta con una **suite completa de unit tests** que cubre los componentes y lógica de negocio críticos:

### Cobertura de Tests

* **Jest + React Testing Library** configurado con TypeScript
* **45 tests** distribuidos en **9 test suites**
* **Componentes UI:** Todos los componentes principales testeados con focus en funcionalidad del usuario
* **Hooks de negocio:** `use-episodes` (categorización) y `use-character-selection` (paginación/API)
* **Mocks inteligentes:** API calls, Next.js navigation, localStorage
* **Buenas prácticas:** `data-testid` para elementos específicos, `getByText` para contenido del usuario

### Comandos de Testing

```bash
# Ejecutar todos los tests
pnpm test

# Tests en modo watch
pnpm test:watch

# Tests con coverage
pnpm test:coverage
```

### Estructura de Testing

```
/components/__tests__/  → tests de componentes UI
/hooks/__tests__/       → tests de hooks de negocio
/test/                  → utilidades y mocks compartidos
  ├─ test-utils.tsx     → render helper con providers
  └─ mocks/             → datos mock para tests
```
---
