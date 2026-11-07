import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesCategoryAssertion } from "../../../../src/assertions/category/category.messages.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaFailed } from "../../../../src/assertions/category/category.schema.failed.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";
import TestDataFactory from "../../../../src/data/factory/test-data.factory.js";

test.describe("Categories - Admin - Update Categories", () => {
  let categoryResponse;
  let categoryResponseBody;
  let categoryId;
  let _categoryName;
  let _categoryDescription;
  const testCaseName = "Categories - Admin - Update Categories";

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

  test("CAT-UPD-NEG-ADM-001 - Verify Return 400 and display message 'Name and description are required' when update category without name field", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Update Categories",
      story: "Verify successful retrieval of one category by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-UPD-NEG-ADM-001",
      description:
        "This test case verifies that an admin can successfully retrieve one category by Admin.",
    });

    // Test data
    const categoryData = TestDataFactory.createRandomCreateCategory();
    const payload = {
      name: "",
      description: categoryData.description,
    };
    await AllureHelper.parameter("Category Id", categoryId);
    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Description", payload.description);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.update(categoryId, payload);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.updateCategory.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertUpdateCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.updateCategory.emptyFields.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(categoryResponseBody, CategorySchemaFailed, "Update Categories Response");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE description = $1`,
        [payload.description],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        description: payload.description,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });

  test("CAT-UPD-NEG-ADM-002 - Verify Return 400 and display message 'Name and description are required' when update category without description field", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Update Categories",
      story: "Verify successful retrieval of one category by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-UPD-NEG-ADM-002",
      description:
        "This test case verifies that an admin can successfully retrieve one category by Admin.",
    });

    // Test data
    const categoryData = TestDataFactory.createRandomCreateCategory();
    const payload = {
      name: categoryData.name,
      description: "",
    };
    await AllureHelper.parameter("Category Id", categoryId);
    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Description", payload.description);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.update(categoryId, payload);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.updateCategory.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertUpdateCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.updateCategory.emptyFields.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(categoryResponseBody, CategorySchemaFailed, "Update Categories Response");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE description = $1`,
        [payload.description],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        description: payload.description,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });

  test("CAT-UPD-NEG-ADM-003 - Verify Return 400 and display message 'Category ID must be a positive integer' when update category with invalid format Category Id", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Update Categories",
      story: "Verify successful retrieval of one category by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-UPD-NEG-ADM-003",
      description:
        "This test case verifies that an admin can successfully retrieve one category by Admin.",
    });

    // Test data
    const categoryData = TestDataFactory.createRandomCreateCategory();
    const invalidCategoryId = "abc";

    await AllureHelper.parameter("Category Id", invalidCategoryId);
    await AllureHelper.parameter("Name", categoryData.name);
    await AllureHelper.parameter("Description", categoryData.description);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.update(invalidCategoryId, categoryData);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.updateCategory.invalidFormatType.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertUpdateCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.updateCategory.invalidFormatType.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(categoryResponseBody, CategorySchemaFailed, "Update Categories Response");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE description = $1`,
        [categoryData.description],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        description: categoryData.description,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });

  test("CAT-UPD-NEG-ADM-004 - Verify Return 404 and display message 'Category not found' when update category with invalid Category Id", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Update Categories",
      story: "Verify successful retrieval of one category by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-UPD-NEG-ADM-003",
      description:
        "This test case verifies that an admin can successfully retrieve one category by Admin.",
    });

    // Test data
    const categoryData = TestDataFactory.createRandomCreateCategory();
    const invalidCategoryId = 9999;

    await AllureHelper.parameter("Category Id", invalidCategoryId);
    await AllureHelper.parameter("Name", categoryData.name);
    await AllureHelper.parameter("Description", categoryData.description);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.update(invalidCategoryId, categoryData);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.updateCategory.notFound.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertUpdateCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.updateCategory.notFound.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(categoryResponseBody, CategorySchemaFailed, "Update Categories Response");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE description = $1`,
        [categoryData.description],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        description: categoryData.description,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });
});
