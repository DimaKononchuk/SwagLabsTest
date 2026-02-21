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

  expect(await inventoryPage.isInventoryPageVisible()).toBe(true);
});

test('login with empty username field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', process.env.STANDARD_PASSWORD!);
  
  expect(await loginPage.isErrorMessageVisible()).toBe(true);
  
  const errorMsg = await loginPage.getErrorMessage();
  expect(errorMsg).toContain('Username is required');
});

test('login with empty password field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER!, '');
  
  expect(await loginPage.isErrorMessageVisible()).toBe(true);
  
  const errorMsg = await loginPage.getErrorMessage();
  expect(errorMsg).toContain('Password is required');
});

test('login with both fields empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', '');
  
  expect(await loginPage.isErrorMessageVisible()).toBe(true);
  
  const errorMsg = await loginPage.getErrorMessage();
  expect(errorMsg).toContain('Username is required');
});

test('login with wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER!, 'wrong_password');
  
  expect(await loginPage.isErrorMessageVisible()).toBe(true);
  
  const errorMsg = await loginPage.getErrorMessage();
  expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');
});