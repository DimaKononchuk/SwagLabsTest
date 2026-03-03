import { Page, Locator, expect } from '@playwright/test';
import { CartItemList } from './components/CartItemList';

export class CheckoutStepTwoPage {
  private readonly page: Page;
  private readonly pageTitle: Locator;
  private readonly cartItemList: CartItemList;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItemList = new CartItemList(page);
    this.finishButton = page.locator('#finish');
  }

  async isPageVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async expectTitle(title: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(title);
  }

  getCartItemList(): CartItemList {
    return this.cartItemList;
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
