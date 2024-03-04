import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../constants";
import logger from "./logger";

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://0.0.0.0:27017/password-ninja"

      // "mongodb+srv://admin:12121212W%40mmy@safepassapp.ffopgd5.mongodb.net/?retryWrites=true&w=majority&appName=SafePassApp"
    );
    logger.info("Database successfully connected");
  } catch (error) {
    logger.error(error, "Error connecting to database");
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  logger.info("Disconnecting from database");
  return;
};
