import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesProductAssertion } from "../../../../src/assertions/products/product.messages.js";
import { ProductAssertions } from "../../../../src/utils/assertions/product.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { ProductSchemaUpdateSuccess } from "../../../../src/assertions/products/product.schema.update.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";
import ProductFactory from "../../../../src/data/factory/product.factory.js";

test.describe("Product - Admin - Update", () => {
  let productResponse;
  let productResponseBody;
  let productId;
  let _productName;
  let _productDescription;
  let _categoryId;
  const testCaseName = "Product - Admin - Update";

  test.beforeEach(async ({ productAPI }) => {
    // Get all Product
    const responseProductAll = await productAPI.getAll();

    expect(responseProductAll.status()).toBe(200);

    const responseBodyProductAll = await responseProductAll.json();

    // Validate get-all response
    expect(responseBodyProductAll.success).toBe(true);
    expect(responseBodyProductAll.data).toBeInstanceOf(Array);
    expect(responseBodyProductAll.data.length).toBeGreaterThan(0);

    // Get ProductId from response
    productId = responseBodyProductAll.data[0].id;
    _productName = responseBodyProductAll.data[0].name;
    _productDescription = responseBodyProductAll.data[0].description;

    // Validate get-one response
    const responseProductOne = await productAPI.getById(productId);
    expect(responseProductOne.status()).toBe(200);

    const responseBodyProductOne = await responseProductOne.json();
    expect(responseBodyProductOne.success).toBe(true);
    productId = responseBodyProductOne.data.id;
    _productName = responseBodyProductOne.data.name;
    _productDescription = responseBodyProductOne.data.description;
    _categoryId = responseBodyProductOne.data.category_id;
    await AllureHelper.attachResponseBody(responseBodyProductOne);
  });

  test("PRD-UPD-POS-ADM-001 - Verify Return 200 and display message 'Product updated successfully' when update Product", async ({
    productAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Product",
      feature: "Update Product",
      story: "Verify Return 200 and display message 'Product updated successfully'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "PRD-UPD-POS-ADM-001",
      description:
        "This test case verifies that an admin can successfully update Product by Admin.",
    });

    const productData = ProductFactory.updatePayload(_categoryId);
    await AllureHelper.parameter("Product Id", productId);
    await AllureHelper.parameter("Name", productData.name);
    await AllureHelper.parameter("Description", productData.description);
    await AllureHelper.parameter("Price", productData.price);
    await AllureHelper.parameter("Stock", productData.stock);
    await AllureHelper.parameter("Category Id", _categoryId);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(productData);
      // Send the login request and validate the HTTP status code
      productResponse = await productAPI.update(productId, productData);
      await AllureHelper.attachResponseHTTPStatusCode(productResponse.status());
      await AllureHelper.attachResponseHeaders(productResponse.headers());
      expect(productResponse.status()).toBe(
        MessagesProductAssertion.updateProduct.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      productResponseBody = await productResponse.json();
      await AllureHelper.attachResponseBody(productResponseBody);
      await ProductAssertions.assertUpdateProductSuccess(
        productResponseBody,
        MessagesProductAssertion.updateProduct.success.expectedMessage,
        {
          id: productId,
          name: productResponseBody.data.name,
          description: productResponseBody.data.description,
        },
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      productResponseBody = await productResponse.json();
      await SchemaAssert(
        productResponseBody,
        ProductSchemaUpdateSuccess,
        "JSON Schema Success Update Product",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, name, description FROM products WHERE id = $1`,
        [productId],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find Product in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows[0]);
      await DatabaseAssertions.assertFieldValue(
        resultDb.rows[0],
        "name",
        productResponseBody.data.name,
      );
      await DatabaseAssertions.assertFieldValue(
        resultDb.rows[0],
        "description",
        productResponseBody.data.description,
      );
    });
  });
});
