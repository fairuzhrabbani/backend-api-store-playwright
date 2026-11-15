import { test, expect } from "../../../../src/fixtures/auth.fixture.js";
import { MessagesCartAssertion } from "../../../../src/assertions/cart/cart.message.js";
import { CartAssertions } from "../../../../src/utils/assertions/cart.assert.js"
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CartSchemaClearProductSuccess } from "../../../../src/assertions/cart/cart.schema.clear-product.success.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Cart - User - Clear Product", () => {
  let cartResponse;
  let cartResponseBody;
  const testCaseName = "Cart - User - Clear Product";

  test("CAR-CLR-POS-USR-001 - Verify Return 200 and display 'Cart cleared successfully'", async ({
    user,
  }) => {
    await AllureHelper.metadata({
      epic: "Cart",
      feature: "Clear Product Cart",
      story: "Verify successful Clear Product to cart by User",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAR-CLR-POS-USR-001",
      description: "This test case verifies that an user can successfully Clear Product Cart.",
    });

    // Test data

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      cartResponse = await user.cartAPI.clearCart();
      await AllureHelper.attachResponseHTTPStatusCode(cartResponse.status());
      await AllureHelper.attachResponseHeaders(cartResponse.headers());
      expect(cartResponse.status()).toBe(
        MessagesCartAssertion.clearProductCart.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      cartResponseBody = await cartResponse.json();
      await AllureHelper.attachResponseBody(cartResponseBody);

      await CartAssertions.assertClearProductCartSuccess(
        cartResponseBody,
        MessagesCartAssertion.clearProductCart.success.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      cartResponseBody = await cartResponse.json();
      await SchemaAssert(
        cartResponseBody,
        CartSchemaClearProductSuccess,
        "JSON Schema Success Clear Product Cart",
      );
    });
  });
});
