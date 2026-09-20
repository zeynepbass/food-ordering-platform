import dbConnect from "@/server/dbConnect";

const resolveStatus = (error) => {
  if (error.status) return error.status;
  if (error.name === "ValidationError" || error.name === "CastError") return 400;
  return 500;
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
      res.status(status).json({
        message: status === 500 ? "Internal server error" : error.message,
      });
    }
  };

export default createHandler;
