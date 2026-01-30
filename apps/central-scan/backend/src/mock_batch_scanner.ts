import {
  BatchControl,
  BatchScanner,
  ScannedSheetInfo,
} from './fujitsu_scanner';

/* eslint-disable @typescript-eslint/require-await */

/**
 * A mock batch scanner for use with the dev dock. Sheets are added via the dev
 * dock UI and returned when the app initiates a scan batch.
 */
export class MockBatchScanner implements BatchScanner {
  private sheets: ScannedSheetInfo[] = [];

  addSheet(frontPath: string, backPath: string): void {
    this.sheets.push({ frontPath, backPath });
  }

  clearSheets(): void {
    this.sheets = [];
  }

  getSheetCount(): number {
    return this.sheets.length;
  }

  isAttached(): boolean {
    return true;
  }

  async isImprinterAttached(): Promise<boolean> {
    return false;
  }

  scanSheets(): BatchControl {
    const sheets = [...this.sheets];
    let index = 0;

    return {
      async scanSheet(): Promise<ScannedSheetInfo | undefined> {
        const sheet = sheets[index];
        index += 1;
        return sheet;
      },

      async endBatch(): Promise<void> {
        index = Infinity;
      },
    };
  }
}
