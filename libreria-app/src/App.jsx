/**
 * App.jsx — Componente raíz / orquestador
 *
 * Responsabilidades:
 *  - Manejar el enrutamiento entre la biblioteca principal y la página de detalles
 *  - Mantener el estado del libro seleccionado para navegación
 *  - Renderizar la vista apropiada según el estado de navegación
 *  - Coordinar entre Bookshelf, BookCard, y BookDetail
 */

import { useState } from "react";
import { generos } from "./data/libros";
import Bookshelf from "./components/Bookshelf";
import BookSpine from "./components/BookSpine";
import BookCard from "./components/BookCard";
import BookDetail from "./components/BookDetail";
import "./App.css";

function App() {
  // Estado para el libro seleccionado en el modal (null = sin modal abierto)
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  
  // Estado para la navegación: "biblioteca" o "detalle"
  const [vistaActual, setVistaActual] = useState("biblioteca");
  
  // Estado para almacenar el género del libro seleccionado (necesario para BookDetail)
  const [generoActual, setGeneroActual] = useState(null);

  // Abre la ficha del libro clickeado (modal en la biblioteca)
  function abrirFicha(libro, genero) {
    setLibroSeleccionado(libro);
    setGeneroActual(genero);
  }

  // Cierra la ficha (resetea el estado a null)
  function cerrarFicha() {
    setLibroSeleccionado(null);
  }

  // Navega a la página de detalles del libro
  function irADetalle(libro, genero) {
    setLibroSeleccionado(libro);
    setGeneroActual(genero);
    setVistaActual("detalle");
  }

  // Abre la vista de información extendida desde el modal
  function verInformacionExtendida(libro, genero) {
    irADetalle(libro, genero);
  }

  // Retorna a la biblioteca principal
  function retornarABiblioteca() {
    setVistaActual("biblioteca");
    setLibroSeleccionado(null);
    setGeneroActual(null);
  }

  return (
  <>
    {/* Vista: Biblioteca Principal */}
    {vistaActual === "biblioteca" && (
      <div className="app-contenedor">
        {/* Encabezado de la librería */}
        <header className="app-header">
          <h1 className="app-titulo">La Serpiente de Papel</h1>
          <p className="app-subtitulo">
            Cada lomo guarda un mundo — haz clic para descubrirlo
          </p>
        </header>

        {/* Sección principal: estantes por género */}
        <main className="app-estantes">
          {generos.map((genero) => (
            /*
             * Usamos el patrón children: Bookshelf recibe los BookSpine
             * como hijos en lugar de pasarlos como prop directa.
             * Esto demuestra composición vs herencia (Paso 3 de la guía).
             */
            <Bookshelf key={genero.id} genero={genero.nombre}>
              {genero.libros.map((libro) => (
                <BookSpine
                  key={libro.id}
                  libro={libro}
                  onClick={() => abrirFicha(libro, genero.nombre)}
                  onDetalle={() => irADetalle(libro, genero.nombre)}
                />
              ))}
            </Bookshelf>
          ))}
        </main>

        {/* Modal de ficha del libro — se renderiza solo si hay un libro seleccionado */}
        <BookCard
          libro={libroSeleccionado}
          onCerrar={cerrarFicha}
          genero={generoActual}
          onVerExtendida={verInformacionExtendida}
        />
      </div>
    )}

    {/* Vista: Página de Detalles del Libro */}
    {vistaActual === "detalle" && libroSeleccionado && (
      <BookDetail
        libro={libroSeleccionado}
        genero={generoActual}
        onRetornar={retornarABiblioteca}
      />
    )}
  </>
);
}

export default App;
