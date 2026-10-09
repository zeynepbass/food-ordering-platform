import dbConnect from "@/server/dbConnect";

const DUPLICATE_KEY = 11000;

const resolveStatus = (error) => {
  if (error.status) return error.status;
  if (error.name === "ValidationError" || error.name === "CastError") return 400;
  if (error.code === DUPLICATE_KEY) return 409;
  return 500;
};

const resolveMessage = (error, status) => {
  if (status === 500) return "Internal server error";
  if (error.name === "CastError") return "Invalid identifier";
  return error.message;
};

const createHandler =
  (methods, { withDb = true } = {}) =>
  async (req, res) => {
    const handler = methods[req.method];

    if (!handler) {
      res.setHeader("Allow", Object.keys(methods));
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    try {
      if (withDb) {
        await dbConnect();
      }
      await handler(req, res);
    } catch (error) {
      const status = resolveStatus(error);

      if (status === 500) {
        console.error(`[api] ${req.method} ${req.url}`, error);
      }

      res.status(status).json({ message: resolveMessage(error, status) });
    }
  };

export default createHandler;
