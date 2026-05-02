import { SheetsRepository } from "../repositories/sheets.repository";
import { ReviewPayload } from "../types";

const repo = new SheetsRepository();

export class SheetsService {
  async sendReview(payload: ReviewPayload): Promise<void> {
    const { name, email, message } = payload;
    if (!name || !email || !message) {
      throw new Error("name, email, and message are required");
    }
    await repo.appendReview({ name, email, message });
  }
}
