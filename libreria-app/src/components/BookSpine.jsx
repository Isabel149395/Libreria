/**
 * Componente BookSpine
 * Representa el lomo visible de un libro en el estante.
 *
 * @param {Object} props
 * @param {Object} props.libro - Datos del libro (titulo, color, colorTexto)
 * @param {Function} props.onClick - Función que se llama al hacer clic en el lomo (abre modal)
 * @param {Function} props.onDetalle - Función que se llama al doble clic (navega a página de detalles)
 */

import { useRef } from "react";
import styles from "../styles/BookSpine.module.css";

function BookSpine({ libro, onClick, onDetalle }) {
  const clickTimeoutRef = useRef(null);
  const clickCountRef = useRef(0);

  function manejarClic() {
    clickCountRef.current += 1;

    // Si es el primer clic, configurar un timeout para esperar el segundo clic
    if (clickCountRef.current === 1) {
      clickTimeoutRef.current = setTimeout(() => {
        // Si no hubo segundo clic en 300ms, es un clic simple
        if (clickCountRef.current === 1) {
          onClick(libro);
        }
        clickCountRef.current = 0;
      }, 300);
    } else if (clickCountRef.current === 2) {
      // Si hay dos clics en menos de 300ms, es un doble clic
      clearTimeout(clickTimeoutRef.current);
      onDetalle(libro);
      clickCountRef.current = 0;
    }
  }

  return (
    <div
      className={styles.lomo}
      style={{ backgroundColor: libro.color }}
      onClick={manejarClic}
      title={`${libro.titulo} (doble clic para ver detalles)`}
      role="button"
      aria-label={`Ver ficha de ${libro.titulo} (doble clic para más detalles)`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick(libro);
        } else if (e.key === " ") {
          e.preventDefault();
          onDetalle(libro);
        }
      }}
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
