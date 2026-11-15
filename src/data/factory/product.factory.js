import { faker } from "@faker-js/faker";

export default class ProductFactory {
  static createRandomProduct(categories) {
    if (!categories || categories.length === 0) {
      throw new Error("Category data is required");
    }

    const selectedCategory = faker.helpers.arrayElement(categories);
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
      categoryId: selectedCategory.id,
    };
  }

  static updateRandomProduct(category_id) {
    if (!category_id || category_id.length === 0) {
      throw new Error("Category data is required");
    }
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
      categoryId: category_id,
    };
  }
}
