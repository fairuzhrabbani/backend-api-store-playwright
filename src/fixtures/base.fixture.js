import { test as base, expect } from "@playwright/test";

import { AuthAPI } from "../api/clients/auth.api.js";
import { ProductAPI } from "../api/clients/product.api.js";
import { CategoryAPI } from "../api/clients/category.api.js";
import { UsersAPI } from "../api/clients/users.api.js";
import { CartAPI } from "../api/clients/cart.api.js";

export const test = base.extend({
  authAPI: async ({ request }, use, testInfo) => {
    const authAPI = new AuthAPI(request, testInfo);
    await use(authAPI);
  },

  productAPI: async ({ request }, use, testInfo) => {
    const authAPI = new AuthAPI(request, testInfo);

    const loginResponse = await authAPI.login({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    const loginBody = await loginResponse.json();
    const token = loginBody.data.accessToken;

    const productAPI = new ProductAPI(request, token);

    await use(productAPI);
  },

  categoryAPI: async ({ request }, use, testInfo) => {
    const authAPI = new AuthAPI(request, testInfo);

    const loginResponse = await authAPI.login({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    const loginBody = await loginResponse.json();
    const token = loginBody.data.accessToken;

    const categoryAPI = new CategoryAPI(request, token);

    await use(categoryAPI);
  },

  usersAPI: async ({ request }, use, testInfo) => {
    const usersAPI = new UsersAPI(request, testInfo);
    await use(usersAPI);
  },

  cartAPI: async ({ request }, use, testInfo) => {
    const cartAPI = new CartAPI(request, testInfo);
    await use(cartAPI);
  },
});

export { expect };
