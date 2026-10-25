import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('hatalı girişte hata mesajı gösterir', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'wrong_password');

  await expect(loginPage.errorMessage).toContainText(
    'Username and password do not match',
  );
});