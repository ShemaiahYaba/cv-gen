import html2pdf from "html2pdf.js";

export interface PdfExportOptions {
  filename?: string;
  margin?: number | [number, number, number, number];
  image?: { type: "jpeg" | "png" | "webp"; quality: number };
  html2canvas?: {
    scale?: number;
    useCORS?: boolean;
    [key: string]: any; // Allow additional html2canvas options
  };
  jsPDF?: {
    unit?: string;
    format?: string | [number, number];
    orientation?: "portrait" | "landscape";
  } & Record<string, any>; // Allow additional jsPDF options
  [key: string]: any; // Allow additional html2pdf options
}

/**
 * Export a DOM element to PDF
 * @param element - The HTML element to export (typically the CV preview)
 * @param options - Configuration options for the PDF export
 */
export const exportToPdf = async (
  element: HTMLElement,
  options: PdfExportOptions = {}
): Promise<void> => {
  const defaultOptions: PdfExportOptions = {
    filename: "cv-resume.pdf",
    margin: [0.5, 0.5, 0.5, 0.5], // inches: top, right, bottom, left
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: {
      scale: 2, // Higher quality
      useCORS: true,
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    // Clone the element to avoid affecting the original
    const clone = element.cloneNode(true) as HTMLElement;

    // Apply styles to ensure proper PDF rendering
    clone.style.width = "8.5in";
    clone.style.minHeight = "11in";
    clone.style.background = "white";
    clone.style.boxShadow = "none";

    const { filename, ...html2pdfOptions } = mergedOptions;

    // Create PDF
    const worker = html2pdf()
      .set({
        ...html2pdfOptions,
        filename: filename || "cv-resume.pdf",
      })
      .from(clone);

    // Save the PDF
    await worker.save();
  } catch (error) {
    console.error("PDF export failed:", error);
    throw new Error("Failed to export PDF. Please try again.");
  }
};

/**
 * Generate contact-based filename for the CV
 */
export const generatePdfFilename = (name: string): string => {
  const sanitized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return sanitized ? `${sanitized}-cv.pdf` : "cv-resume.pdf";
};
