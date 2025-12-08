import { test, expect } from "@playwright/test";

test.describe("Checkout", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.practicesoftwaretesting.com");
  });

  test("user can checkout", async ({ page }) => {
    await page.getByTestId("nav-home").click();

    await page.getByAltText("Combination Pliers").click();

    await page.getByTestId("add-to-cart").click();

    await expect(page.getByTestId("cart-quantity")).toHaveText("1");

    await page.getByTestId("nav-cart").click();

    await page.getByTestId("proceed-1").click();

    await expect(page.locator('p[class="ng-star-inserted"]')).toHaveText(
      "Hello Jane Doe, you are already logged in. You can proceed to checkout."
    );

    await page.getByTestId("proceed-2").click();

    await page.getByTestId("state").fill("mystate");

    await page.getByTestId("postal_code").fill("VV132R");

    await page.getByTestId("proceed-3").click();

    await page.getByTestId("payment-method").selectOption("Cash on Delivery");

    await page.getByTestId("finish").click();

    await expect(page.getByTestId("payment-success-message")).toHaveText(
      "Payment was successful"
    );

    await page.waitForLoadState("networkidle");

    await page.getByTestId("finish").click();

    await expect(page.locator('div[id="order-confirmation"]')).toContainText(
      "Thanks for your order! Your invoice number is "
    );

    await page.waitForLoadState("networkidle");

    await expect(
      page.locator("toast-top-right toast-container")
    ).not.toBeVisible({ timeout: 10_000 });

    await expect(page).toHaveScreenshot("payment-success.png", {
      mask: [
        page.getByTitle("Practice Software Testing - Toolshop"),
        page.locator("toast-top-right toast-container"),
        page.locator('div[id="order-confirmation"] > span'),
      ],
      maxDiffPixels: 200
    });
  });
});
