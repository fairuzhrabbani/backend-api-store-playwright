import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesAuthAssertion } from "../../../../src/assertions/auth/auth.messages.js";
import { AuthAssertions } from "../../../../src/utils/assertions/auth.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { AuthSchemaFailed } from "../../../../src/assertions/auth/auth.schema.failed.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";

test.describe("Authentication - Admin - Login", () => {
  let loginResponse;
  let loginResponseBody;
  const testCaseName = "Authentication - Admin - Login";

  test("AUTH-NEG-ADM-001 - Verify Return 401 and display message 'Invalid email or password' when logging with invalid credentials", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "Admin Login",
      story: "Verify failed login with invalid credentials",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "AUTH-NEG-ADM-001",
      description:
        "This test case verifies that an admin user cannot log in with invalid credentials.",
    });
    // Prepare the payload for login
    const payload = {
      email: "wrongadmin@example.com",
      password: "wrongpassword",
    };

    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

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
        MessagesAuthAssertion.authLogin.invalidCredentials.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      loginResponseBody = await loginResponse.json();
      await AllureHelper.attachResponseBody(loginResponseBody);
      await AuthAssertions.assertLoginFailed(
        loginResponseBody,
        MessagesAuthAssertion.authLogin.invalidCredentials.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      loginResponseBody = await loginResponse.json();
      await SchemaAssert(loginResponseBody, AuthSchemaFailed, "JSON Schema Login Failed");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, email, role FROM users WHERE email = $1`,
        [payload.email],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find user by email",
        email: payload.email,
        recordFound: resultDb !== null,
        result: resultDb,
      });
      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });

  test("AUTH-NEG-ADM-002 - Verify Return 400 and display message 'Email and password are required' when logging with empty email field", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "Admin Login",
      story: "Verify failed login with empty email field",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "AUTH-NEG-ADM-002",
      description:
        "This test case verifies that an admin user cannot log in with an empty email field.",
    });
    // Prepare the payload for login
    const payload = {
      email: "",
      password: process.env.ADMIN_PASSWORD,
    };

    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

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
        MessagesAuthAssertion.authLogin.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      loginResponseBody = await loginResponse.json();
      await AllureHelper.attachResponseBody(loginResponseBody);
      await AuthAssertions.assertLoginFailed(
        loginResponseBody,
        MessagesAuthAssertion.authLogin.emptyFields.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      loginResponseBody = await loginResponse.json();
      await SchemaAssert(loginResponseBody, AuthSchemaFailed, "JSON Schema Login Failed");
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.findOne(
        `SELECT id, email, role FROM users WHERE email = $1`,
        [payload.email],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find user by email",
        email: payload.email,
        recordFound: resultDb !== null,
        result: resultDb,
      });
      await DatabaseAssertions.assertRecordNotExists(resultDb);
    });
  });

  test("AUTH-NEG-ADM-003 - Verify Return 400 and display message 'Email and password are required' when logging with empty password field", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "Admin Login",
      story: "Verify failed login with empty password field",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "AUTH-NEG-ADM-003",
      description:
        "This test case verifies that an admin user cannot log in with an empty password field.",
    });
    // Prepare the payload for login
    const payload = {
      email: process.env.ADMIN_EMAIL,
      password: "",
    };

    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

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
        MessagesAuthAssertion.authLogin.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      loginResponseBody = await loginResponse.json();
      await AllureHelper.attachResponseBody(loginResponseBody);
      await AuthAssertions.assertLoginFailed(
        loginResponseBody,
        MessagesAuthAssertion.authLogin.emptyFields.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      loginResponseBody = await loginResponse.json();
      await SchemaAssert(loginResponseBody, AuthSchemaFailed, "JSON Schema Login Failed");
    });

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
