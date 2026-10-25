import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly firstProductAddToCartButton: Locator;
  readonly secondProductAddToCartButton: Locator;
  readonly removeFirstProductButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.firstProductAddToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.secondProductAddToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
    );
    this.removeFirstProductButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addFirstProductToCart(): Promise<void> {
    await this.firstProductAddToCartButton.click();
  }

  async addSecondProductToCart(): Promise<void> {
    await this.secondProductAddToCartButton.click();
  }

  async removeFirstProductFromCart(): Promise<void> {
    await this.removeFirstProductButton.click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.count() === 0) {
      return 0;
    }

    return Number(await this.cartBadge.innerText());
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}