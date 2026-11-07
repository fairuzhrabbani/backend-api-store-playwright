import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesAuthAssertion } from "../../../../src/assertions/auth/auth.messages.js";
import { AuthAssertions } from "../../../../src/utils/assertions/auth.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { AuthSchemaSuccess } from "../../../../src/assertions/auth/auth.schema.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

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
      await SchemaAssert(loginResponseBody, AuthSchemaSuccess, "Login Success Response");
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
