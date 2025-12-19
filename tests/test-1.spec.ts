import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Recording...
  await page.goto("");

  await page.getByTestId("nav-sign-in").click();

  await page.getByTestId("register-link").click();

  await page.getByTestId("first-name").fill("Customer");

  await page.getByTestId("last-name").fill("One");

  await page.getByTestId("dob").fill("1980-12-01");

  await page.getByTestId("street").fill("Sesame");

  await page.getByTestId("postal_code").fill("E17 6rh");

  await page.getByTestId("city").fill("london");

  await page.getByTestId("state").fill("london");

  await page.getByTestId("country").selectOption("GB");

  await page.getByTestId("phone").fill("07123123456");

  await page.getByTestId("email").fill("a4@b.com");
  await page.getByTestId("email").press("Tab");

  await page.getByTestId("password").fill("1This@wesome9assw0rd?");

  await page.getByTestId("register-submit").click();
});
