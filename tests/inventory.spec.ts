import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { InventoryPage } from '../pages/inventoryPage';
import { ProductItem } from '../pages/components/ProductItem';
import { SortOption } from '../pages/enums/SortOption';

dotenv.config();

test.describe('Inventory Page Tests', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    expect(await inventoryPage.isInventoryPageVisible()).toBe(true);
  });

  test('verify inventory page displays correct number of products', async () => {
    await inventoryPage.expectCountItems(6);
  });
  

  test('verify inventory page title', async () => {
    await inventoryPage.isTitleContains('Products');
  });

  test('verify products item ', async () => {
    const productItem:ProductItem= inventoryPage.getProductItemList().getProductItemById(0);   
    await productItem.isVisible();
    
  });

  test('verify sort products by name Z to A', async () => {
    await inventoryPage.sortByOption(SortOption.NAME_ZA);
    await inventoryPage.getProductItemList().expectNameZA();
  })

  test('verify sort products by name A to Z', async () => {
    await inventoryPage.sortByOption(SortOption.NAME_AZ);
    await inventoryPage.getProductItemList().expectNameAZ
  })

  test('verify sort products by price low to high', async () => {
    await inventoryPage.sortByOption(SortOption.PRICE_LOW_HIGH);
    await inventoryPage.getProductItemList().expectPriceLowHigh();
  })
  
   test('verify sort products by price high to low', async () => {
    await inventoryPage.sortByOption(SortOption.PRICE_HIGH_LOW);
    await inventoryPage.getProductItemList().expectPriceHighLow();
  })

  test('verify add and remove product from cart', async () => {
    const productItem1:ProductItem= inventoryPage.getProductItemList().getProductItemById(0);
    const productItem3:ProductItem= inventoryPage.getProductItemList().getProductItemById(2);      
    await productItem1.addToCart();
    await inventoryPage.isCardBadgeContains(1);
    
    await productItem3.addToCart();
    await inventoryPage.isCardBadgeContains(2);
    
    await productItem1.removeFromCart();
    await inventoryPage.isCardBadgeContains(1);
    
    await productItem3.removeFromCart();
    await inventoryPage.cardBadgeisHidden();
  });
});
