export const CategorySchemaCreateSuccess = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
    },
    message: {
      type: "string",
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
  required: ["success", "message", "data"],
};
