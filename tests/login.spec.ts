import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('login exitoso con standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(inventory.items.first()).toBeVisible();
});

test('login con contraseña incorrecta muestra error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'clave_incorrecta');

  await expect(loginPage.error).toContainText('Username and password do not match');
});

test('usuario bloqueado no puede ingresar', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.error).toContainText('this user has been locked out');
});