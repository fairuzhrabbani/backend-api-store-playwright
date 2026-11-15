import { test, expect } from "../../../../src/fixtures/auth.fixture.js";
import { MessagesCartAssertion } from "../../../../src/assertions/cart/cart.message.js";
import { CartAssertions } from "../../../../src/utils/assertions/cart.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CartSchemaCheckCartEmptytSuccess } from "../../../../src/assertions/cart/cart.schema.check-cart-empty.success.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Cart - User - Check Product", () => {
  let cartResponse;
  let cartResponseBody;
  const testCaseName = "Cart - User - Check Product";

  test("CAR-CHK-POS-USR-001 - Verify Return 200 and display 'Cart fetched successfully'", async ({
    user,
  }) => {
    await AllureHelper.metadata({
      epic: "Cart",
      feature: "Check Product Cart",
      story: "Verify successful Check Product to cart by User",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAR-CHK-POS-USR-001",
      description: "This test case verifies that an user can successfully Check Product Cart.",
    });

    // Test data

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      cartResponse = await user.cartAPI.checkCart();
      await AllureHelper.attachResponseHTTPStatusCode(cartResponse.status());
      await AllureHelper.attachResponseHeaders(cartResponse.headers());
      expect(cartResponse.status()).toBe(
        MessagesCartAssertion.checkProductCart.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      cartResponseBody = await cartResponse.json();
      await AllureHelper.attachResponseBody(cartResponseBody);

      await CartAssertions.assertCheckProductCartSuccess(
        cartResponseBody,
        MessagesCartAssertion.checkProductCart.success.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      cartResponseBody = await cartResponse.json();
      await SchemaAssert(
        cartResponseBody,
        CartSchemaCheckCartEmptytSuccess,
        "JSON Schema Success Check Product Cart",
      );
    });
  });
});
