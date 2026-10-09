import HttpError from "@/server/HttpError";

const validate = async (schema, data) => {
  try {
    return await schema.validate(data, { stripUnknown: true });
  } catch (error) {
    const message = error.name === "ValidationError" ? error.message : "Invalid request data";
    throw new HttpError(400, message);
  }
};

export default validate;
