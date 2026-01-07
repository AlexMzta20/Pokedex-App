# Pokedex-App
Este proyecto es una aplicación web responsiva construida con React, TypeScript y Redux Toolkit que interactúa con la PokéAPI. 
Simula una interfaz de Pokédex clásica, permitiendo visualizar, paginar y buscar Pokémones con un diseño atractivo y funcional.

## Características Principales
- **Visualización de Datos:** Muestra tarjetas de Pokémon con estadísticas base (HP, Ataque, Defensa, etc.).
- **Paginación:** Navegación fluida mostrando 6 resultados por página.
- **Búsqueda Inteligente:** Buscador global que encuentra Pokémones en tiempo real mientras escribes.
- **Detalle Modal:** Visualización detallada de cada Pokémon al hacer clic en su tarjeta.
- **Diseño Responsivo:** Interfaz adaptada para dispositivos móviles y escritorio utilizando Tailwind CSS.

## Tecnologías Utilizadas
- **Core:** React 18, TypeScript (Vite).
- **Estado Global:** Redux Toolkit (Store, Slices, AsyncThunks).
- **Estilos:** Tailwind CSS.
- **HTTP Client:** Axios.
- **Iconos:** SVG nativos.

## Instrucciones de Instalación y Ejecución
Para correr este proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AlexMzta20/Pokedex-App.git
   cd pokedex-app

2. ```bash
   npm install

3. ```bash
   npm run dev

4. **Abrir en el navegador:** Ingresa a la URL que muestra la terminal
   ```bash
   http://localhost:5173

## Actualización
Originalmente, la App funcionaba con Paginación del Servidor (Server-side Pagination), ahora se realizó un cambio a 
Ordenamiento del Cliente (Client-side Sorting), para tener un ordenamiento alfabético y no por su ID como la API los 
daba en ese orden que tienen en su base de datos.
