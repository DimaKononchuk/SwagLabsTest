import { Locator, Page } from '@playwright/test';
import { ProductItem } from './ProductItem';

export class ProductItemList {
  private page: Page;

  private itemLocator: Locator;

  constructor(page:Page) {
    this.page = page;
    this.itemLocator = page.locator('[data-test="inventory-item"]');
  }

  async getProductItemById(index:number): Promise<ProductItem> {
    return await new ProductItem(this.page, this.itemLocator.nth(index));
  }

  async getAllProductItemsLength(): Promise<number> {
    return await this.itemLocator.count();
  }
}
