export const MessagesAuthAssertion = {
  authLogin: {
    success: {
      expectedMessage: "Login successful",
      expectedHTTPStatus: 200,
    },

    invalidCredentials: {
      expectedMessage: "Invalid email or password",
      expectedHTTPStatus: 401,
    },

    emptyFields: {
      expectedMessage: "Email and password are required",
      expectedHTTPStatus: 400,
    },
  },
};
