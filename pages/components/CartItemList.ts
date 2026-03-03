import { Locator, Page, expect } from '@playwright/test';
import { CartItem } from './CartItem';

export class CartItemList {
  private page: Page;
  private itemLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemLocator = page.locator('.cart_item');
  }

  getCartItemById(index: number): CartItem {
    return new CartItem(this.page, this.itemLocator.nth(index));
  }

  async getAllCartItemsLength(): Promise<number> {
    return await this.itemLocator.count();
  }
  
  async getAllCartItems(): Promise<CartItem[]> {
    const count = await this.itemLocator.count();
    const items: CartItem[] = [];

    for (let i = 0; i < count; i++) {
        items.push(this.getCartItemById(i));
    }

    return items;
  }

  async getAllProductNames(): Promise<string[]> {
    return new CartItem(this.page, this.itemLocator).getName().allTextContents();
  }

  async expectCartItemCount(count: number): Promise<void> {
    await expect(this.itemLocator).toHaveCount(count);
  }
}
