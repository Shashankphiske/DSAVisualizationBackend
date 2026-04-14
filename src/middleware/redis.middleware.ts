import type { NextFunction, Request, Response } from "express"
import { RedisUtils } from "../utils/redis.utils";
import { logger } from "../logger/logger";
import { client } from "../config/redis.config";

class CacheMiddleware {
    constructor(private cacheClient: any) {}

    cacheRequest = (ttl: number) => {
        return async (req: Request, res: Response, next: NextFunction) => {

            const key = RedisUtils.generateKey(req);

            const cachedData = await this.cacheClient.get(key);
            if(cachedData) {
                logger.info("Redis Cache 'HIT' for key:", {
                    key
                });

                return res.status(200).json(JSON.parse(cachedData));
            }

            logger.info("Redis Cache 'MISS' for key:", {
                key
            });

            const originalJson = res.json.bind(res);

            res.json = (body: any): Response => {
                this.cacheClient.setex(key, ttl, JSON.stringify(body));
                return originalJson(body);
            }

            return next();

        }
    }
}

const cacheMiddleware = new CacheMiddleware(client);

export { CacheMiddleware, cacheMiddleware }