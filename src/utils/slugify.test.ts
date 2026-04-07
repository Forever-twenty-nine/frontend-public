import { describe, it, expect } from 'vitest';
import { slugify, generateCourseSlug, extractCourseIdFromSlug } from './slugify';

describe('Pruebas de Integridad de URLs (Slugify)', () => {

  it('Debe convertir nombres con acentos y mayúsculas correctamente', () => {
    // Escenario de prueba: Un nombre con "ruido"
    const input = "MÁSTER en Programación Avanzada de Cursala";
    const esperado = "master-en-programacion-avanzada-de-cursala";
    
    // Ejecución y Verificación
    expect(slugify(input)).toBe(esperado);
  });

  it('Debe generar un slug único combinando Nombre + ID corto', () => {
    const curso = "React para Expertos";
    const id = "64f1a2b3c4d5e6f7a8b9c0d1"; // ID de MongoDB
    
    // El código toma los últimos 8 caracteres: "a8b9c0d1"
    const resultado = generateCourseSlug(curso, id);
    
    expect(resultado).toBe("react-para-expertos-a8b9c0d1");
  });

  it('Debe poder extraer el ID a partir de un slug existente', () => {
    const slug = "excel-avanzado-z9y8x7w6";
    const idExtraido = extractCourseIdFromSlug(slug);
    
    expect(idExtraido).toBe("z9y8x7w6");
  });
});