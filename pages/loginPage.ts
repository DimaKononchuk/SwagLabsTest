import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('input[name="user-name"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async fillUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async expectErrorMessageToBe(expectedMessage: string) {
    await this.isErrorMessageVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
