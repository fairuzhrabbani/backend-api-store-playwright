import { faker } from "@faker-js/faker";

export default class RegisterFactory {
  static createRandomUserRegistration() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "Password123",
    };
  }
}
