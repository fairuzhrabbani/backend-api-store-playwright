import { test, expect } from "../../../src/fixtures/base.fixture.js";
import { MessagesAuthAssertion } from "../../../src/assertions/auth/auth.messages.js";
import { MessagesCategoryAssertion } from "../../../src/assertions/category/category.messages.js";
import { MessagesProductAssertion } from "../../../src/assertions/products/product.messages.js";
import { AuthAssertions } from "../../../src/utils/assertions/auth.assert.js";
import { CategoryAssertions } from "../../../src/utils/assertions/category.assert.js";
import { ProductAssertions } from "../../../src/utils/assertions/product.assert.js";
import { AuthSchemaSuccess } from "../../../src/assertions/auth/auth.schema.success.js";
import { CategorySchemaCreateSuccess } from "../../../src/assertions/category/category.schema.create.success.js";
import { ProductSchemaCreateSuccess } from "../../../src/assertions/products/product.schema.create.success.js";
import { SchemaAssert } from "../../../src/utils/assertions/schemas.assert.js";
import { DatabaseHelper } from "../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../src/utils/allure/allure.helper.js";
import TestDataFactory from "../../../src/data/factory/test-data.factory.js";

test.describe("Authentication - Admin - Login", () => {
  let loginResponse;
  let loginResponseBody;
  const testCaseName = "Authentication - Admin - Login";

  test("AUTH-POS-ADM-001 - Verify Return 200 and display message 'Login successful' when logging with valid credentials", async ({
    authAPI,
  }) => {
    // Attach Allure metadata for the test case
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "Admin Login",
      story: "Verify successful login with valid credentials",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "AUTH-POS-ADM-001",
      description:
        "This test case verifies that an admin user can successfully log in with valid credentials.",
    });

    // Prepare the payload for login
    const payload = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    // Attach Allure parameters for the test case
    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

    // Attach Allure steps for the test case
    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        email: payload.email,
        password: payload.password,
      });

      // Send the login request and validate the HTTP status code
      loginResponse = await authAPI.login(payload);
      await AllureHelper.attachResponseHTTPStatusCode(loginResponse.status());
      await AllureHelper.attachResponseHeaders(loginResponse.headers());
      expect(loginResponse.status()).toBe(
        MessagesAuthAssertion.authLogin.success.expectedHTTPStatus,
      );
    });

    // Attach Allure steps for the test case
    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      loginResponseBody = await loginResponse.json();
      await AllureHelper.attachResponseBody(loginResponseBody);
      await AuthAssertions.assertLoginSuccess(
        loginResponseBody,
        MessagesAuthAssertion.authLogin.success.expectedMessage,
        payload,
      );
    });

    // Attach Allure steps for the test case
    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      loginResponseBody = await loginResponse.json();
      await SchemaAssert(loginResponseBody, AuthSchemaSuccess, "JSON Schemas Login Success");
    });

    // Attach Allure steps for the test case
    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, email, role FROM users WHERE email = $1`,
        [payload.email],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find user by email",
        email: payload.email,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows[0]);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "email", payload.email);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "role", "admin");
    });
  });
});

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

test.describe("Product - Admin - Create", () => {
  let productResponse;
  let productResponseBody;
  const testCaseName = "Product - Admin - Create";

  test("PRD-CRT-POS-ADM-001 - Verify Return 201 when Admin hit Create Product", async ({
    productAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Product",
      feature: "Create Product",
      story: "Verify successful create Product by Admin",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "PRD-CRT-POS-ADM-001",
      description: "This test case verifies that an admin can successfully create Product.",
    });

    // Test data
    // Get available categories
    const categories = await DatabaseHelper.query("SELECT id, name FROM categories");
    // Generate random product
    const payload = TestDataFactory.createRandomProductCategory(categories.rows);

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Description", payload.description);
    await AllureHelper.parameter("Price", payload.price);
    await AllureHelper.parameter("Stock", payload.stock);
    await AllureHelper.parameter("CategoryId", payload.categoryId);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(payload);
      // Send the login request and validate the HTTP status code
      productResponse = await productAPI.create(payload);
      await AllureHelper.attachResponseHTTPStatusCode(productResponse.status());
      await AllureHelper.attachResponseHeaders(productResponse.headers());
      expect(productResponse.status()).toBe(
        MessagesProductAssertion.createProduct.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      productResponseBody = await productResponse.json();
      await AllureHelper.attachResponseBody(productResponseBody);
      await ProductAssertions.assertCreateProductSuccess(
        productResponseBody,
        MessagesProductAssertion.createProduct.success.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      productResponseBody = await productResponse.json();
      await SchemaAssert(
        productResponseBody,
        ProductSchemaCreateSuccess,
        "JSON Schema Success Create Product",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, name, description, price, stock, category_id FROM products WHERE name = $1`,
        [payload.name],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find product by name",
        name: payload.name,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows[0]);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "name", payload.name);
      await DatabaseAssertions.assertFieldValue(
        resultDb.rows[0],
        "description",
        payload.description,
      );
      // await DatabaseAssertions.expectNumber(resultDb.rows[0], "price", payload.price);
      await DatabaseAssertions.expectNumber(resultDb.rows[0], "price", payload.price);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "stock", payload.stock);
      await DatabaseAssertions.assertFieldValue(
        resultDb.rows[0],
        "category_id",
        payload.categoryId,
      );
    });
  });
});
