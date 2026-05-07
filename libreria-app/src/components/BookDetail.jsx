/**
 * BookDetail.jsx — Página de detalles completa del libro
 *
 * Responsabilidades:
 *  - Mostrar toda la información del libro seleccionado
 *  - Mostrar header con navegación y botón de retorno
 *  - Presentar la portada, título, autor, categorías y descripción
 *  - Permitir descargar el PDF del libro
 *  - Seguir el patrón visual de la biblioteca Elejandría
 */

import { descargarPDF } from "../utils/pdfUtils";
import Header from "./Header";
import styles from "../styles/BookDetail.module.css";

function BookDetail({ libro, onRetornar, genero }) {
  // Maneja la descarga del PDF
  function manejarDescarga() {
    if (genero) {
      descargarPDF(genero, libro.titulo, libro.autor);
    } else {
      alert("No se puede descargar: género no disponible");
    }
  }

  return (
    <div className={styles.contenedor}>
      {/* Header con botón de retorno */}
      <Header
        titulo="La Serpiente de Papel"
        mostrarBotonRetorno={true}
        onRetornar={onRetornar}
      />

      {/* Contenido principal */}
      <main className={styles.main}>
        {/* Sección hero con navegación breadcrumb */}
        <div className={styles.breadcrumb}>
          <span onClick={onRetornar} className={styles.enlaceBreadcrumb}>
            Inicio
          </span>
          <span className={styles.separador}>/</span>
          <span onClick={onRetornar} className={styles.enlaceBreadcrumb}>
            Libros
          </span>
          <span className={styles.separador}>/</span>
          <span className={styles.actual}>{genero}</span>
        </div>

        <div className={styles.contenidoLibro}>
          {/* Columna izquierda: Portada e imagen */}
          <div className={styles.columnaPortada}>
            <div
              className={styles.portada}
              style={{
                backgroundColor: libro.color,
                color: libro.colorTexto,
              }}
            >
              <div className={styles.contenidoPortada}>
                <h2 className={styles.tituloPortada}>{libro.titulo}</h2>
                <p className={styles.autorPortada}>{libro.autor}</p>
              </div>
            </div>

            {/* Botón de descarga debajo de la portada */}
            <button
              className={styles.botonDescargarDetalle}
              onClick={manejarDescarga}
              aria-label={`Descargar PDF de ${libro.titulo}`}
              title="Descargar PDF"
            >
              📥 Descargar PDF
            </button>
          </div>

          {/* Columna derecha: Información del libro */}
          <div className={styles.columnaInfo}>
            {/* Título y autor principal */}
            <h1 className={styles.tituloPrincipal}>
              {libro.titulo.toUpperCase()}
            </h1>
            <p className={styles.autorPrincipal}>de {libro.autor}</p>

            {/* Descripción/Resumen */}
            <div className={styles.seccionResumen}>
              <p className={styles.textoResumen}>{libro.resumen}</p>
              <a href="#" className={styles.enlaceLeerMas}>
                Leer más...
              </a>
            </div>

            {/* Categorías */}
            <div className={styles.seccionCategorias}>
              <p className={styles.etiquetaCategorias}>Literatura y ficción &gt; {genero}</p>
              <div className={styles.badges}>
                <span className={styles.badge}>{libro.año}</span>
                <span className={styles.badge}>{genero}</span>
                <span className={styles.badge}>Clásico de la literatura</span>
              </div>
            </div>

            {/* Redes sociales (placeholder) */}
            <div className={styles.redesSociales}>
              <button className={styles.botonRed} aria-label="Compartir en WhatsApp">
                💬
              </button>
              <button className={styles.botonRed} aria-label="Compartir en Facebook">
                👍
              </button>
              <button className={styles.botonRed} aria-label="Compartir en Twitter">
                🐦
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookDetail;
