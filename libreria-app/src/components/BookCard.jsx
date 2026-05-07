/**
 * Componente BookCard
 * Muestra la ficha completa de un libro en un modal superpuesto.
 * Se activa cuando el usuario hace clic en un lomo del estante.
 *
 * @param {Object} props
 * @param {Object} props.libro - Datos del libro seleccionado
 * @param {Function} props.onCerrar - Función para cerrar el modal
 */

import styles from "../styles/BookCard.module.css";

function BookCard({ libro, onCerrar }) {
  // Si no hay libro seleccionado, no renderizar nada
  if (!libro) return null;

  // Cerrar el modal al hacer clic en el overlay (fuera de la ficha)
  function manejarClickOverlay(e) {
    if (e.target === e.currentTarget) {
      onCerrar();
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
          <span className={styles.badge}>📅 {libro.anio}</span>
        </div>

        <hr className={styles.separador} />

        <p className={styles.etiquetaResumen}>Resumen</p>
        <p className={styles.resumen}>{libro.resumen}</p>
      </div>
    </div>
  );
}

export default BookCard;
