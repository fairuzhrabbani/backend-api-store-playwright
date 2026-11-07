import { test, expect } from "../../../../src/fixtures/base.fixture.js";
import { MessagesRegisterAssertion } from "../../../../src/assertions/register/register.message.js";
import { RegisterAssertions } from "../../../../src/utils/assertions/register.assert.js";
import { SchemaAssert } from "../../../../src/utils/assertions/schemas.assert.js";
import { RegisterSchemaFailed } from "../../../../src/assertions/register/register.schema.failed.js";
import { DatabaseHelper } from "../../../../src/utils/database/database.helper.js";
import { DatabaseAssertions } from "../../../../src/utils/database/database.assertion.js";
import { AllureHelper } from "../../../../src/utils/allure/allure.helper.js";
import TestDataFactory from "../../../../src/data/factory/test-data.factory.js";

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;

test.describe("Authentication - User - Registration", () => {
  let registerResponse;
  let registerResponseBody;
  const testCaseName = "Authentication - User - Registration";

  test("REG-NEG-USR-001 - Verify Return 400 and display message 'Name, email, and password are required' when registering with empty name field", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "User Registration",
      story: "Verify failed registration with empty name field",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "REG-NEG-USR-001",
      description: "This test case verifies that an user cannot register with empty name field.",
    });
    // Prepare the payload for registration
    // Test data
    const registerData = TestDataFactory.createRandomUserRegistration();

    const payload = {
      name: "",
      email: registerData.email,
      password: registerData.password,
    };

    await AllureHelper.parameter("Name", "");
    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(payload);

      // Send the registration request and validate the HTTP status code
      registerResponse = await authAPI.register(payload);
      await AllureHelper.attachResponseHTTPStatusCode(registerResponse.status());
      await AllureHelper.attachResponseHeaders(registerResponse.headers());
      expect(registerResponse.status()).toBe(
        MessagesRegisterAssertion.authRegister.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      registerResponseBody = await registerResponse.json();
      await AllureHelper.attachResponseBody(registerResponseBody);
      await RegisterAssertions.assertRegisterFailed(
        registerResponseBody,
        MessagesRegisterAssertion.authRegister.emptyFields.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      registerResponseBody = await registerResponse.json();
      await SchemaAssert(
        registerResponseBody,
        RegisterSchemaFailed,
        "JSON Schema Registration Failed",
      );
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

  test("REG-NEG-USR-002 - Verify Return 400 and display message 'Name, email, and password are required' when registering with empty email field", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "User Registration",
      story: "Verify failed registration with empty email field",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "REG-NEG-USR-002",
      description: "This test case verifies that an user cannot register with empty email field.",
    });
    // Prepare the payload for registration
    // Test data
    const registerData = TestDataFactory.createRandomUserRegistration();

    const payload = {
      name: registerData.name,
      email: "",
      password: registerData.password,
    };

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(payload);

      // Send the registration request and validate the HTTP status code
      registerResponse = await authAPI.register(payload);
      await AllureHelper.attachResponseHTTPStatusCode(registerResponse.status());
      await AllureHelper.attachResponseHeaders(registerResponse.headers());
      expect(registerResponse.status()).toBe(
        MessagesRegisterAssertion.authRegister.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      registerResponseBody = await registerResponse.json();
      await AllureHelper.attachResponseBody(registerResponseBody);
      await RegisterAssertions.assertRegisterFailed(
        registerResponseBody,
        MessagesRegisterAssertion.authRegister.emptyFields.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      registerResponseBody = await registerResponse.json();
      await SchemaAssert(
        registerResponseBody,
        RegisterSchemaFailed,
        "JSON Schema Registration Failed",
      );
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

  test("REG-NEG-USR-003 - Verify Return 400 and display message 'Name, email, and password are required' when registering with empty password field", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "User Registration",
      story: "Verify failed registration with empty password field",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "REG-NEG-USR-003",
      description:
        "This test case verifies that an user cannot register with empty password field.",
    });
    // Prepare the payload for registration
    // Test data
    const registerData = TestDataFactory.createRandomUserRegistration();

    const payload = {
      name: registerData.name,
      email: registerData.email,
      password: "",
    };

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(payload);

      // Send the registration request and validate the HTTP status code
      registerResponse = await authAPI.register(payload);
      await AllureHelper.attachResponseHTTPStatusCode(registerResponse.status());
      await AllureHelper.attachResponseHeaders(registerResponse.headers());
      expect(registerResponse.status()).toBe(
        MessagesRegisterAssertion.authRegister.emptyFields.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      registerResponseBody = await registerResponse.json();
      await AllureHelper.attachResponseBody(registerResponseBody);
      await RegisterAssertions.assertRegisterFailed(
        registerResponseBody,
        MessagesRegisterAssertion.authRegister.emptyFields.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      registerResponseBody = await registerResponse.json();
      await SchemaAssert(
        registerResponseBody,
        RegisterSchemaFailed,
        "JSON Schema Registration Failed",
      );
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

  test("REG-NEG-USR-004 - Verify Return 400 and display message 'Email address must be a valid email format' when registering with wrong email format", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "User Registration",
      story: "Verify failed registration with wrong email format",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke","bugs"],
      id: "REG-NEG-USR-004",
      description:
        "This test case verifies that an user cannot register with a wrong email format.",
    });
    // Attach Jira issue
    await AllureHelper.jira("QA-123", JIRA_BASE_URL);
    // Prepare the payload for registration
    // Test data
    const registerData = TestDataFactory.createRandomUserRegistration();

    const payload = {
      name: registerData.name,
      email: registerData.name,
      password: registerData.password,
    };

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(payload);

      // Send the registration request and validate the HTTP status code
      registerResponse = await authAPI.register(payload);
      await AllureHelper.attachResponseHTTPStatusCode(registerResponse.status());
      await AllureHelper.attachResponseHeaders(registerResponse.headers());
      expect(registerResponse.status()).toBe(
        MessagesRegisterAssertion.authRegister.wrongEmailFormat.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      registerResponseBody = await registerResponse.json();
      await AllureHelper.attachResponseBody(registerResponseBody);
      await RegisterAssertions.assertRegisterFailed(
        registerResponseBody,
        MessagesRegisterAssertion.authRegister.wrongEmailFormat.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      registerResponseBody = await registerResponse.json();
      await SchemaAssert(
        registerResponseBody,
        RegisterSchemaFailed,
        "JSON Schema Registration Failed",
      );
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

  test("REG-NEG-USR-005 - Verify Return 409 and display message 'Email is already registered' when registering with email has been registered", async ({
    authAPI,
  }) => {
    await AllureHelper.metadata({
      epic: "Authentication",
      feature: "User Registration",
      story: "Verify failed registration with already registered email",
      severity: "critical",
      owner: "Fairuz Hanif Rabbani",
      tags: ["negative", "smoke"],
      id: "REG-NEG-USR-005",
      description: "This test case verifies that an user cannot register with an email that is already registered.",
    });
    // Prepare the payload for registration
    // Test data
    const registerData = TestDataFactory.createRandomUserRegistration();

    const payload = {
      name: registerData.name,
      email: "fairuz@example.com",
      password: registerData.password,
    };

    await AllureHelper.parameter("Name", payload.name);
    await AllureHelper.parameter("Email", payload.email);
    await AllureHelper.parameter("Password", payload.password);

    await test.step(`Validate Response HTTP Status Code - ${testCaseName}`, async () => {
      await AllureHelper.attachRequest(payload);

      // Send the registration request and validate the HTTP status code
      registerResponse = await authAPI.register(payload);
      await AllureHelper.attachResponseHTTPStatusCode(registerResponse.status());
      await AllureHelper.attachResponseHeaders(registerResponse.headers());
      expect(registerResponse.status()).toBe(
        MessagesRegisterAssertion.authRegister.emailIsRegistered.expectedHTTPStatus,
      );
    });

    await test.step(`Validate Response Body - ${testCaseName}`, async () => {
      // Parse the response body and validate its contents
      registerResponseBody = await registerResponse.json();
      await AllureHelper.attachResponseBody(registerResponseBody);
      await RegisterAssertions.assertRegisterFailed(
        registerResponseBody,
        MessagesRegisterAssertion.authRegister.emailIsRegistered.expectedMessage,
        payload,
      );
    });

    await test.step(`Validate JSON Schemas - ${testCaseName}`, async () => {
      registerResponseBody = await registerResponse.json();
      await SchemaAssert(
        registerResponseBody,
        RegisterSchemaFailed,
        "JSON Schema Registration Failed",
      );
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

      await DatabaseAssertions.assertRecordExists(resultDb);
    });
  });
});
