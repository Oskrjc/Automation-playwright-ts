import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async fillInfo(firstName: string, lastName: string, zip: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zip);
  }

  async continue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }
}