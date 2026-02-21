import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
  }

  async isInventoryPageVisible(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }
}
