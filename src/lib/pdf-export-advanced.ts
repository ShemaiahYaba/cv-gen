export const exportToPdfAdvanced = async (
  element: HTMLElement,
  filename: string = "cv-resume.pdf"
): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("PDF export can only be run in the browser");
  }

  try {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    if (!element) {
      throw new Error("Element to export is not defined");
    }

    // Create a hidden container with fixed dimensions
    const exportContainer = document.createElement("div");
    exportContainer.style.position = "fixed";
    exportContainer.style.top = "-9999px";
    exportContainer.style.left = "-9999px";
    exportContainer.style.width = "816px"; // 8.5in at 96dpi
    exportContainer.style.minHeight = "1056px"; // 11in at 96dpi
    exportContainer.style.backgroundColor = "#ffffff";
    exportContainer.style.overflow = "visible";
    exportContainer.style.zIndex = "-1";

    // Clone the element
    const clone = element.cloneNode(true) as HTMLElement;

    // Force fixed dimensions and remove responsive classes
    clone.style.width = "816px";
    clone.style.minHeight = "1056px";
    clone.style.maxWidth = "816px";
    clone.style.padding = "48px"; // 0.5in margins at 96dpi
    clone.style.margin = "0";
    clone.style.backgroundColor = "#ffffff";
    clone.style.boxSizing = "border-box";
    clone.style.overflow = "visible";
    clone.style.transform = "none";
    clone.style.position = "relative";

    // Remove aspect ratio constraint that causes issues
    clone.style.aspectRatio = "auto";
    clone.style.fontSize = "14px"; // Ensure consistent font size

    // Append clone to container and container to body
    exportContainer.appendChild(clone);
    document.body.appendChild(exportContainer);

    // Wait for layout and fonts
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create canvas with high quality settings
    const canvas = await html2canvas(clone, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      windowWidth: 816,
      windowHeight: 1056,
      width: 816,
      height: Math.max(clone.scrollHeight, 1056),
      onclone: (clonedDoc, clonedElement) => {
        // Force consistent styling
        clonedElement.style.width = "816px";
        clonedElement.style.maxWidth = "816px";
        clonedElement.style.aspectRatio = "auto";

        // Remove shadows and outlines
        const allElements = clonedElement.querySelectorAll("*");
        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            htmlEl.style.boxShadow = "none";
            htmlEl.style.outline = "none";
            htmlEl.style.aspectRatio = "auto";
          }
        });
      },
    });

    // Clean up
    document.body.removeChild(exportContainer);

    if (!canvas) {
      throw new Error("Failed to capture element");
    }

    // Calculate PDF dimensions
    const pdfWidth = 8.5; // inches
    const pdfHeight = 11; // inches
    const canvasAspectRatio = canvas.height / canvas.width;
    const pdfAspectRatio = pdfHeight / pdfWidth;

    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth * canvasAspectRatio;

    // If content is taller than one page, adjust accordingly
    if (canvasAspectRatio > pdfAspectRatio) {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight / canvasAspectRatio;
    }

    // Create PDF with letter size
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });

    // Center the image if it doesn't fill the width
    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = 0;

    // Add image to PDF
    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    pdf.addImage(
      imgData,
      "JPEG",
      xOffset,
      yOffset,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );

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
