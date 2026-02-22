import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { InventoryPage } from '../pages/inventoryPage';

dotenv.config();

test.describe('Inventory Page Tests', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('verify inventory page displays correct number of products', async () => {
    await inventoryPage.expectCountItems(6);
  });

  
});
