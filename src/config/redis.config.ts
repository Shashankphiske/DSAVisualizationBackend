import Redis from "ioredis";
import { logger } from "../logger/logger";

const redisUrl = 'redis://127.0.0.1:6379';

const redisOptions = {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    retryStrategy: () => null,
};

const client = new Redis(redisUrl, redisOptions);
const pubClient = client.duplicate();
const subClient = client.duplicate();

// Attach error listeners to ALL clients to prevent "Unhandled error event"
const handleRedisError = (name: string) => (err: any) => {
    logger.error(`Redis [${name}] Error: ${err.message}`);
};

client.on("error", handleRedisError("Main"));
pubClient.on("error", handleRedisError("Pub"));
subClient.on("error", handleRedisError("Sub"));

client.on("connect", () => logger.info("Redis connected"));

export { client, pubClient, subClient };
