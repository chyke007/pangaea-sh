import mongoose from "mongoose";
import { DB_URL } from "../../config";

export default () => {
  process.env.NODE_ENV !== "test" && console.log("connecting to mongo...");
  const connectWithRetry = () => {
    mongoose.connect(DB_URL);
  };
  mongoose.connection.on("error", () => {
    connectWithRetry();
    console.log("Could not connect to MongoDB");
  });

  mongoose.connection.on("disconnected", () => {
    process.env.NODE_ENV !== "test" && console.log("Lost MongoDB connection...");
    if (process.env.NODE_ENV !== "test") connectWithRetry();
  });

  mongoose.connection.on("connected", async () => {
    process.env.NODE_ENV !== "test" && console.log("Connection established to MongoDB");
  });

  mongoose.connection.on("reconnected", () =>
    console.log("Reconnected to MongoDB")
  );

  connectWithRetry();
};