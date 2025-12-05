import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.describe("With anonymous user", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://practicesoftwaretesting.com");
    });

    test("Has sign in link", async ({ page }) => {
      await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });

    test("Has page title", async ({ page }) => {
      await expect(page).toHaveTitle(
        "Practice Software Testing - Toolshop - v5.0"
      );
    });

    test("Has 9 items loaded by default", async ({ page }) => {
      const productGrid = page.locator(".col-md-9");

      await expect(productGrid.getByRole("link")).toHaveCount(9);
      expect(await productGrid.getByRole("link").count()).toBe(9);
    });

    test("Search finds Thor's Hammer", async ({ page }) => {
      const productGrid = page.locator(".col-md-9");

      await page.getByTestId("search-query").fill("Thor Hammer");
      await page.getByTestId("search-submit").click();
      await expect(productGrid.getByRole("link")).toHaveCount(1);

      await expect(productGrid.getByRole("link")).toContainText("Thor Hammer");
      await expect(
        productGrid.getByRole("link").nth(0).getByAltText("Thor Hammer")
      ).toBeVisible();
    });
  });
  test.describe("With customer 01 logged in", () => {
    test.use({ storageState: ".auth/customer01.json" });
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.practicesoftwaretesting.com");
    });

    test("Customer 01 should be logged in", async ({ page }) => {
      await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
      await expect(page.locator('[data-test="nav-menu"]')).toContainText(
        "Jane Doe"
      );
    });
  });
});
