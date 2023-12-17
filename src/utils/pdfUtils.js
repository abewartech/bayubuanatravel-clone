import { jsPDF } from "jspdf";

export const generatePDF = (
  productData,
  qty,
  totalPrice,
  itineraryItems,
  callback
) => {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4", // or other page formats
    orientation: "portrait", // or 'landscape'
    margin: { top: 10, right: 10, bottom: 10, left: 10 }
  });

  // Add header information
  doc.setFontSize(14);
  doc.text("MARINA RAJA AMPAT", 20, 20);
  doc.text(
    "Ruko Dharmawangsa No 29. Jl Dharmawangsa VI Kebayoran Baru",
    20,
    30
  );

  doc.text("Jakarta", 20, 40);

  // Add detail package tour information
  doc.setFontSize(16);
  doc.text("Detail Package Tour", 20, 60);
  doc.text(productData.title || "", 20, 70);

  // Determine the currency symbol based on the language
  const currencySymbol = productData.lang === "en" ? "USD" : "IDR";

  // Add base price information
  const basePriceText = `${currencySymbol} ${
    productData.base_price_usd !== null
      ? productData.base_price_usd
      : productData.base_price || 0
  }`;
  doc.setFontSize(12);
  doc.text(basePriceText, 20, 80);

  // Sanitize HTML content in description
  const descriptionText = productData.description || "";
  doc.text(descriptionText, 20, 90);

  // Add a line break after description
  doc.text("", 20, 110);

  // Add image if imageUrl is provided
  if (productData.image_url) {
    const imgData = productData.image_url; // Replace with your image data
    doc.addImage(imgData, "JPEG", 15, 120, 180, 100);
  }

  // Add itinerary section
  doc.setFontSize(16);
  doc.text("Itinerary", 20, 110);

  // Add itinerary items if productData.product_subs is defined
  // Add itinerary items if productData.product_subs is defined
  // Add itinerary items if itineraryItems is defined
  if (itineraryItems) {
    let yOffset = 120;
    itineraryItems.forEach((item, idx) => {
      doc.setFontSize(12);
      // Use idx + 1 as the default day number
      const dayNumber = idx + 1;
      doc.text(`Day ${dayNumber}`, 20, yOffset);
      doc.text(item.title || "", 30, yOffset + 10);
      doc.text(item.description || "", 30, yOffset + 20);
      yOffset += 30;
    });
  }

  // Add order summary
  doc.setFontSize(16);
  doc.text("Order Summary", 20, 220);
  doc.text(`Quantity: ${qty}`, 20, 230);
  doc.text(`Total Price: ${currencySymbol} ${totalPrice.toFixed(2)}`, 20, 240);

  // Call the callback function with the generated PDF
  callback(doc);
};
