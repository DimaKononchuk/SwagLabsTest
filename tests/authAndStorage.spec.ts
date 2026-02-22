import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import fs from 'fs';
import path from 'path';

dotenv.config();

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test('authorize user and save local storage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  
  await loginPage.goto();
  await loginPage.login(
    process.env.STANDARD_USER!,
    process.env.STANDARD_PASSWORD!
  );

  await inventoryPage.isInventoryPageVisible();

  await page.context().storageState({ path: authFile });
});

