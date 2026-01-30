import { Buffer } from 'node:buffer';
import { CanvasGradient, CanvasPattern, ImageData, createCanvas } from 'canvas';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { iter } from '@votingworks/basics';
import { tmpNameSync } from 'tmp';
import { writeImageData } from './image_data';

/**
 * A page of a PDF document.
 */
export interface PdfPage {
  readonly pageNumber: number;
  readonly pageCount: number;
  readonly page: ImageData;
}

/** Options for {@link pdfToImages}. */
export interface PdfToImagesOptions {
  background?: string | CanvasGradient | CanvasPattern;

  /** @default 1 */
  scale?: number;
}

/**
 * Renders PDF pages as images. This function consumes the data source, leaving
 * the caller with an empty `Uint8Array` when this function resolves. Be sure to
 * clone the data if you need it afterward.
 */
export async function* pdfToImages(
  pdfBytes: Uint8Array,
  opts: PdfToImagesOptions = {}
): AsyncIterable<PdfPage> {
  const { background, scale = 1 } = opts;
  const { default: pdfjs } = await import('pdfjs-dist/legacy/build/pdf.js');
  const canvas = createCanvas(0, 0);
  const context = canvas.getContext('2d');

  // Consumes `pdfBytes` here:
  const pdf = await pdfjs.getDocument(
    // pdfjs-dist wants a `Uint8Array`, not a `Buffer`
    Buffer.isBuffer(pdfBytes)
      ? new Uint8Array(
          pdfBytes.buffer,
          pdfBytes.byteOffset,
          pdfBytes.byteLength
        )
      : pdfBytes
  ).promise;

  // Yes, 1-indexing is correct.
  // https://github.com/mozilla/pdf.js/blob/6ffcedc24bba417694a9d0e15eaf16cadf4dad15/src/display/api.js#L2457-L2463
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport,
      background,
    }).promise;

    yield {
      pageCount: pdf.numPages,
      pageNumber: i,
      page: context.getImageData(0, 0, canvas.width, canvas.height),
    };
  }
}

/**
 * Standard scale factor for rendering PDFs at scanner resolution (200 DPI).
 * PDFs use 72 points per inch as their base unit, so this converts to 200 DPI.
 */
export const SCANNER_DPI_SCALE = 200 / 72;

/**
 * Renders the first two pages of a PDF as image files, representing the front
 * and back of a scanned ballot sheet. Images are written as PNG files to
 * temporary paths.
 *
 * @param pdfData The raw PDF data. Note: this data is consumed by the
 *   underlying PDF renderer and will be empty after this function returns.
 * @returns Paths to the front and back image files as a `[front, back]` tuple.
 */
export async function pdfToSheetImageFiles(
  pdfData: Uint8Array
): Promise<[string, string]> {
  const paths = await iter(pdfToImages(pdfData, { scale: SCANNER_DPI_SCALE }))
    .take(2)
    .map(async ({ page }) => {
      const path = tmpNameSync({ postfix: '.png' });
      await writeImageData(path, page);
      return path;
    })
    .toArray();

  if (paths.length < 2) {
    throw new Error(
      `expected PDF to have at least 2 pages, got ${paths.length}`
    );
  }

  return [paths[0], paths[1]];
}

/**
 * Parse PDF data with `pdf.js` to get a object with the number of pages and
 * viewport size, among other metadata. Useful when you want to inspect PDF
 * metadata but don't need to render the PDF.
 *
 * Consumes `pdfBytes`, replacing it with an empty array.
 */
export async function parsePdf(
  pdfBytes: Uint8Array
): Promise<PDFDocumentProxy> {
  const { default: pdfjs } = await import('pdfjs-dist/legacy/build/pdf.js');
  const pdf = await pdfjs.getDocument(pdfBytes).promise;
  return pdf;
}

/**
 * Parse PDF data with `pdf.js` to get the number of pages in the PDF. Useful
 * when you want to know how many pages are in a PDF without rendering it.
 *
 * Consumes `pdfBytes`, replacing it with an empty array.
 */
export async function getPdfPageCount(pdfBytes: Uint8Array): Promise<number> {
  const pdf = await parsePdf(pdfBytes);
  return pdf.numPages;
}
