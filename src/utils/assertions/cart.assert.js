import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class CartAssertions {
  static async assertAddProductCartSuccess(responseBody, expectedMessage, expectedCart) {
    // Business Response Validation
    await allure.step("Verify Add Product Cart success response", async () => {
      expect(responseBody.success, "Cart response should indicate success").toBe(true);
      expect(
        responseBody.message,
        `Cart response should return the expected success message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });

    // Response Structure Validation
    await allure.step("Verify Cart data structure", async () => {
      expect(responseBody.data, "Cart data should contain id").toHaveProperty("id");
      expect(responseBody.data, "Cart data should contain cart_id").toHaveProperty("cart_id");
      expect(responseBody.data, "Cart data should contain product_id").toHaveProperty("product_id");
      expect(responseBody.data, "Cart data should contain quantity").toHaveProperty("quantity");
      expect(responseBody.data, "Cart data should contain created_at").toHaveProperty("created_at");
      expect(responseBody.data, "Cart data should contain updated_at").toHaveProperty("updated_at");
    });

    // User Information Validation
    await allure.step("Verify Cart information", async () => {
      expect(responseBody.data, "Cart data should contain valid information").toMatchObject({
        id: expect.any(Number),
        // cart_id: expectedCart.cart_id,
        product_id: expectedCart.product_id,
        quantity: expectedCart.quantity,
      });
    });
  }
}
