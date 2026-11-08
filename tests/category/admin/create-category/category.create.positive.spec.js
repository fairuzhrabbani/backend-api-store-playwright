import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesCategoryAssertion } from "../../../../src/assertions/category/category.messages.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaCreateSuccess } from "../../../../src/assertions/category/category.schema.create.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";
import TestDataFactory from "../../../../src/data/factory/test-data.factory.js";

test.describe("Categories - Admin - Create", () => {
  let categoryResponse;
  let categoryResponseBody;
  const testCaseName = "Categories - Admin - Create";

  test("CAT-CRT-POS-ADM-001 - Verify Return 201 when Admin hit Create Categories", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Create Categories",
      story: "Verify successful create categories by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-CRT-POS-ADM-001",
      description: "This test case verifies that an admin can successfully create categories.",
    });

    // Test data
    const categoryData = TestDataFactory.createRandomCreateCategory();
    await AllureHelper.parameter("Name", categoryData.name);
    await AllureHelper.parameter("Description", categoryData.description);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        name: categoryData.name,
        description: categoryData.description,
      });
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.create(categoryData);
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(
        MessagesCategoryAssertion.createCategory.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertCreateCategorySuccess(
        categoryResponseBody,
        MessagesCategoryAssertion.createCategory.success.expectedMessage,
        categoryData,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(
        categoryResponseBody,
        CategorySchemaCreateSuccess,
        "JSON Schema Success Create Categories",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, name, description FROM categories WHERE name = $1`,
        [categoryData.name],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find category by name",
        name: categoryData.name,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows[0]);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "name", categoryData.name);
      await DatabaseAssertions.assertFieldValue(
        resultDb.rows[0],
        "description",
        categoryData.description,
      );
    });
  });
});
