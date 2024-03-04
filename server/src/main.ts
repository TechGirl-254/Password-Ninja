import fastify, { FastifyInstance } from "fastify";
import createServer from "./utils/createServer";
import logger from "./utils/logger";
import { connectToDB, disconnectDB } from "./utils/db";

console.log("Hello from main");

const gracefulShutdown = (signal: string, app: FastifyInstance) => {
  process.on(signal, async () => {
    logger.info(`Goodbye! Got signal ${signal}`);

    app.close();

    await disconnectDB();

    logger.info("Database shutting down.");

    process.exit(0);
  });
};

const main = async () => {
  const app = createServer();

  try {
    const url = await app.listen({
      port: 4000,
      host: "0.0.0.0",
    });

    logger.info(`The server is ready at ${url}`);

    await connectToDB(); //this line was the problem
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }

  const signals = ["SIGTERM", "SIGINT"];

  for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i], app);
  }
};
main();
