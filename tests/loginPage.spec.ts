import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

dotenv.config();

test('successful login with standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login(
    process.env.STANDARD_USER!,
    process.env.STANDARD_PASSWORD!
  );

  await inventoryPage.isInventoryPageVisible();
});
