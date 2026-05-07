/**
 * Componente BookSpine
 * Representa el lomo visible de un libro en el estante.
 *
 * @param {Object} props
 * @param {Object} props.libro - Datos del libro (titulo, color, colorTexto)
 * @param {Function} props.onClick - Función que se llama al hacer clic en el lomo
 */

import styles from "../styles/BookSpine.module.css";

function BookSpine({ libro, onClick }) {
  return (
    <div
      className={styles.lomo}
      style={{ backgroundColor: libro.color }}
      onClick={() => onClick(libro)}
      title={libro.titulo}
      role="button"
      aria-label={`Ver ficha de ${libro.titulo}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(libro)}
    >
      <span
        className={styles.titulo}
        style={{ color: libro.colorTexto }}
      >
        {libro.titulo}
      </span>
    </div>
  );
}

export default BookSpine;
