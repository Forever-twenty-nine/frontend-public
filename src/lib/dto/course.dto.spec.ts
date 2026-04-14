import { describe, it, expect } from 'vitest';
import { parseCourseQuery } from './course.dto';

describe('Course DTO - Transformación de datos', () => {
  it('debe devolver un error si la fecha de inicio es inválida', () => {
    const queryInvalida = { startDateFrom: 'fecha-trucha' };
    const resultado = parseCourseQuery(queryInvalida);
    
    expect(resultado.isValid).toBe(false);
    expect(resultado.errors).toContain('startDateFrom no es una fecha válida');
  });

  it('debe pasar si los datos son correctos', () => {
    const queryValida = { startDateFrom: '2026-04-07' };
    const resultado = parseCourseQuery(queryValida);
    
    expect(resultado.isValid).toBe(true);
  });
});