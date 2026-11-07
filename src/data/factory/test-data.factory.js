import { faker } from "@faker-js/faker";

class TestDataFactory {
  static createRandomUserRegistration() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "Password123",
    };
  }
}

export default TestDataFactory;
