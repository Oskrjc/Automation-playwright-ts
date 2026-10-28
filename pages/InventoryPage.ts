import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addFirstProduct() {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async removeProduct() {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}