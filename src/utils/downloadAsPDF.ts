import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadAsPDF = (id: string, title: string) => {
  const input: HTMLElement | null = document.getElementById(id);
  if (!input) return;
  const pdf = new jsPDF("p", "mm", "a4");
  const padding = 10;
  const pageWidth = pdf.internal.pageSize.getWidth() - padding * 2;
  const pageHeight = pdf.internal.pageSize.getHeight() - padding * 2;
  const imgWidth = pageWidth;
  html2canvas(input, { scale: 1 }).then((canvas) => {
    const totalCanvasHeight = canvas.height;
    let currentY = 0;
    while (currentY < totalCanvasHeight) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      // Calculate height available
      const availableHeight = pageHeight * (canvas.width / imgWidth);
      tempCanvas.height = Math.min(canvas.height - currentY, availableHeight);
      const tempContext = tempCanvas.getContext("2d");
      if (tempContext) {
        tempContext.drawImage(
          canvas,
          0,
          currentY,
          canvas.width,
          tempCanvas.height,
          0,
          0,
          canvas.width,
          tempCanvas.height
        );
        const tempImgData = tempCanvas.toDataURL("image/png");
        // Calculate the height
        const tempImgHeight = (tempCanvas.height * imgWidth) / canvas.width;
        pdf.addImage(
          tempImgData,
          "PNG",
          padding,
          padding,
          imgWidth,
          tempImgHeight
        );
        currentY += tempCanvas.height;
        if (currentY < totalCanvasHeight) {
          pdf.addPage();
        }
      }
    }
    pdf.save(`${title}.pdf`);
  });
};
