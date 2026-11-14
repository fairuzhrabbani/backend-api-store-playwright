import { test, expect } from "../../../../src/fixtures/auth.fixture.js";
import { MessagesCartAssertion } from "../../../../src/assertions/cart/cart.message.js";
import { CartAssertions } from "../../../../src/utils/assertions/cart.assert.js"
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CartSchemaAddProductSuccess } from "../../../../src/assertions/cart/cart.schema.add-product.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Cart - User - Add Product", () => {
  let cartResponse;
  let cartResponseBody;
  const testCaseName = "Cart - User - Add Product";

  test("CAR-ADD-POS-USR-001 - Verify Return 201 and display 'Product added to cart successfully'", async ({
    user,
  }) => {
    await AllureHelper.metadata({
      epic: "Cart",
      feature: "Add Product Cart",
      story: "Verify successful add product to cart by User",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAR-ADD-POS-USR-001",
      description: "This test case verifies that an user can successfully Add Product Cart.",
    });

    // Test data
    const payload = {
      productId: 4,
      quantity: 2,
    };
    await AllureHelper.parameter("Product Id", payload.productId);
    await AllureHelper.parameter("Quantity", payload.quantity);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        productId: payload.productId,
        quantity: payload.quantity,
      });
      // Send the login request and validate the HTTP status code
      cartResponse = await user.cartAPI.createCart(payload);
      await AllureHelper.attachResponseHTTPStatusCode(cartResponse.status());
      await AllureHelper.attachResponseHeaders(cartResponse.headers());
      expect(cartResponse.status()).toBe(MessagesCartAssertion.addProductCart.success.expectedHTTPStatus);
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      cartResponseBody = await cartResponse.json();
      await AllureHelper.attachResponseBody(cartResponseBody);

      const expectedCart = {
        product_id: payload.productId,
        quantity: payload.quantity,
      };

      await CartAssertions.assertAddProductCartSuccess(
        cartResponseBody,
        MessagesCartAssertion.addProductCart.success.expectedMessage,
        expectedCart,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      cartResponseBody = await cartResponse.json();
      await SchemaAssert(
        cartResponseBody,
        CartSchemaAddProductSuccess,
        "JSON Schema Success Add Product Cart",
      );
    });

    // await test.step(`Validate Database - ${testCaseName}`, async () => {
    //   const resultDb = await DatabaseHelper.query(
    //     `SELECT id, name, description FROM categories WHERE name = $1`,
    //     [categoryData.name],
    //   );

    //   await AllureHelper.attachDatabase({
    //     queryDescription: "Find category by name",
    //     name: categoryData.name,
    //     recordFound: resultDb !== null,
    //     result: resultDb,
    //   });

    //   await DatabaseAssertions.assertRecordExists(resultDb.rows[0]);
    //   await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "name", categoryData.name);
    //   await DatabaseAssertions.assertFieldValue(
    //     resultDb.rows[0],
    //     "description",
    //     categoryData.description,
    //   );
    // });
  });
});
