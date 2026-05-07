/**
 * Componente BookCard
 * Muestra la ficha completa de un libro en un modal superpuesto.
 * Se activa cuando el usuario hace clic en un lomo del estante.
 *
 * @param {Object} props
 * @param {Object} props.libro - Datos del libro seleccionado
 * @param {Function} props.onCerrar - Función para cerrar el modal
 * @param {string} props.genero - Género del libro (para descargas de PDF)
 * @param {Function} props.onVerExtendida - Función para abrir la vista de información extendida
 */

import { descargarPDF } from "../utils/pdfUtils";
import styles from "../styles/BookCard.module.css";

function BookCard({ libro, onCerrar, genero, onVerExtendida }) {
  // Si no hay libro seleccionado, no renderizar nada
  if (!libro) return null;

  // Cerrar el modal al hacer clic en el overlay (fuera de la ficha)
  function manejarClickOverlay(e) {
    if (e.target === e.currentTarget) {
      onCerrar();
    }
  }

  // Maneja la descarga del PDF
  function manejarDescarga() {
    if (genero) {
      descargarPDF(genero, libro.titulo, libro.autor);
    } else {
      alert("No se puede descargar: género no disponible");
    }
  }

  function manejarVerExtendida(e) {
    e.stopPropagation();
    if (onVerExtendida) {
      onVerExtendida(libro, genero);
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={manejarClickOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Ficha de ${libro.titulo}`}
    >
      <div className={styles.ficha}>
        {/* Franja decorativa con el color del lomo */}
        <div
          className={styles.franjaColor}
          style={{ backgroundColor: libro.color }}
        />

        <button
          className={styles.cerrar}
          onClick={onCerrar}
          aria-label="Cerrar ficha"
        >
          ✕
        </button>

        <h2 className={styles.nombreLibro}>{libro.titulo}</h2>
        <p className={styles.autor}>{libro.autor}</p>

        <div className={styles.metadatos}>
          <span className={styles.badge}>📅 {libro.año}</span>
        </div>

        <hr className={styles.separador} />

        <p className={styles.etiquetaResumen}>Resumen</p>
        <p className={styles.resumen}>{libro.resumen}</p>

        <div className={styles.botonesAccion}>
          <button
            className={styles.botonDescargar}
            onClick={manejarDescarga}
            aria-label={`Descargar PDF de ${libro.titulo}`}
            title="Descargar PDF"
          >
            📥 Descargar PDF
          </button>

          <button
            className={styles.botonExtendida}
            onClick={manejarVerExtendida}
            aria-label={`Ver información extendida de ${libro.titulo}`}
            title="Ver información extendida"
          >
            🔍 Ver información extendida
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
