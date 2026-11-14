import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { ProductAssertions } from "../../../../src/utils/assertions/product.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { ProductSchemaGetAllSuccess } from "../../../../src/assertions/products/product.schema.getall.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Product - Admin - Get All", () => {
  let productResponse;
  let productResponseBody;
  const testCaseName = "Product - Admin - Get All";

  test("PRD-ALL-POS-ADM-001 - Verify Return 200 when Admin hit Get All Product", async ({
    productAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Product",
      feature: "Get All Product",
      story: "Verify successful retrieval of all categories by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "PRD-ALL-POS-ADM-001",
      description: "This test case verifies that an admin can successfully retrieve all products.",
    });

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      productResponse = await productAPI.getAll();
      await AllureHelper.attachResponseHTTPStatusCode(productResponse.status());
      await AllureHelper.attachResponseHeaders(productResponse.headers());
      expect(productResponse.status()).toBe(200);
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      productResponseBody = await productResponse.json();
      await AllureHelper.attachResponseBody(productResponseBody);
      await ProductAssertions.assertGetAllProductSuccess(productResponseBody);
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      productResponseBody = await productResponse.json();
      await SchemaAssert(
        productResponseBody,
        ProductSchemaGetAllSuccess,
        "JSON Schema Success Get All Products",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `select * from products p 
          order by id asc`,
      );
      // console.log(resultDb.rows);

      await AllureHelper.attachDatabase({
        queryDescription: "Find products in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows);
      const databaseData = resultDb.rows;
      // console.log(databaseData);
      // console.log(databaseData.length);
      // console.log(productResponseBody.data.length);

      expect(productResponseBody.data, "API response data should be an array").toBeInstanceOf(
        Array,
      );

      // Validate total records
      expect(
        productResponseBody.data.length,
        "API categories count should match database records",
      ).toBe(databaseData.length);

      // Validate all records
      const normalize = (data) =>
        data
          .map(({ id, name, description, price, stock, category_id}) => ({
            id: Number(id),
            name,
            description,
            price,
            stock,
            category_id,
          }))
          .sort((a, b) => a.id - b.id);

      expect(
        normalize(productResponseBody.data),
        "API categories should match all database records",
      ).toEqual(normalize(databaseData));
    });
  });
});
