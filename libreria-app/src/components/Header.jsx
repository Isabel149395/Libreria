/**
 * Header.jsx — Componente de encabezado reutilizable
 *
 * Responsabilidades:
 *  - Mostrar el logo/título y navegación de la biblioteca
 *  - Ser flexible para mostrar diferentes títulos y acciones
 *  - Proporcionar botón de retorno cuando sea necesario
 */

import styles from "../styles/Header.module.css";

function Header({ titulo = "La Serpiente de Papel", mostrarBotonRetorno = false, onRetornar }) {
  return (
    <header className={styles.header}>
      <div className={styles.contenedor}>
        {/* Sección izquierda: Logo y título */}
        <div className={styles.seccionIzquierda}>
          {mostrarBotonRetorno && (
            <button
              className={styles.botonRetorno}
              onClick={onRetornar}
              aria-label="Volver a la biblioteca"
            >
              ← Volver
            </button>
          )}
          <h1 className={styles.titulo}>{titulo}</h1>
        </div>

        {/* Sección derecha: Navegación (placeholder para futuro) */}
        <nav className={styles.navegacion}>
          {/* Los enlaces pueden agregarse aquí después */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
