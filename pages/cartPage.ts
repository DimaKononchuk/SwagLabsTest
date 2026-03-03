import { Page, Locator, expect } from '@playwright/test';
import { CartItemList } from './components/CartItemList';

export class CartPage {
  private readonly page: Page;
  private readonly pageTitle: Locator;
  private readonly cartItemList: CartItemList;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItemList = new CartItemList(page);
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html', { waitUntil: 'domcontentloaded' });
  }

  async isCartPageVisible(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }

  async expectTitle(title: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(title);
  }

  getCartItemList(): CartItemList {
    return this.cartItemList;
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
