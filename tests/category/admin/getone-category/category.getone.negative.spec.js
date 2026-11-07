import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { MessagesCategoryAssertion } from "../../../../src/assertions/category/category.messages.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaFailed } from "../../../../src/assertions/category/category.schema.failed.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Categories - Admin - Get One Categories", () => {
  let categoryResponse;
  let categoryResponseBody;
  let categoryId = 999;
  let invalidFormatCategoryId = "abc";

  const testCaseName = "Categories - Admin - Get One Categories";

  test("CAT-ONE-NEG-ADM-001 - Verify Return 404 and display message 'Category not found' when categoryId not found'", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Get One Categories",
      story: "Verify Return 404 and display message 'Category not found'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-ONE-POS-ADM-001",
      description: "This test case verifies Return 404 and display message 'Category not found'",
    });
    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.getById(categoryId);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.getOneCategory.notFound.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertGetOneCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.getOneCategory.notFound.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(categoryResponseBody, CategorySchemaFailed, "Get Categories Response");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE id = $1`,
        [categoryId],
      );
      // console.log(resultDb.rows);

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });
  test("CAT-ONE-NEG-ADM-002 - Verify Return 400 and display message 'Category ID must be a positive integer'", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Get One Categories",
      story: "Verify Return 400 and display message 'Category ID must be a positive integer'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-ONE-POS-ADM-002",
      description:
        "This test case verifies 400 and display message 'Category ID must be a positive integer'",
    });
    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.getById(invalidFormatCategoryId);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.getOneCategory.invalidFormatType.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertGetOneCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.getOneCategory.invalidFormatType.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(categoryResponseBody, CategorySchemaFailed, "Get Categories Response");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE id = $1`,
        [categoryId],
      );
      // console.log(resultDb.rows);

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });
});
