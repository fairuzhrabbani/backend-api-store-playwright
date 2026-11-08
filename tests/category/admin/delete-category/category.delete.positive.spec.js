import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesCategoryAssertion } from "../../../../src/assertions/category/category.messages.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaUpdateSuccess } from "../../../../src/assertions/category/category.schema.update.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Categories - Admin - Delete", () => {
  let categoryResponse;
  let categoryResponseBody;
  let categoryId;
  let _categoryName;
  let _categoryDescription;
  const testCaseName = "Categories - Admin - Delete";

  test.beforeEach(async ({ categoryAPI }) => {
    // Get all categories
    const responseCategoryAll = await categoryAPI.getAll();

    expect(responseCategoryAll.status()).toBe(200);

    const responseBodyCategoryAll = await responseCategoryAll.json();

    // Validate get-all response
    expect(responseBodyCategoryAll.success).toBe(true);
    expect(responseBodyCategoryAll.data).toBeInstanceOf(Array);
    expect(responseBodyCategoryAll.data.length).toBeGreaterThan(0);

    // Get categoryId from response
    categoryId = responseBodyCategoryAll.data[0].id;
    _categoryName = responseBodyCategoryAll.data[0].name;
    _categoryDescription = responseBodyCategoryAll.data[0].description;

    // Validate get-one response
    const responseCategoryOne = await categoryAPI.getById(categoryId);
    expect(responseCategoryOne.status()).toBe(200);

    const responseBodyCategoryOne = await responseCategoryOne.json();
    expect(responseBodyCategoryOne.success).toBe(true);
    categoryId = responseBodyCategoryOne.data.id;
    _categoryName = responseBodyCategoryOne.data.name;
    _categoryDescription = responseBodyCategoryOne.data.description;
    await AllureHelper.attachResponseBody(responseBodyCategoryOne);
  });

  test("CAT-DEL-POS-ADM-001 - Verify Return 200 and display message 'Category deleted successfully' when delete category", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Delete Categories",
      story: "Verify Return 200 and display message 'Category deleted successfully'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-DEL-POS-ADM-001",
      description:
        "This test case verifies that an admin can successfully delete category by Admin.",
    });

    // Test data
    await AllureHelper.parameter("Category Id", categoryId);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        categoryId: categoryId,
      });
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.delete(categoryId);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.deleteCategory.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertDeleteCategorySuccess(
        categoryResponseBody,
        MessagesCategoryAssertion.deleteCategory.success.expectedMessage,
        {
          id: categoryId,
          name: categoryResponseBody.data.name,
          description: categoryResponseBody.data.description,
        },
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(
        categoryResponseBody,
        CategorySchemaUpdateSuccess,
        "JSON Schema Success Delete Categories",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE id = $1`,
        [categoryId],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });
});
