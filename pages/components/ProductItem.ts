import { Page, Locator } from '@playwright/test';

export class ProductItem {
  private readonly page: Page;
  private readonly itemContainer: Locator;
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly productImage: Locator;
  private readonly productDescription: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;

  constructor(page: Page, itemLocator: Locator) {
    this.page = page;
    this.itemContainer = itemLocator;
    this.productName = itemLocator.locator('[data-test="inventory-item-name"]');
    this.productPrice = itemLocator.locator('[data-test="inventory-item-price"]');
    this.productImage = itemLocator.locator('.inventory_item_img');
    this.productDescription = itemLocator.locator('[data-test="inventory-item-desc"]');
    this.addToCartButton = itemLocator.locator('[data-test*="add-to-cart"]');
    this.removeButton = itemLocator.locator('[data-test*="remove"]');
  }

  async getName(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async getDescription(): Promise<string | null> {
    return await this.productDescription.textContent();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async isVisible(): Promise<boolean> {
    return await this.itemContainer.isVisible();
  }

  async click(): Promise<void> {
    await this.itemContainer.click();
  }

  async isAddToCartButtonVisible(): Promise<boolean> {
    return await this.addToCartButton.isVisible();
  }

  async isRemoveButtonVisible(): Promise<boolean> {
    return await this.removeButton.isVisible();
  }

  async getProduct(): Promise<{
    name: string | null;
    price: string | null;
    description: string | null;
  }> {
    return {
      name: await this.getName(),
      price: await this.getPrice(),
      description: await this.getDescription(),
    };
  }
}
