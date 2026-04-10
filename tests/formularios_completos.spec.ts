import { test, expect } from "@playwright/test";

test.describe("Validación de Formularios de Solicitud y Propuesta", () => {
  
  test("1. Formulario Home (Solicitar un curso personalizado)", async ({ page }) => {
    await page.route("**/businessTraining/createBusinessTraining", async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ 
          success: true, 
          message: "¡Gracias por tu mensaje!" 
        }),
      });
    });

    await page.goto("/");
    
    await page.locator("input#name").fill("Federico Auditor");
    await page.locator("input#email").fill("auditor@test.com");
    await page.locator("input[placeholder='+54']").fill("+54");
    await page.locator("input#phoneNumber").fill("1123456789");
    await page.locator("textarea#message").fill("Auditoría final.");

    await page.getByRole("button", { name: /Enviar solicitud/i }).click();

    await expect(page.locator("body")).toContainText(/Solicitud enviada correctamente|Gracias por tu mensaje/i, { timeout: 15000 });
  });

  test("2. Formulario Sección Cursos", async ({ page }) => {
    await page.goto("/cursos");
    const section = page.locator("#request-course-section");
    await section.scrollIntoViewIfNeeded();
    await section.locator("button:has-text('Solicitar Curso')").first().click();
    await expect(page.locator("text=Este campo es obligatorio").first()).toBeVisible();
  });

  test("3. Formulario Capacitaciones Empresas", async ({ page }) => {
    await page.goto("/capacitaciones-empresas");
    await expect(page.locator("form").first()).toBeVisible();
  });

  test("4. Formulario Quiero Capacitar (Postulación)", async ({ page }) => {
    await page.goto("/quiero-capacitar");
    await expect(page.getByRole("button", { name: /Enviar Propuesta/i })).toBeVisible();
  });
});