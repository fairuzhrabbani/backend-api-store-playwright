export const MessagesRegisterAssertion = {
  authRegister: {
    success: {
      expectedMessage: "User registered successfully",
      expectedHTTPStatus: 201,
    },

    emailIsRegistered: {
      expectedMessage: "Email is already registered",
      expectedHTTPStatus: 409,
    },

    emptyFields: {
      expectedMessage: "Name, email, and password are required",
      expectedHTTPStatus: 400,
    },

    wrongEmailFormat: {
      expectedMessage: "Email address must be a valid email format",
      expectedHTTPStatus: 400,
    },
  },
};
