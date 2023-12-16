// pdfUtils.js

import { jsPDF } from "jspdf";

export const generatePDF = (title, description, imageUrl, itineraryItems) => {
  const doc = new jsPDF();

  // Customize your PDF content here
  doc.text(title, 20, 30);

  // Sanitize HTML content in description
  const descriptionText = new DOMParser().parseFromString(
    description,
    "text/html"
  ).body.textContent;
  doc.text(descriptionText, 20, 40);

  // Add image if imageUrl is provided
  if (imageUrl) {
    const imgData = imageUrl; // Replace with your image data
    doc.addImage(imgData, "JPEG", 15, 50, 180, 100);
  }

  // Add itinerary items if itineraryItems is defined
  if (itineraryItems) {
    let yOffset = 60;
    itineraryItems.forEach((item, idx) => {
      doc.text(20, yOffset, `Itinerary Item ${idx + 1}`);
      doc.text(40, yOffset + 10, `Title: ${item.title}`);
      doc.text(40, yOffset + 20, `Description: ${item.description}`);
      yOffset += 30;
    });
  }

  return doc;
};
