import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly emailInput = (): Locator =>
    this.page.locator('[data-test="email"]');

  private readonly passwordInput = (): Locator =>
    this.page.locator('[data-test="password"]');
  private readonly loginButton = (): Locator =>
    this.page.locator('[data-test="login-submit"]');

  public async login(args: { email: string; password: string }) {
    await this.emailInput().fill(args.email);
    await this.emailInput().press("Tab");
    await this.passwordInput().fill(args.password);
    await this.passwordInput().press("Tab");
    await this.loginButton().click();
  }

  public async goTo() {
    await this.page.goto("/auth/login");
  }
}
