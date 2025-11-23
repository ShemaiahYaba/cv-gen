import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const exportToPdfAdvanced = async (
  element: HTMLElement,
  filename: string = "cv-resume.pdf"
): Promise<void> => {
  try {
    if (!element) {
      throw new Error("Element to export is not defined");
    }

    // Store original styles and attributes
    const originalStyles = {
      position: element.style.position,
      visibility: element.style.visibility,
      opacity: element.style.opacity,
      height: element.style.height,
      width: element.style.width,
      overflow: element.style.overflow,
    };

    // Make element visible and properly sized for capture
    element.style.position = "relative";
    element.style.visibility = "visible";
    element.style.opacity = "1";
    element.style.height = "auto";
    element.style.width = "100%";
    element.style.overflow = "visible";

    // Force a reflow to ensure styles are applied
    const reflow = element.offsetHeight;

    // Wait for fonts and images to load
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 500)); // Additional delay for content to render

    // Create canvas with high quality settings
    const canvas = await html2canvas(element, {
      scale: 2, // Reduced scale for better performance
      useCORS: true,
      logging: true, // Enable logging to help with debugging
      backgroundColor: "#ffffff",
      allowTaint: true,
      removeContainer: true,
      onclone: (clonedDoc, element) => {
        // Ensure all elements are visible in the cloned document
        const elements = element.querySelectorAll("*");
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            htmlEl.style.boxShadow = "none";
            htmlEl.style.outline = "none";
          }
        });
      },
    });

    // Restore original styles
    Object.assign(element.style, originalStyles);

    if (!canvas) {
      throw new Error("Failed to capture element");
    }

    // Calculate PDF dimensions (A4 aspect ratio)
    const pdfAspectRatio = 1.414; // A4 aspect ratio (height/width)
    let imgWidth = 8.27; // A4 width in inches (210mm)
    let imgHeight = (imgWidth * canvas.height) / canvas.width;

    // Adjust dimensions to fit A4
    if (imgHeight > imgWidth * pdfAspectRatio) {
      imgHeight = imgWidth * pdfAspectRatio;
      imgWidth = (imgHeight * canvas.width) / canvas.height;
    }

    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? "portrait" : "landscape",
      unit: "in",
      format: [imgWidth, imgHeight],
    });

    // Add image to PDF
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

    // Save PDF
    pdf.save(filename);
  } catch (error) {
    console.error("PDF export failed:", error);
    throw new Error("Failed to export PDF. Please try again.");
  }
};

export const generatePdfFilename = (name: string): string => {
  const sanitized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return sanitized ? `${sanitized}-cv.pdf` : "cv-resume.pdf";
};
