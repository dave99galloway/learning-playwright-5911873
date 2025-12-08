import { test, expect, APIResponse } from "@playwright/test";
import { request } from "http";

test.describe("Products API", () => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  var response: APIResponse;

  test.beforeEach(async ({ request }) => {
    response = await request.get(apiUrl + "/products");
  });

  test("GET /products", async () => {
    expect(response.status()).toEqual(200);
    const body = await response.json();

    expect(body.data).toHaveLength(9);
    expect(body.total).toEqual(50);
  });

  test("GET /products/{id}", async ({ request }) => {
    const body = await response.json();
    const productIdResponse = await request.get(
      apiUrl + "/products/" + body.data[0].id
    );

    const prod = await productIdResponse.json()

    expect(prod.brand).toEqual(body.data[0].brand);
  });
});

test("POST /users/login", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.post(apiUrl + "/users/login", {
    data: {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
    },
  });

  expect(response.status()).toEqual(200);
  const body = await response.json();

  expect(body.access_token).toBeTruthy();
  expect(body.token_type).toEqual("bearer");
  expect(body.expires_in).toEqual(300);
});
