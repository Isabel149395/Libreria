/**
 * App.jsx — Componente raíz / orquestador
 *
 * Responsabilidades:
 *  - Importar y mostrar todos los estantes (Bookshelf) con sus libros
 *  - Manejar el estado del libro seleccionado para abrir/cerrar BookCard
 *  - No contiene lógica de negocio propia, solo composición y estado de UI
 */

import { useState } from "react";
import { generos } from "./data/libros";
import Bookshelf from "./components/Bookshelf";
import BookSpine from "./components/BookSpine";
import BookCard from "./components/BookCard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  // Estado que guarda el libro seleccionado (null = ningún modal abierto)
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  // Abre la ficha del libro clickeado
  function abrirFicha(libro) {
    setLibroSeleccionado(libro);
  }

  // Cierra la ficha (resetea el estado a null)
  function cerrarFicha() {
    setLibroSeleccionado(null);
  }

  return (
  <>
    <Navbar />
    <div className="app-contenedor">
      <header className="app-header">
        <h1 className="app-titulo">La Serpiente de Papel</h1>
        <p className="app-subtitulo">
          Cada lomo guarda un mundo — haz clic para descubrirlo
        </p>
      </header>
      <main className="app-estantes">
        {generos.map((genero) => (
          <Bookshelf key={genero.id} genero={genero.nombre}>
            {genero.libros.map((libro) => (
              <BookSpine key={libro.id} libro={libro} onClick={abrirFicha} />
            ))}
          </Bookshelf>
        ))}
      </main>
      <BookCard libro={libroSeleccionado} onCerrar={cerrarFicha} />
    </div>
  </>
);
}

export default App;
