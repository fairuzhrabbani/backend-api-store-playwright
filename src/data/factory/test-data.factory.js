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

  static createRandomProductCategory(categories) {
    if (!categories || categories.length === 0) {
      throw new Error("Category data is required");
    }

    const selectedCategory = faker.helpers.arrayElement(categories);

    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.float({
        min: 10000,
        max: 999999999,
        fractionDigits: 2,
      }),
      stock: faker.number.int({
        min: 0,
        max: 1000,
      }),
      categoryId: selectedCategory.id,
    };
  }
}

export default TestDataFactory;
