import { test, expect } from "@playwright/test";

test("Home", async ({ page }) => {
  await page.goto("http://practicesoftwaretesting.com");

  await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

  const productGrid = page.locator(".col-md-9");

  await expect(productGrid.getByRole("link")).toHaveCount(9);
  expect(await productGrid.getByRole("link").count()).toBe(9);

  await page.getByTestId("search-query").fill("Thor Hammer");
  await page.getByTestId("search-submit").click();
  await expect(productGrid.getByRole("link")).toHaveCount(1);

  await expect(productGrid.getByRole("link")).toContainText("Thor Hammer");
  await expect(
    productGrid.getByRole("link").nth(0).getByAltText("Thor Hammer")
  ).toBeVisible();
});
