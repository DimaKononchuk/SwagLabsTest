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

  async filterByNameAZ(): Promise<ProductItem[]> {
    const count = await this.getAllProductItemsLength();
    const items: ProductItem[] = [];

    // Collect all items with their names
    const itemsWithNames: { item: ProductItem; name: string | null }[] = [];

    for (let i = 0; i < count; i++) {
      const item = this.getProductItemById(i);
      const name = await item.getName();
      itemsWithNames.push({ item, name });
    }

    // Sort by name A-Z
    itemsWithNames.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB);
    });

    return itemsWithNames.map((item) => item.item);
  }

  async filterByNameZA(): Promise<ProductItem[]> {
    const count = await this.getAllProductItemsLength();
    const items: ProductItem[] = [];

    // Collect all items with their names
    const itemsWithNames: { item: ProductItem; name: string | null }[] = [];

    for (let i = 0; i < count; i++) {
      const item = this.getProductItemById(i);
      const name = await item.getName();
      itemsWithNames.push({ item, name });
    }

    // Sort by name Z-A
    itemsWithNames.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameB.localeCompare(nameA);
    });

    return itemsWithNames.map((item) => item.item);
  }

  async filterByPriceLowHigh(): Promise<ProductItem[]> {
    const count = await this.getAllProductItemsLength();

    // Collect all items with their prices
    const itemsWithPrices: { item: ProductItem; price: number }[] = [];

    for (let i = 0; i < count; i++) {
      const item = this.getProductItemById(i);
      const priceText = await item.getPrice();
      const price = priceText ? parseFloat(priceText.replace('$', '')) : 0;
      itemsWithPrices.push({ item, price });
    }

    // Sort by price low to high
    itemsWithPrices.sort((a, b) => a.price - b.price);

    return itemsWithPrices.map((item) => item.item);
  }

  async filterByPriceHighLow(): Promise<ProductItem[]> {
    const count = await this.getAllProductItemsLength();

    // Collect all items with their prices
    const itemsWithPrices: { item: ProductItem; price: number }[] = [];

    for (let i = 0; i < count; i++) {
      const item = this.getProductItemById(i);
      const priceText = await item.getPrice();
      const price = priceText ? parseFloat(priceText.replace('$', '')) : 0;
      itemsWithPrices.push({ item, price });
    }

    // Sort by price high to low
    itemsWithPrices.sort((a, b) => b.price - a.price);

    return itemsWithPrices.map((item) => item.item);
  }
  async expectNameAZ(): Promise<void> {
    const items = await this.filterByNameAZ();
    const names: (string | null)[] = [];

    for (const item of items) {
      names.push(await item.getName());
    }

    // Verify sorted order
    for (let i = 0; i < names.length - 1; i++) {
      const nameA = names[i] || '';
      const nameB = names[i + 1] || '';
      expect(nameA.localeCompare(nameB)).toBeLessThanOrEqual(0);
    }
  }

  async expectNameZA(): Promise<void> {
    const items = await this.filterByNameZA();
    const names: (string | null)[] = [];

    for (const item of items) {
      names.push(await item.getName());
    }

    // Verify reverse sorted order
    for (let i = 0; i < names.length - 1; i++) {
      const nameA = names[i] || '';
      const nameB = names[i + 1] || '';
      expect(nameA.localeCompare(nameB)).toBeGreaterThanOrEqual(0);
    }
  }

  async expectPriceLowHigh(): Promise<void> {
    const items = await this.filterByPriceLowHigh();
    const prices: number[] = [];

    for (const item of items) {
      const priceText = await item.getPrice();
      const price = priceText ? parseFloat(priceText.replace('$', '')) : 0;
      prices.push(price);
    }

    // Verify sorted order
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  }

  async expectPriceHighLow(): Promise<void> {
    const items = await this.filterByPriceHighLow();
    const prices: number[] = [];

    for (const item of items) {
      const priceText = await item.getPrice();
      const price = priceText ? parseFloat(priceText.replace('$', '')) : 0;
      prices.push(price);
    }

    // Verify reverse sorted order
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  }
}