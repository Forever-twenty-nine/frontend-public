import { test, expect } from '@playwright/test';

test.describe('Formulario de Solicitud de Cursos', () => {
  test.beforeEach(async ({ page }) => {
    // Ir a la página de cursos
    await page.goto('http://localhost:3002/cursos');
    // Hacer scroll hasta el formulario si es necesario
    await page.locator('section#request-course-section').scrollIntoViewIfNeeded();
  });

  test('debe mostrar errores de validación si los campos están vacíos', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /Solicitar Curso/i });
    
    // Intentar enviar sin completar nada
    await submitButton.click();

    // Verificar mensajes de error (basado en page.tsx)
    await expect(page.getByText(/Este campo es obligatorio/i).first()).toBeVisible();
    await expect(page.getByText(/El teléfono es obligatorio/i)).toBeVisible();
    await expect(page.getByText(/Por favor describe el curso que buscas/i)).toBeVisible();
  });

  test('debe validar el formato del correo electrónico', async ({ page }) => {
    // Primero intentamos enviar vacío para despertar la validación
    await page.getByRole('button', { name: /Solicitar Curso/i }).click();

    await page.locator('input#email').fill('correo-invalido');
    // Forzar el submit de nuevo con el valor inválido
    await page.getByRole('button', { name: /Solicitar Curso/i }).click();

    // Usar una espera más flexible para el texto
    await expect(page.locator('text="Correo electrónico inválido"').first()).toBeVisible();
  });

  test('debe validar la longitud mínima del mensaje', async ({ page }) => {
    await page.locator('textarea#message').fill('Corto');
    await page.getByRole('button', { name: /Solicitar Curso/i }).click();

    await expect(page.getByText(/La descripción debe tener al menos 20 caracteres/i)).toBeVisible();
  });

  test('debe permitir completar el formulario correctamente', async ({ page }) => {
    // Llenar campos
    await page.locator('input#name').fill('Usuario de Prueba');
    await page.locator('input#email').fill('prueba@ejemplo.com');
    await page.locator('input[placeholder="+54"]').fill('54');
    await page.locator('input#phoneNumber').fill('1123456789');
    await page.locator('textarea#message').fill('Este es un mensaje de prueba para solicitar un curso personalizado de robótica industrial.');

    // Verificar que el botón esté habilitado
    const submitButton = page.getByRole('button', { name: /Solicitar Curso/i });
    await expect(submitButton).toBeEnabled();
    
    // El envío real dependerá de si el backend está disponible o si se quiere hacer mocking
    // await submitButton.click();
    // await expect(page.getByText(/¡Solicitud enviada correctamente!/i)).toBeVisible();
  });
});
