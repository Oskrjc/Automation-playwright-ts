import { test, expect } from '@playwright/test';

// Se ejecuta antes de cada test: deja la sesión iniciada en el inventario
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
});

test('agregar un producto actualiza el contador del carrito', async ({ page }) => {
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

test('quitar un producto deja el carrito sin contador', async ({ page }) => {
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('button', { name: 'Remove' }).click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
});

test('compra completa muestra la confirmación', async ({ page }) => {
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('QA');
  await page.getByPlaceholder('Zip/Postal Code').fill('8320000');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    'Thank you for your order!'
  );
});