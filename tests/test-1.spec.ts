import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Community" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Playwright Samples" }).click();
  const page1 = await page1Promise;
  await page1.getByRole("link", { name: "Playwright - Clock API" }).click();
  await expect(page1.getByRole("heading")).toContainText(
    "Playwright - Clock API"
  );
});
