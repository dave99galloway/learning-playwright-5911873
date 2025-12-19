import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/login.page";
import { registerUser } from "../../datafactory/register";

test.use({ storageState: ".auth/customer01.json" });

test("login with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login({
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
  });
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe"
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});

test("login without page object", async ({ page }) => {
  await page.goto("https://www.practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  await page.locator('[data-test="email"]').press("Tab");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe"
  );
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe"
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});

test("login with new user", async ({ page }) => {
  const newUserEmail = `dg-start-essentials-training${Date.now()}@practicesoftwaretesting.com`;
  const newUserPassword = "1This@wesome9assw0rd?";

  await registerUser(newUserEmail, newUserPassword);

  const loginPage = new LoginPage(page);
  await loginPage.goTo();

  await loginPage.login({
    email: newUserEmail,
    password: newUserPassword,
  });
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Customer One"
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});
