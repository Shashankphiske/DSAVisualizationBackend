import type { Request, Response } from "express";
import { client } from "../config/redis.config";
import { logger } from "../logger/logger";

const USER_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

function buildKey(ip: string, dsaType: string): string {
    const safeType = dsaType.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    return `user:${ip}:${safeType}`;
}

function getClientIp(req: Request): string {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
        // x-forwarded-for can be a comma-separated list; take the first (original) IP
        return (Array.isArray(forwarded) ? forwarded[0] : forwarded)
            .split(",")[0]
            .trim();
    }
    return req.socket.remoteAddress || "unknown";
}

export class UserController {

    async getSolvedQuestions(req: Request, res: Response): Promise<void> {
        const dsatype = req.params.dsatype as string;
        const ip = getClientIp(req);
        const key = buildKey(ip, dsatype);

        try {
            const raw = await client.get(key);

            if (!raw) {
                logger.info(`User progress MISS — key: ${key}`);
                res.status(200).json({ dsaType: dsatype, solvedQuestions: [] });
                return;
            }

            logger.info(`User progress HIT — key: ${key}`);
            const solvedQuestions: number[] = JSON.parse(raw);
            res.status(200).json({ dsaType: dsatype, solvedQuestions });

        } catch (err: any) {
            logger.error(`GET /users/${dsatype} failed: ${err.message}`);
            res.status(500).json({ error: "Failed to retrieve progress." });
        }
    }

    async saveSolvedQuestions(req: Request, res: Response): Promise<void> {
        const dsatype = req.params.dsatype as string;
        const ip = getClientIp(req);
        const key = buildKey(ip, dsatype);

        const { solvedQuestions } = req.body as { solvedQuestions?: number[] };

        if (!Array.isArray(solvedQuestions)) {
            res.status(400).json({
                error: "Request body must contain a 'solvedQuestions' array.",
            });
            return;
        }

        const allNumbers = solvedQuestions.every(
            (q) => typeof q === "number" && Number.isFinite(q)
        );
        if (!allNumbers) {
            res.status(400).json({
                error: "'solvedQuestions' must be an array of numbers.",
            });
            return;
        }

        try {
            await client.setex(key, USER_TTL_SECONDS, JSON.stringify(solvedQuestions));

            logger.info(`User progress saved — key: ${key}, count: ${solvedQuestions.length}`);

            res.status(200).json({
                dsaType: dsatype,
                solvedQuestions,
                expiresInDays: 7,
            });

        } catch (err: any) {
            logger.error(`POST /users/${dsatype} failed: ${err.message}`);
            res.status(500).json({ error: "Failed to save progress." });
        }
    }
}