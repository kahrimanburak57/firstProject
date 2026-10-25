import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory\.html/);
});

test('ilk ürünü sepete ekler', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addFirstProductToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('farklı ürünleri sepete ekler', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.addSecondProductToCart();

  await expect(inventoryPage.cartBadge).toHaveText('2');
});

test('ürünü sepetten çıkarır', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addFirstProductToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.removeFirstProductFromCart();
  await expect(inventoryPage.cartBadge).toHaveCount(0);
});