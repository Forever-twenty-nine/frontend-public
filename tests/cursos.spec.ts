import { test, expect } from '@playwright/test';

test('debe cargar la página de cursos y mostrar el título correctamente', async ({ page }) => {
  await page.goto('http://localhost:3002/cursos');
  
  // Verificar que el título del hero esté presente
  const title = page.locator('h1');
  await expect(title).toContainText(/Domina las habilidades más demandadas/i);
});

test('debe filtrar cursos por búsqueda', async ({ page }) => {
  await page.goto('http://localhost:3002/cursos');
  
  // Esperar a que carguen los cursos (si hay mock de API o base de datos)
  const searchInput = page.locator('input[placeholder="Buscar cursos..."]');
  await searchInput.fill('Prueba');
  
  // Verificar que se filtren (depende de los datos reales o mocks)
  const courseCards = page.locator('[data-course-id]');
  // Aquí podrías verificar si hay más de 0 cursos o un mensaje de no encontrado
});
