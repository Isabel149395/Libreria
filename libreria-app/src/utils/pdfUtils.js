/**
 * pdfUtils.js — Utilidades para manejar descargas de PDFs
 * 
 * Mapea los géneros de la aplicación a las carpetas de PDFs
 * y proporciona funciones para descargar archivos
 */

// Mapeo de géneros de la aplicación a carpetas de PDFs
export const generoALaCarpeta = {
  "Clásicos": "CLASICO",
  "Ciencia Ficción": "CIENCIA Y FICCION",
  "Misterio": "MISTERIO",
  "Romance": "ROMANCE",
  "Terror": "TERROR",
};

/**
 * Genera el nombre del archivo PDF basado en el título y autor del libro
 * @param {string} titulo - Título del libro
 * @param {string} autor - Autor del libro
 * @returns {string} - Nombre del archivo esperado
 */
export function generarNombreArchivo(titulo, autor) {
  // Formato esperado: "Titulo_con_guiones-Autor_sin_espacios.pdf"
  const tituloFormato = titulo
    .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
    .replace(/\s+/g, '_');    // Reemplaza espacios con guiones bajos
  
  const autorFormato = autor
    .replace(/[^\w\s]/g, '')  // Elimina caracteres especiales
    .replace(/\s+/g, '_');    // Reemplaza espacios con guiones bajos
  
  return `${tituloFormato}-${autorFormato}.pdf`;
}

/**
 * Construye la ruta del PDF basada en el género, título y autor
 * @param {string} genero - Género del libro
 * @param {string} titulo - Título del libro
 * @param {string} autor - Autor del libro
 * @returns {string} - Ruta relativa del PDF
 */
export function construirRutaPDF(genero, titulo, autor) {
  const carpeta = generoALaCarpeta[genero];
  if (!carpeta) {
    console.warn(`Género no reconocido: ${genero}`);
    return null;
  }
  
  const nombreArchivo = generarNombreArchivo(titulo, autor);
  return `/src/libros/${carpeta}/${nombreArchivo}`;
}

/**
 * Descarga un PDF basado en el género, título y autor del libro
 * @param {string} genero - Género del libro
 * @param {string} titulo - Título del libro
 * @param {string} autor - Autor del libro
 */
export function descargarPDF(genero, titulo, autor) {
  const carpeta = generoALaCarpeta[genero];
  if (!carpeta) {
    console.error(`Género no reconocido: ${genero}`);
    alert("No se puede descargar: género no reconocido");
    return;
  }

  // Construir el nombre del archivo
  const tituloFormato = titulo
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_');
  
  const autorFormato = autor
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_');
  
  const nombreArchivo = `${tituloFormato}-${autorFormato}.pdf`;
  
  // Construir la ruta del PDF (relativa a public/)
  const ruta = `libros/${carpeta}/${nombreArchivo}`;
  
  // Crear un elemento <a> temporal para descargar
  const enlace = document.createElement('a');
  enlace.href = ruta;
  enlace.download = nombreArchivo;
  enlace.style.display = 'none';
  
  // Agregar al DOM, hacer clic y remover
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}
