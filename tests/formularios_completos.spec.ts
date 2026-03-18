import { test, expect } from "@playwright/test";

test.describe("Validación de Formularios de Solicitud y Propuesta", () => {

  test("1. Formulario Home (Solicitar un curso personalizado)", async ({ page }) => {
    await page.goto("/");
    await page.locator("text=Solicitar un curso personalizado").scrollIntoViewIfNeeded();
    
    const submitBtn = page.getByRole("button", { name: /Solicitar Curso|Enviar/i });
    await submitBtn.click();
    
    // Verificación de errores de validación (campos requeridos)
    await expect(page.locator("text=Este campo es obligatorio").first()).toBeVisible();
    
    await page.locator("input#name").fill("Test Home");
    await page.locator("input#email").fill("test@home.com");
  });

  test("2. Formulario Sección Cursos", async ({ page }) => {
    await page.goto("/cursos");
    const section = page.locator("#request-course-section");
    await section.scrollIntoViewIfNeeded();
    
    const submitBtn = section.locator("button:has-text(\"Solicitar Curso\")").first();
    await submitBtn.click();
    
    await expect(page.getByText(/Este campo es obligatorio/i).first()).toBeVisible();
    await section.locator("input#name").fill("Test Cursos");
    await section.locator("input#email").fill("test@cursos.com");
  });

  test("3. Formulario Capacitaciones Empresas", async ({ page }) => {
    await page.goto("/capacitaciones-empresas");
    await page.keyboard.press("End");
    
    const form = page.locator("form").first();
    await form.scrollIntoViewIfNeeded();
    
    await expect(form.locator("button[type=\"submit\"]")).toBeVisible();
  });

  test("4. Formulario Quiero Capacitar (Postulación)", async ({ page }) => {
    await page.goto("/quiero-capacitar");
    await page.locator("#postulate").scrollIntoViewIfNeeded();
    
    const submitBtn = page.getByRole("button", { name: /Enviar Propuesta/i });
    await submitBtn.click();
    
    await expect(page.locator("text=Este campo es obligatorio").first()).toBeVisible();
  });

});
