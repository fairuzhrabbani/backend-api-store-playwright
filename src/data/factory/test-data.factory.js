import { faker } from "@faker-js/faker";

class TestDataFactory {
  static createRandomUserRegistration() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "Password123",
    };
  }

  static createRandomCreateCategory() {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    };
  }
}

export default TestDataFactory;
