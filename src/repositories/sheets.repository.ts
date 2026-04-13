import { google } from "googleapis";
import { ReviewPayload } from "../types";

export class SheetsRepository {
  private readonly spreadsheetId: string;
  private readonly range = "Sheet1!A:C";
  private readonly sheets;

  constructor() {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
    const auth = new google.auth.JWT(
      process.env.ACCOUNT,
      undefined,
      process.env.KEY,
      scopes
    );
    this.sheets = google.sheets({ version: "v4", auth });
    this.spreadsheetId = process.env.SHEETID!;
  }

  async appendReview(payload: ReviewPayload): Promise<void> {
    const { name, email, message } = payload;
    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: this.range,
      valueInputOption: "RAW",
      requestBody: { values: [[name, email, message]] },
    });
  }
}
