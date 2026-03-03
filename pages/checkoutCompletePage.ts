import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly page: Page;
  private readonly pageTitle: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async isPageVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async expectTitle(title: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(title);
  }

  async expectCompleteHeader(text: string): Promise<void> {
    await expect(this.completeHeader).toHaveText(text);
  }

  async expectCompleteText(text: string): Promise<void> {
    await expect(this.completeText).toHaveText(text);
  }

  async goBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
