import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesProductAssertion } from "../../../../src/assertions/products/product.messages.js";
import { ProductAssertions } from "../../../../src/utils/assertions/product.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { ProductSchemaCreateSuccess } from "../../../../src/assertions/products/product.schema.create.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";
import TestDataFactory from "../../../../src/data/factory/test-data.factory.js";

test.describe("Product - Admin - Create", () => {
  let productResponse;
  let productResponseBody;
  const testCaseName = "Product - Admin - Create";

  test("PRD-CRT-POS-ADM-001 - Verify Return 201 when Admin hit Create Product", async ({
    productAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Product",
      feature: "Create Product",
      story: "Verify successful create Product by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "PRD-CRT-POS-ADM-001",
      description: "This test case verifies that an admin can successfully create Product.",
    });

    // Test data
    // Get available categories
    const categories = await DatabaseHelper.query("SELECT id, name FROM categories");
    // Generate random product
    const payload = TestDataFactory.createRandomProductCategory(categories.rows);

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Description", payload.description);
    await AllureHelper.parameter("Price", payload.price);
    await AllureHelper.parameter("Stock", payload.stock);
    await AllureHelper.parameter("CategoryId", payload.categoryId);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(payload);
      // Send the login request and validate the HTTP status code
      productResponse = await productAPI.create(payload);
      await AllureHelper.attachResponseHTTPStatusCode(productResponse.status());
      await AllureHelper.attachResponseHeaders(productResponse.headers());
      expect(productResponse.status()).toBe(
        MessagesProductAssertion.createProduct.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      productResponseBody = await productResponse.json();
      await AllureHelper.attachResponseBody(productResponseBody);
      await ProductAssertions.assertCreateProductSuccess(
        productResponseBody,
        MessagesProductAssertion.createProduct.success.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      productResponseBody = await productResponse.json();
      await SchemaAssert(
        productResponseBody,
        ProductSchemaCreateSuccess,
        "JSON Schema Success Create Product",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, name, description, price, stock, category_id FROM products WHERE name = $1`,
        [payload.name],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find product by name",
        name: payload.name,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows[0]);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "name", payload.name);
      await DatabaseAssertions.assertFieldValue(
        resultDb.rows[0],
        "description",
        payload.description,
      );
      // await DatabaseAssertions.expectNumber(resultDb.rows[0], "price", payload.price);
      await DatabaseAssertions.expectNumber(resultDb.rows[0], "price", payload.price);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "stock", payload.stock);
      await DatabaseAssertions.assertFieldValue(
        resultDb.rows[0],
        "category_id",
        payload.categoryId,
      );
    });
  });
});
