import { test, expect } from "@playwright/test";
import { request } from "http";
test("GET /products", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.get(apiUrl + "/products");

  expect(response.status()).toEqual(200);
  const body = await response.json();

  expect(body.data).toHaveLength(9);
  expect(body.total).toEqual(5);
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
