import { Page, Locator, expect } from '@playwright/test';
import { ProductItem } from './components/ProductItem';
import { ProductItemList } from './components/ProductItemList';
import { SortOption, SortOptionLabel } from './enums/SortOption';

export class InventoryPage {
  private readonly page: Page;
  
  private readonly productItemList: ProductItemList;

  private readonly pageTitle: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartIcon: Locator;
  private readonly cartBadge: Locator;
  private readonly hamburgerMenu: Locator;
  private readonly logoutLink: Locator;
  private readonly aboutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItemList = new ProductItemList(page);
    
    this.pageTitle = page.locator('.title');
    this.sortDropdown = page.locator('select[data-test="product-sort-container"]');
    this.cartIcon = page.locator('a.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });
  }
  async isInventoryPageVisible(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }
  async expectCountItems(count: number): Promise<void> {
    const itemCount:number = await this.productItemList.getAllProductItemsLength();
    await expect(itemCount).toBe(count);
  }
  
  async isTitleContains(text: string): Promise<void> {
    const titleText = await this.pageTitle.textContent();
    await expect(titleText).toContain(text);
  }

  getProductItemList(): ProductItemList {
    return this.productItemList;

  }
  async sortByOption(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }
  
  async isCardBadgeContains(count: number): Promise<void> {
    const badgeText = await this.cartBadge.textContent();
    await expect(badgeText).toBe(count.toString());
  }

  async cardBadgeisHidden(): Promise<void> {
    await expect(this.cartBadge).toBeHidden();
  }
}
