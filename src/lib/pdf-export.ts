import html2pdf from "html2pdf.js";

// In src/lib/pdf-export.ts

// In src/lib/pdf-export.ts

export interface PdfExportOptions {
  filename?: string;
  margin?: number | [number, number, number, number];
  image?: {
    type: "jpeg" | "png" | "webp";
    quality: number;
  };
  html2canvas?: {
    scale: number;
    useCORS: boolean;
    letterRendering?: boolean;
    logging?: boolean;
    scrollY?: number;
    scrollX?: number;
  };
  jsPDF?: {
    unit: string;
    format: string | [number, number]; // Added support for custom dimensions
    orientation: "portrait" | "landscape"; // Made orientation more specific
  };
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
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 3, // Even higher quality for crisp text
      useCORS: true,
      letterRendering: true, // Better text rendering
      logging: false,
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
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
    clone.style.transform = "none";

    // Add PDF-specific class for styling
    clone.classList.add("pdf-export-ready");

    // Force all styles to be inline for better rendering
    const computedStyles = window.getComputedStyle(element);
    clone.style.fontFamily = computedStyles.fontFamily;
    clone.style.fontSize = computedStyles.fontSize;
    clone.style.lineHeight = computedStyles.lineHeight;

    // Ensure all fonts are loaded before rendering
    await document.fonts.ready;

    await html2pdf().set(mergedOptions).from(clone).save();
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
