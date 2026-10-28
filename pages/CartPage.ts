import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}