import { faker } from "@faker-js/faker";

export default class ProductFactory {
  static createPayload(categoryId) {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({
        min: 100000,
        max: 20000000,
      }),
      stock: faker.number.int({
        min: 1,
        max: 100,
      }),
      categoryId,
    };
  }

  static updatePayload(categoryId) {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({
        min: 100000,
        max: 20000000,
      }),
      stock: faker.number.int({
        min: 1,
        max: 100,
      }),
      categoryId,
    };
  }
}
