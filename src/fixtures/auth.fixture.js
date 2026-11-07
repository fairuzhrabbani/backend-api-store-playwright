import { test as base, expect } from "./base.fixture.js";

import { AuthAPI } from "../api/clients/auth.api.js";
import { ProductAPI } from "../api/clients/product.api.js";
import { CategoryAPI } from "../api/clients/category.api.js";
import { UsersAPI } from "../api/clients/users.api.js";
import { CartAPI } from "../api/clients/cart.api.js";

async function createAuthenticatedAPIs(request, email, password) {
  const authAPI = new AuthAPI(request);

  const loginResponse = await authAPI.login({
    email,
    password,
  });

  if (!loginResponse.ok()) {
    throw new Error(`Login failed: ${loginResponse.status()} - ${await loginResponse.text()}`);
  }

  const loginBody = await loginResponse.json();
  const token = loginBody.data.accessToken;

  const authenticatedRequest = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return {
    token,
    productAPI: new ProductAPI(authenticatedRequest),
    categoryAPI: new CategoryAPI(authenticatedRequest),
    usersAPI: new UsersAPI(authenticatedRequest),
    cartAPI: new CartAPI(authenticatedRequest),
    dispose: () => authenticatedRequest.dispose(),
  };
}

export const test = base.extend({
  admin: async ({ request }, use) => {
    const apis = await createAuthenticatedAPIs(
      request,
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD,
    );

    try {
      await use(apis);
    } finally {
      await apis.dispose();
    }
  },

  user: async ({ request }, use) => {
    const apis = await createAuthenticatedAPIs(
      request,
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );

    try {
      await use(apis);
    } finally {
      await apis.dispose();
    }
  },
});

export { expect };
