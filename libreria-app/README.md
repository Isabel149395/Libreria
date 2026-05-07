# La Serpiente de Papel - Librería Virtual

Aplicación web desarrollada con React y Vite que simula una biblioteca interactiva donde puedes explorar estantes de libros por género, ver resúmenes en tarjetas emergentes y acceder a vistas de detalle con opción de descarga de PDF.

## Diagrama de Flujo

El siguiente diagrama muestra la arquitectura y el flujo de navegación del usuario en la aplicación:

```mermaid
flowchart TD
    A[Inicio de la App] --> B{Estado vistaActual}
    B -- "biblioteca" --> C[Renderizar App.jsx (Vista Principal)]
    B -- "detalle" --> D[Renderizar BookDetail.jsx]

    C --> E[Header Principal]
    C --> F[Iterar Generos]
    F --> G[Renderizar Bookshelf]
    G --> H[Renderizar BookSpine]

    H -- Click en el lomo --> I[Abrir Ficha BookCard Modal]
    H -- Click en 'Ver Detalle' --> J[Cambiar estado a 'detalle']
    
    I -- Cerrar --> C
    I -- Click 'Más Info' --> J

    J --> D
    D --> K[Mostrar Portada y Resumen]
    D --> L[Botón Descargar PDF]
    D -- Click 'Inicio/Retornar' --> M[Cambiar estado a 'biblioteca']
    M --> C
```

## Estrategia de Estilos

La aplicación utiliza una estrategia híbrida enfocada principalmente en **CSS Modules**:

1. **Estilos Globales (`App.css` / `index.css`)**: 
   - Se utilizan para la configuración general (reset de márgenes, variables CSS, tipografías globales y fondos).
   - Definen la estructura base del contenedor de la aplicación (`.app-contenedor`).

2. **CSS Modules (`*.module.css`)**:
   - Cada componente (ej. `Bookshelf`, `BookSpine`, `BookCard`, `BookDetail`) tiene su propio archivo `.module.css` en la carpeta `src/styles/`.
   - **Ventajas**: Esto genera clases únicas (con hashes en tiempo de compilación) que garantizan que **no haya colisión de nombres** entre componentes. Permite mantener estilos encapsulados, altamente reutilizables y facilita el mantenimiento a escala.

3. **Estilos Inline (Dinámicos)**:
   - Se aplican limitadamente a través del atributo `style` en JSX para propiedades puramente dinámicas que provienen de la base de datos (por ejemplo, el color de fondo personalizado de cada libro `backgroundColor: libro.color`).

## Reporte CSR (Client-Side Rendering)

Esta aplicación fue construida utilizando el enfoque **Client-Side Rendering (CSR)** con React y Vite.

### Cómo funciona en esta aplicación:
1. **Carga Inicial**: Al acceder, el servidor web entrega un archivo `index.html` prácticamente vacío que contiene solo un contenedor base (`<div id="root"></div>`), junto con las referencias a los archivos empaquetados de JavaScript y CSS.
2. **Ejecución y Renderizado**: Una vez que el navegador descarga el archivo de JavaScript, el motor de React toma el control, construye el árbol de componentes (DOM virtual) y pinta (renderiza) toda la interfaz de usuario en la pantalla.
3. **Navegación Dinámica**: Los cambios de vista (como pasar de la estantería principal a la vista de información extendida del libro) ocurren **sin solicitar un nuevo HTML al servidor**. Se logra simplemente actualizando el estado de la aplicación (`vistaActual`), lo que indica a React qué componentes montar y desmontar dinámicamente en el DOM.

### Ventajas experimentadas en el proyecto:
- **Interactividad Fluida e Inmediata**: Tras la carga inicial del JavaScript, la navegación entre componentes y los cambios de estado (como abrir el modal del libro o ir a la vista de detalles) son instantáneos, ofreciendo una experiencia similar a una aplicación nativa.
- **Rendimiento de Servidor Reducido**: El servidor web sólo se encarga de servir recursos estáticos en la carga inicial, delegando todo el esfuerzo computacional y de renderizado al dispositivo del usuario.

### Consideraciones (Trade-offs):
- Al ser CSR puro, el tiempo de primera carga (Time to Interactive) depende de la velocidad de descarga y procesamiento del JavaScript. El SEO inicial se basa en que los bots (como Googlebot) sean capaces de ejecutar el JS para indexar el contenido de los libros.
