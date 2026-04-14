import dotenv from "dotenv";
import Redis from "ioredis";
import { logger } from "../logger/logger";

dotenv.config();

const redisOptions = {
    maxRetriesPerRequest: null,
    enableReadyCheck: false
}

const client = new Redis(process.env.REDIS_URL ?? "", redisOptions);

client.on("error", (err: any) => {
    logger.error(err.message);
    throw new Error(err);
});

const pubClient = client.duplicate();
const subClient = client.duplicate();

logger.info("Redis connected");

export { client, pubClient, subClient };