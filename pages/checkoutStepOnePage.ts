import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepOnePage {
  private readonly page: Page;
  private readonly pageTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async isPageVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async expectTitle(title: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(title);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async proceedToNextStep(): Promise<void> {
    await this.continueButton.click();
  }

  async expectErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
