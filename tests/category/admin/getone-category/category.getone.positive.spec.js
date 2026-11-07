import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaGetOneSuccess } from "../../../../src/assertions/category/category.schema.getone.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Categories - Admin - Get One Categories", () => {
  let categoryResponse;
  let categoryResponseBody;
  let categoryId;
  let categoryName;
  let categoryDescription;
  const testCaseName = "Categories - Admin - Get One Categories";

  test.beforeEach(async ({ categoryAPI }) => {
    // Get all categories
    const response = await categoryAPI.getAll();

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Validate get-all response
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toBeGreaterThan(0);

    // Get categoryId from response
    categoryId = responseBody.data[0].id;
    categoryName = responseBody.data[0].name;
    categoryDescription = responseBody.data[0].description;
  });

  test("CAT-ONE-POS-ADM-001 - Verify Return 200 when Admin hit Get One Categories", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Get One Categories",
      story: "Verify successful retrieval of one category by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-ONE-POS-ADM-001",
      description:
        "This test case verifies that an admin can successfully retrieve one category by Admin.",
    });
    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.getById(categoryId);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(200);
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertGetOneCategorySuccess(categoryResponseBody, {
        id: categoryId,
        name: categoryName,
        description: categoryDescription,
      });
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(
        categoryResponseBody,
        CategorySchemaGetOneSuccess,
        "Get Categories Response",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, name, description FROM categories WHERE id = $1`,
        [categoryId],
      );
      // console.log(resultDb.rows);

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows);
    });
  });
});
