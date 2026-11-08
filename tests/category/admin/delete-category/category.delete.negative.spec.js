import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesCategoryAssertion } from "../../../../src/assertions/category/category.messages.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaFailed } from "../../../../src/assertions/category/category.schema.failed.js";
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

  test("CAT-DEL-NEG-ADM-001 - Verify Return 400 and display message 'Category ID must be a positive integer' when delete category with invalid format Category Id", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Delete Categories",
      story: "Verify Return 400 and display message 'Category ID must be a positive integer'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "CAT-DEL-NEG-ADM-001",
      description:
        "This test case verifies that an admin can't delete category if invalid format category Id",
    });

    // Test data
    const invalidCategoryId = "abc";

    await AllureHelper.parameter("Category Id", invalidCategoryId);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        categoryId: invalidCategoryId,
      });
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.delete(invalidCategoryId);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.deleteCategory.invalidFormatType.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertDeleteCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.deleteCategory.invalidFormatType.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(
        categoryResponseBody,
        CategorySchemaFailed,
        "JSON Schema Delete Categories",
      );
    });
  });

  test("CAT-DEL-NEG-ADM-002 - Verify Return 404 and display message 'Category not found' when delete category with invalid Category Id", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Delete Categories",
      story: "Verify Return 404 and display message 'Category not found'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "CAT-DEL-NEG-ADM-002",
      description:
        "This test case verifies that an admin can't delete category if invalid category id or not found category id.",
    });

    // Test data
    const invalidCategoryId = 9999;

    await AllureHelper.parameter("Category Id", invalidCategoryId);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        categoryId: invalidCategoryId,
      });
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.delete(invalidCategoryId);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.deleteCategory.notFound.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertDeleteCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.deleteCategory.notFound.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(
        categoryResponseBody,
        CategorySchemaFailed,
        "JSON Schema Delete Categories",
      );
    });
  });
});
