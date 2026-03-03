import { Page, Locator } from '@playwright/test';

export class CartItem {
  private readonly page: Page;
  private readonly itemContainer: Locator;
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly productDescription: Locator;
  private readonly productQuantity: Locator;
  private readonly removeButton: Locator;

  constructor(page: Page, itemLocator: Locator) {
    this.page = page;
    this.itemContainer = itemLocator;
    this.productName = itemLocator.locator('.inventory_item_name');
    this.productPrice = itemLocator.locator('.inventory_item_price');
    this.productDescription = itemLocator.locator('.inventory_item_desc');
    this.productQuantity = itemLocator.locator('.cart_quantity');
    this.removeButton = itemLocator.locator('button[id^="remove-"]');
  }

  getName(): Locator {
    return this.productName;
  }

  getPrice(): Locator {
    return this.productPrice;
  }

  getQuantity(): Locator {
    return this.productQuantity;
  }

  async getDescription(): Promise<string | null> {
    return await this.productDescription.textContent();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async isVisible(): Promise<boolean> {
    return await this.itemContainer.isVisible();
  }
}
