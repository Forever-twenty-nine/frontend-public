/**
 * Convierte un texto en un slug SEO-friendly
 * @param text - Texto a convertir
 * @returns Slug en formato URL-friendly
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Reemplazar caracteres especiales del español
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    // Remover caracteres especiales
    .replace(/[^\w\s-]/g, '')
    // Reemplazar espacios y múltiples guiones con un solo guión
    .replace(/[\s_-]+/g, '-')
    // Remover guiones del inicio y final
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Genera un slug para un curso combinando el nombre y el ID
 * Formato: nombre-del-curso-[id-corto]
 * @param courseName - Nombre del curso
 * @param courseId - ID del curso
 * @returns Slug completo del curso
 */
export function generateCourseSlug(courseName: string, courseId: string): string {
  const nameSlug = slugify(courseName);
  // Usar los últimos 8 caracteres del ID para mantener la URL corta
  const shortId = courseId.slice(-8);
  return `${nameSlug}-${shortId}`;
}

/**
 * Extrae el ID del curso desde un slug
 * @param slug - Slug del curso (formato: nombre-del-curso-[id-corto])
 * @returns ID corto del curso
 */
export function extractCourseIdFromSlug(slug: string): string {
  const parts = slug.split('-');
  return parts[parts.length - 1];
}
