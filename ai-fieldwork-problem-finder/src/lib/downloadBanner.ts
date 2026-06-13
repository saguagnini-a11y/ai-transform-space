import html2canvas from "html2canvas";

/* PNG chosen over PDF: html2canvas rasterizes the pixel fonts and SVG
   sprites faithfully, which jsPDF's text layer would not. */
export async function downloadBannerPng(el: HTMLElement, filename: string): Promise<void> {
  await document.fonts.ready;
  const canvas = await html2canvas(el, {
    backgroundColor: "#1A1A2E",
    scale: 2,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
