import mongoose from "mongoose";

const cache = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

const dbConnect = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};

export default dbConnect;
