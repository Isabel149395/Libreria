/**
 * Componente Bookshelf
 * Representa un estante completo con todos los libros de un género.
 * Usa el patrón children para anidar los lomos (BookSpine) dentro del tablón.
 *
 * @param {Object} props
 * @param {string} props.genero - Nombre del género mostrado como etiqueta
 * @param {React.ReactNode} props.children - Componentes BookSpine que se renderizan dentro
 */

import styles from "../styles/Bookshelf.module.css";

function Bookshelf({ genero, children }) {
  return (
    <div className={styles.estante}>
      <p className={styles.etiquetaGenero}>{genero}</p>
      <div className={styles.tablon}>{children}</div>
      <div className={styles.bordeEstante}></div>
    </div>
  );
}

export default Bookshelf;
