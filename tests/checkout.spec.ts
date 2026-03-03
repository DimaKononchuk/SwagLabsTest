import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutStepOnePage } from '../pages/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/checkoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

test.describe('E2E Buy Product Flow', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await inventoryPage.goto();
  });

  test('should successfully complete a buy order e2e flow', async ({ page }) => {
    
    const firstProduct = inventoryPage.getProductItemList().getProductItemById(0);
    await firstProduct.addToCart();
    await inventoryPage.isCardBadgeContains(1);

    await inventoryPage.clickShoppingCart();
    await cartPage.isCartPageVisible();
    await cartPage.getCartItemList().expectCartItemCount(1);
    
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.isPageVisible();
    await checkoutStepOnePage.fillInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.proceedToNextStep();

    await checkoutStepTwoPage.isPageVisible();
    await checkoutStepTwoPage.getCartItemList().expectCartItemCount(1);
    await checkoutStepTwoPage.finishCheckout();
    
    await checkoutCompletePage.isPageVisible();
    await checkoutCompletePage.expectCompleteHeader('Thank you for your order!');
    await checkoutCompletePage.expectCompleteText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    await checkoutCompletePage.goBackHome();
    await inventoryPage.isInventoryPageVisible();
  });
});
