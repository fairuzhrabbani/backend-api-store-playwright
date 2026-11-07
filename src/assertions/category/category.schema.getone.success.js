export const CategorySchemaGetOneSuccess = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
    },
    data: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
      },
      required: ["id", "name", "description"],
    },
  },
  required: ["success", "data"],
};
