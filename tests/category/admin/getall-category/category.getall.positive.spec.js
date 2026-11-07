import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { CategoryAssertions } from "../../../../src/utils/assertions/category.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { CategorySchemaGetAllSuccess } from "../../../../src/assertions/category/category.schema.getall.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Categories - Admin - Get All Categories", () => {
  let categoryResponse;
  let categoryResponseBody;
  const testCaseName = "Categories - Admin - Get All Categories";

  test("CAT-ALL-POS-ADM-001 - Verify Return 200 when Admin hit Get All Categories", async ({
    categoryAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Categories",
      feature: "Get All Categories",
      story: "Verify successful retrieval of all categories by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "CAT-POS-ADM-001",
      description:
        "This test case verifies that an admin can successfully retrieve all categories.",
    });
    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      // Send the login request and validate the HTTP status code
      categoryResponse = await categoryAPI.getAll();
      await AllureHelper.attachResponseHTTPStatusCode(categoryResponse.status());
      await AllureHelper.attachResponseHeaders(categoryResponse.headers());
      expect(categoryResponse.status()).toBe(200);
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      categoryResponseBody = await categoryResponse.json();
      await AllureHelper.attachResponseBody(categoryResponseBody);
      await CategoryAssertions.assertGetAllCategorySuccess(categoryResponseBody);
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      categoryResponseBody = await categoryResponse.json();
      await SchemaAssert(
        categoryResponseBody,
        CategorySchemaGetAllSuccess,
        "Get Categories Response",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT c.id, c.name, c.description FROM categories c
        ORDER BY c.id DESC`,
      );
      // console.log(resultDb.rows);

      await AllureHelper.attachDatabase({
        queryDescription: "Find categories in the database",
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows);
      const databaseData = resultDb.rows;
      // console.log(databaseData);
      // console.log(databaseData.length);
      // console.log(categoryResponseBody.data.length);

      expect(categoryResponseBody.data, "API response data should be an array").toBeInstanceOf(
        Array,
      );

      // Validate total records
      expect(
        categoryResponseBody.data.length,
        "API categories count should match database records",
      ).toBe(databaseData.length);

      // Validate all records
      const normalize = (data) =>
        data
          .map(({ id, name, description }) => ({
            id: Number(id),
            name,
            description,
          }))
          .sort((a, b) => a.id - b.id);

      expect(
        normalize(categoryResponseBody.data),
        "API categories should match all database records",
      ).toEqual(normalize(databaseData));
    });
  });
});
