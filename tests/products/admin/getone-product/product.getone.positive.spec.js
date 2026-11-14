import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { ProductAssertions } from "../../../../src/utils/assertions/product.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { ProductSchemaGetOneSuccess } from "../../../../src/assertions/products/product.schema.getone.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Product - Admin - Get One", () => {
  let productResponse;
  let productResponseBody;
  let productId;
  let productName;
  let productDescription;
  let productPrice;
  let productStock;
  let productCategoryId;
  let productCategoryName;
  let productCreatedAt;
  let productUpdatedAt;
  const testCaseName = "Product - Admin - Get One";

  test.beforeEach(async ({ productAPI }) => {
    // Get all Product
    const response = await productAPI.getAll();

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Validate get-all response
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toBeGreaterThan(0);

    // Get productId from response
    productId = responseBody.data[0].id;
    productName = responseBody.data[0].name;
    productDescription = responseBody.data[0].description;
    productPrice = responseBody.data[0].price;
    productStock = responseBody.data[0].stock;
    productCategoryId = responseBody.data[0].category_id;
    productCategoryName = responseBody.data[0].category_name;
    productCreatedAt = responseBody.data[0].created_at;
    productUpdatedAt = responseBody.data[0].updated_at;
  });

  test("PRD-ONE-POS-ADM-001 - Verify Return 200 when Admin hit Get One Product", async ({
    productAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Product",
      feature: "Get One Product",
      story: "Verify successful retrieval of one product by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "PRD-ONE-POS-ADM-001",
      description:
        "This test case verifies that an admin can successfully retrieve one product by Admin.",
    });

    await AllureHelper.parameter("productId", productId);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        productId: productId,
      });
      // Send the login request and validate the HTTP status code
      productResponse = await productAPI.getById(productId);
      await AllureHelper.attachResponseHTTPStatusCode(productResponse.status());
      await AllureHelper.attachResponseHeaders(productResponse.headers());
      expect(productResponse.status()).toBe(200);
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      productResponseBody = await productResponse.json();
      await AllureHelper.attachResponseBody(productResponseBody);
      await ProductAssertions.assertGetOneProductSuccess(productResponseBody, {
        id: productId,
        name: productName,
        description: productDescription,
        price: productPrice,
        stock: productStock,
        category_id: productCategoryId,
        category_name: productCategoryName,
        created_at: productCreatedAt,
        updated_at : productUpdatedAt
      });
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      productResponseBody = await productResponse.json();
      await SchemaAssert(
        productResponseBody,
        ProductSchemaGetOneSuccess,
        "JSON Schema Success Get One Product",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, name, description FROM products WHERE id = $1`,
        [productId],
      );
      // console.log(resultDb.rows);

      await AllureHelper.attachDatabase({
        queryDescription: "Find Product in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows);
    });
  });
});
