import { Locator, Page, expect } from '@playwright/test';
import { ProductItem } from './ProductItem';

export class ProductItemList {
  private page: Page;

  private itemLocator: Locator;

  constructor(page:Page) {
    this.page = page;
    this.itemLocator = page.locator('[data-test="inventory-item"]');
  }

  getProductItemById(index:number): ProductItem {
    return new ProductItem(this.page, this.itemLocator.nth(index));
  }

  async getAllProductItemsLength(): Promise<number> {
    return await this.itemLocator.count();
  }

  async expectNameZA(): Promise<void> {
    const names = await this.itemLocator.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  }

  async expectNameAZ(): Promise<void> {
    const names = await this.itemLocator.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  }

  async expectPriceLowHigh(): Promise<void> {
    const prices = await this.itemLocator.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  }
  async expectPriceHighLow(): Promise<void> {
    const prices = await this.itemLocator.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(sortedPrices);
  }
}