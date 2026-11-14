import { request as playwrightRequest } from "@playwright/test";

import { test as base, expect } from "./base.fixture.js";

import { AuthAPI } from "../api/clients/auth.api.js";
// import { ProductAPI } from "../api/clients/product.api.js";
// import { CategoryAPI } from "../api/clients/category.api.js";
// import { UsersAPI } from "../api/clients/users.api.js";
import { CartAPI } from "../api/clients/cart.api.js";

async function createAuthenticatedAPIs(request, email, password, testInfo) {
  const authAPI = new AuthAPI(request, testInfo);

  const loginResponse = await authAPI.login({
    email,
    password,
  });

  if (!loginResponse.ok()) {
    throw new Error(`Login failed: ${loginResponse.status()} - ${await loginResponse.text()}`);
  }

  const loginBody = await loginResponse.json();
  const token = loginBody.data.accessToken;

  const cartAPI = new CartAPI(request, token, testInfo);

  // const authenticatedRequest = await playwrightRequest.newContext({
  //   extraHTTPHeaders: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // });

  return {
    token,
    // productAPI: new ProductAPI(authenticatedRequest, token, testInfo),
    // categoryAPI: new CategoryAPI(authenticatedRequest, token, testInfo),
    // usersAPI: new UsersAPI(authenticatedRequest, token, testInfo),
    cartAPI,
    // dispose: () => authenticatedRequest.dispose(),
  };
}

export const test = base.extend({
  admin: async ({ request }, use, testInfo) => {
    const adminAPIs = await createAuthenticatedAPIs(
      request,
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD,
      testInfo,
    );

    await use(adminAPIs);
  },

  user: async ({ request }, use, testInfo) => {
    const userAPIs = await createAuthenticatedAPIs(
      request,
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
      testInfo,
    );

    await use(userAPIs);
  },
});

export { expect };
