import type { Request } from "express"
import crypto from "crypto";

class RedisUtils {
    static generateKey = (req: Request): string => {
        const resource = (req.baseUrl.split("/").pop() || "GLOBAL").toUpperCase();
        const path = req.path.replace(/\/&/, "");
        
        const bodyString = JSON.stringify(req.body); 
        const bodyHash = crypto.createHash("md5").update(bodyString).digest("hex");

        return `v1:cache:${resource}:${path}:${bodyHash}`;
    }
}

export { RedisUtils }