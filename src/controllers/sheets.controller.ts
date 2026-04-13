import { Request, Response } from "express";
import { SheetsService } from "../services/sheets.service";

const service = new SheetsService();

export class SheetsController {
  async sendReview(req: Request, res: Response): Promise<void> {
    try {
      await service.sendReview(req.body);
      res.status(200).json({ message: "sent" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send review";
      res.status(400).json({ message });
    }
  }
}
