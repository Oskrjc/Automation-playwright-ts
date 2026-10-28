import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('agregar un producto actualiza el contador del carrito', async ({ page }) => {
  const inventory = new InventoryPage(page);

  await inventory.addFirstProduct();

  await expect(inventory.cartBadge).toHaveText('1');
});

test('quitar un producto deja el carrito sin contador', async ({ page }) => {
  const inventory = new InventoryPage(page);

  await inventory.addFirstProduct();
  await inventory.removeProduct();

  await expect(inventory.cartBadge).toHaveCount(0);
});

test('compra completa muestra la confirmación', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await inventory.addFirstProduct();
  await inventory.openCart();
  await cart.checkout();
  await checkout.fillInfo('Test', 'QA', '8320000');
  await checkout.continue();
  await checkout.finish();

  await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
});