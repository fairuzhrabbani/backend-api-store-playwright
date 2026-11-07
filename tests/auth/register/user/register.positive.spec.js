import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesRegisterAssertion } from "../../../../src/assertions/register/register.message.js";
import { RegisterAssertions } from "../../../../src/utils/assertions/register.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { RegisterSchemaSuccess } from "../../../../src/assertions/register/register.schema.success.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";
import { Roles } from "../../../../src/data/constants/roles.js";
import TestDataFactory from "../../../../src/data/factory/test-data.factory.js";

test.describe("Authentication - User - Registration", () => {
  let registerResponse;
  let registerResponseBody;
  const testCaseName = "Authentication - User - Registration";

  test("REG-POS-USR-001 - Verify Return 201 and display message 'User registered successfully' when registering with valid credentials", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "User Registration",
      story: "Verify successful registration with valid credentials",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["positive", "regression"],
      id: "REG-POS-USR-001",
      description: "This test case verifies that an user can register with valid credentials.",
    });
    // Prepare the payload for registration
    // Test data
    const registerData = TestDataFactory.createRandomUserRegistration();

    await AllureHelper.parameter("Name", registerData.name);
    await AllureHelper.parameter("Email", registerData.email);
    await AllureHelper.parameter("Password", registerData.password);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });

      // Send the registration request and validate the HTTP status code
      registerResponse = await authAPI.register(registerData);
      await AllureHelper.attachResponseHTTPStatusCode(registerResponse.status());
      await AllureHelper.attachResponseHeaders(registerResponse.headers());
      expect(registerResponse.status()).toBe(
        MessagesRegisterAssertion.authRegister.success.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      registerResponseBody = await registerResponse.json();
      await AllureHelper.attachResponseBody(registerResponseBody);
      await RegisterAssertions.assertRegisterSuccess(
        registerResponseBody,
        MessagesRegisterAssertion.authRegister.success.expectedMessage,
        registerData,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      registerResponseBody = await registerResponse.json();
      await SchemaAssert(
        registerResponseBody,
        RegisterSchemaSuccess,
        "Registration Success Response",
      );
    });

    await test.step(`Validate Database - ${testCaseName}`, async () => {
      const resultDb = await DatabaseHelper.query(
        `SELECT id, email, role FROM users WHERE email = $1`,
        [registerData.email],
      );

      await AllureHelper.attachDatabase({
        queryDescription: "Find user by email",
        email: registerData.email,
        recordFound: resultDb !== null,
        result: resultDb,
      });

      await DatabaseAssertions.assertRecordExists(resultDb.rows[0]);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "email", registerData.email);
      await DatabaseAssertions.assertFieldValue(resultDb.rows[0], "role", Roles.USER);
    });
  });
});
