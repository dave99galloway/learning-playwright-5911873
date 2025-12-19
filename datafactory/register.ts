import { expect, request } from "@playwright/test";

export async function registerUser(email: string, password: string) {
  const createRequestContext = await request.newContext();
  const apiUrl = process.env.API_URL;
  expect(apiUrl).not.toBeUndefined();
  const response = await createRequestContext.post(apiUrl + "/users/register", {
    data: {
      first_name: "Customer",
      last_name: "One",
      dob: "1980-12-01",
      phone: "07123123456",
      email: email,
      password: password,
      address: {
        street: "Sesame",
        city: "london",
        state: "london",
        country: "GB",
        postal_code: "E17 6RH",
      },
    },
  });
  expect(response.status()).toBe(201);
  return response.status();
}
