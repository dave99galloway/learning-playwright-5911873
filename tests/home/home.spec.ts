import { test, expect } from "@playwright/test";
import { generateProductResponse } from "../../datafactory/products";

test.describe("Home Page", () => {
  test.describe("With anonymous user", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://practicesoftwaretesting.com");
    });

    test("visual test", async ({ page }) => {
      page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot("home-page-no-auth.png", {
        mask: [page.getByTitle("Practice Software Testing - Toolshop")],
      });
    });

    test("Has sign in link", async ({ page }) => {
      await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });

    test("Has page title", async ({ page }) => {
      await expect(page).toHaveTitle(
        "Practice Software Testing - Toolshop - v5.0",
      );
    });

    test("Has 9 items loaded by default", async ({ page }) => {
      const productGrid = page.locator(".col-md-9");

      await expect(productGrid.getByRole("link")).toHaveCount(9);
      expect(await productGrid.getByRole("link").count()).toBe(9);
    });

    test("Search finds Thor's Hammer", async ({ page, isMobile }) => {
      const productGrid = page.locator(".col-md-9");
      if (isMobile) await page.getByRole("button", { name: "Filters" }).click();
      await page.getByTestId("search-query").fill("Thor Hammer");
      await page.getByTestId("search-submit").click();
      await expect(productGrid.getByRole("link")).toHaveCount(1);

      await expect(productGrid.getByRole("link")).toContainText("Thor Hammer");
      await expect(
        productGrid.getByRole("link").nth(0).getByAltText("Thor Hammer"),
      ).toBeVisible();
    });
  });
  test.describe("With customer 01 logged in", () => {
    test.use({ storageState: ".auth/customer01.json" });
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.practicesoftwaretesting.com");
    });

    test("visual test", async ({ page }) => {
      await expect(page).toHaveScreenshot("home-page-no-customer01.png", {
        mask: [page.getByTitle("Practice Software Testing - Toolshop")],
      });
    });

    test("Customer 01 should be logged in", async ({ page }) => {
      await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
      await expect(page.locator('[data-test="nav-menu"]')).toContainText(
        "Jane Doe",
      );
    });

    test("Validate Product data is visible in UI from API", async ({
      page,
    }) => {
      let products: any;
      await test.step("intercept /products", async () => {
        await page.route(
          "https://api.practicesoftwaretesting.com/products**",
          async (route) => {
            const response = await route.fetch();
            products = await response.json();
            route.continue();
          },
        );
      });
      const responsePromise = page.waitForResponse(
        "https://api.practicesoftwaretesting.com/products**",
      );
      await page.goto("/");
      await responsePromise;

      const productGrid = page.locator(".col-md-9");

      for (const product of products.data) {
        await expect(productGrid).toContainText(product.name);
        await expect(productGrid).toContainText(product.price.toString());
      }
    });
  });

  test("validate product data is visible from modified API", async ({
    page,
  }) => {
    await test.step("overwrite /products", async () => {
      await page.route(
        "https://api.practicesoftwaretesting.com/products**",
        async (route) => {
          const response = await route.fetch();
          const json = await response.json();
          json.data[0]["name"] = "Mocked Product";
          json.data[0]["price"] = 100000.01;
          json.data[0]["in_stock"] = false;

          await route.fulfill({ response, json });
        },
      );
    });
    const responsePromise = page.waitForResponse(
      "https://api.practicesoftwaretesting.com/products**",
    );
    await page.goto("/");
    await responsePromise;

    const productGrid = page.locator(".col-md-9");

    const firstProduct = productGrid.getByRole("link").first();
    await expect(firstProduct).toContainText("Mocked Product");
    await expect(firstProduct).toContainText("100000.01");
    await expect(firstProduct).toContainText("Out of stock");
  });

  test("validate product data is loaded from har file", async ({ page }) => {
    //
    await page.routeFromHAR(".hars/product.har", {
      url: "https://api.practicesoftwaretesting.com/products**",
      update: false,
    });
    page.goto("/");
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid).toContainText("Happy Path Pliers");
    await expect(productGrid).toContainText("$1.99");
  });

  test("validate product data is loaded from mock data", async ({ page }) => {
    await page.route(
      "https://api.practicesoftwaretesting.com/products**",
      async (route) => {
        await route.fulfill({
          json: generateProductResponse(),
        });
      },
    );
    await page.goto("/");
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid).toContainText("Mocked Path Pliers");
    await expect(productGrid).toContainText("$11.99");
  });
});
