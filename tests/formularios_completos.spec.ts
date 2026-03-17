import { test, expect } from "@playwright/test";

test.describe("Verificación de los 4 formularios principales", () => {

  test("1. Formulario Home", async ({ page }) => {
    await page.goto("http://localhost:3002/");
    await page.locator("text=Solicitar un curso personalizado").scrollIntoViewIfNeeded();
    const submitBtn = page.getByRole("button", { name: /Solicitar Curso|Enviar/i });
    await submitBtn.click();
    await expect(page.locator("text=Este campo es obligatorio").first()).toBeVisible();
    await page.locator("input#name").fill("Test Home");
    await page.locator("input#email").fill("test@home.com");
  });

  test("2. Formulario Cursos", async ({ page }) => {
    await page.goto("http://localhost:3002/cursos");
    const section = page.locator("#request-course-section");
    await section.scrollIntoViewIfNeeded();
    const submitBtn = section.locator("button:has-text(\"Solicitar Curso\")").first();
    await submitBtn.click();
    await expect(page.getByText(/Este campo es obligatorio/i).first()).toBeVisible();
    await section.locator("input#name").fill("Test Cursos");
    await section.locator("input#email").fill("test@cursos.com");
  });

  test("3. Formulario Empresas", async ({ page }) => {
    await page.goto("http://localhost:3002/capacitaciones-empresas");
    await page.keyboard.press("End");
    const form = page.locator("form").first();
    await form.scrollIntoViewIfNeeded();
    await expect(form.locator("button[type=\"submit\"]")).toBeVisible();
  });

  test("4. Formulario Quiero Capacitar", async ({ page }) => {
    await page.goto("http://localhost:3002/quiero-capacitar");
    await page.locator("#postulate").scrollIntoViewIfNeeded();
    const submitBtn = page.getByRole("button", { name: /Enviar Propuesta/i });
    await submitBtn.click();
    await expect(page.locator("text=Este campo es obligatorio").first()).toBeVisible();
  });

});
