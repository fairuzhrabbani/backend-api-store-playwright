import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesCategoryAssertion } from "../../../../src/assertions/category/category.messages.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaFailed } from "../../../../src/assertions/category/category.schema.failed.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";
import TestDataFactory from "../../../../src/data/factory/test-data.factory.js";

test.describe("Categories - Admin - Create", () => {
  let categoryResponse;
  let categoryResponseBody;
  const testCaseName = "Categories - Admin - Create";

  test("CAT-CRT-NEG-ADM-001 - Verify Return 400 and display message 'Name and description are required' when name field is empty", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Create Categories",
      story: "Verify Return 400 and display message 'Name and description are required'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "regression"],
      id: "CAT-CRT-NEG-ADM-001",
      description:
        "This test case verifies that an admin can't create categories if name field is empty.",
    });

    // Test data
    const categoryData = TestDataFactory.createRandomCreateCategory();
    const payload = {
      name: "",
      description: categoryData.description,
    };

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Description", payload.description);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        name: payload.name,
        description: payload.description,
      });
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.create(payload);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.createCategory.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertCreateCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.createCategory.emptyFields.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(categoryResponseBody, CategorySchemaFailed, "JSON Schema Failed Create Categories");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE name = $1`,
        [payload.name],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find category by name",
        name: payload.name,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });

  test("CAT-CRT-NEG-ADM-002 - Verify Return 400 and display message 'Name and description are required' when description field is empty", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Create Categories",
      story: "Verify Return 400 and display message 'Name and description are required'",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "regression"],
      id: "CAT-CRT-NEG-ADM-002",
      description:
        "This test case verifies that an admin can't create categories if description field is empty.",
    });

    // Test data
    const categoryData = TestDataFactory.createRandomCreateCategory();
    const payload = {
      name: categoryData.name,
      description: "",
    };

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Description", payload.description);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        name: payload.name,
        description: payload.description,
      });
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.create(payload);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.createCategory.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertCreateCategoryFailed(
        categoryResponseBody,
        MessagesCategoryAssertion.createCategory.emptyFields.expectedMessage,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(
        categoryResponseBody,
        CategorySchemaFailed,
        "JSON Schema Failed Create Categories",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, name, description FROM categories WHERE description = $1`,
        [payload.description],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find category by name",
        description: payload.description,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });
});
