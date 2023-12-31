const poPDF = async (
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyZip,
  companyPhone,
  date,
  poNumber,
  vendorInvoice,
  vendorName,
  vendorAddress,
  vendorCity,
  vendorState,
  vendorZip,
  vendorGoods,
  vendorDescription,
  vendorCost
) => {
  // *** Create a new instance of jspdf class from the jspdf library.
  // The window object is a global object in the web browser environment
  // Here we are accessing the jspdf library globally.
  // Reference the script in the po-view.handlebars file and the library in js folder. ***
  const doc = new window.jspdf.jsPDF();

  // Company Name: Top Left Corner
  doc.setFontSize(16);
  doc.text(`${companyName}`, 20, 30);

  // PURCHASE ORDER: Top Right Corner
  doc.setFontSize(30);
  doc.setTextColor(100);
  doc.text("PURCHASE ORDER", 190, 20, null, null, "right");

  // Company Address and Phone Number: Under Company Name
  doc.setFontSize(12);
  doc.setTextColor("black");
  doc.text(`${companyAddress}`, 20, 40);
  doc.text(`${companyCity}, ${companyState}, ${companyZip}`, 20, 45);
  doc.text(`Phone: ${companyPhone}`, 20, 50);

  // Create a table for Date and PO #
  const labels = ["DATE", "PO #"]; // Column labels
  const values = [`${date}`, `${poNumber}`]; // Column values

  // Date and PO # table positioning
  const startX = 120;
  const startY = 30;
  // Date and PO # table cell dimensions
  const cellHeight = 10;
  const cellWidth = 40;

  // DATE and PO # table positioning, dimensions, and styling
  labels.forEach((label, index) => {
    const x = startX;
    const y = startY + index * cellHeight;
    // Add borders to the table
    doc.rect(x, y, cellWidth, cellHeight, "S");
    // Add text to the table
    doc.text(label, x + 5, y + cellHeight / 2, {
      align: "left",
      valign: "middle",
    });
  });

  // Actual date and actual PO # table positioning, dimensions, and styling
  values.forEach((value, index) => {
    const x = startX + cellWidth;
    const y = startY + index * cellHeight;
    // Add borders to the table
    doc.rect(x, y, cellWidth, cellHeight, "S");
    // Add text to the table
    doc.text(value, x + 5, y + cellHeight / 2, {
      align: "left",
      valign: "middle",
    });
  });

  // Add a table for the Vendor Information
  const vendorData = [
    ["Vendor Invoice", `${vendorInvoice}`, "", "", "", ""],
    ["Company", `${vendorName}`, "", "", "", ""],
    ["Address", `${vendorAddress}`, "", "", "", ""],
    ["City", `${vendorCity}`, "", "", "", ""],
    ["State", `${vendorState}`, "", "", "", ""],
    ["Zip", `${vendorZip}`, "", "", "", ""],
  ];

  // Vendor table positioning, dimensions, and styling
  const vendorOptions = {
    startY: 80,
    theme: "striped",
    styles: {
      fontSize: 12,
      cellPadding: 2,
      halign: "left",
      valign: "middle",
    },
  };

  // ~ Add the VENDOR table to the PDF document
  doc.autoTable({
    body: vendorData,
    ...vendorOptions,
  });

  // Add a table for the Vendor's Service and Description of Work
  const goodsData = [
    ["SERVICE", `${vendorGoods}`],
    ["DESCRIPTION", `${vendorDescription}`],
  ];

  // Styling for each column in the Service and Description table.
  const customStyles = [
    // Styling for the first column
    {
      fillColor: [206, 175, 175], // Fill color
      lineColor: [0, 0, 0], // Border color
      lineWidth: 0.5, // Border line width
      textColor: [0, 0, 0], // Text color
      fontSize: 12, // Font size
      fontStyle: "bold", // Font style
      halign: "left", // Horizontal alignment
      valign: "middle", // Vertical alignment
      cellPadding: 4, // Cell padding
    },
    // Styling for the second column
    {
      fillColor: [246, 246, 246], // Fill color
      lineColor: [0, 0, 0], // Border color
      lineWidth: 0.5, // Border line width (
    },
  ];

  // Service and Description table positioning, dimensions, and styling
  const goodsOptions = {
    // doc.autoTable.previous.finalY is used to retrieve the Y-coordinate of the bottom of the previously generated AutoTable
    startY: doc.autoTable.previous.finalY + 10,
    theme: "plain",
    styles: {},
    columnStyles: {
      0: customStyles[0], // Style First Column
      1: customStyles[1], // Style Second Column
    },
  };

  // ~ Add the Service and Description table to the PDF document
  doc.autoTable({
    body: goodsData,
    ...goodsOptions,
  });

  // Add a section for Total Cost
  const totalCostText = `Total Cost: $ ${vendorCost}`;
  doc.setFontSize(16);

  // Get the width of the page
  const pageWidth = doc.internal.pageSize.getWidth();

  // X-coordinate of the text
  const totalCostWidth = doc.getStringUnitWidth(totalCostText) * 16; // Assuming a font size of 16
  const totalCostX = pageWidth - totalCostWidth + 120; // Adjust the 20 as needed for margin

  // ~ Add the text to the PDF document (text, x, y, options)
  doc.text(totalCostText, totalCostX, doc.autoTable.previous.finalY + 20, {
    align: "right",
  });

  // Y-coordinate of the underline
  const underlineY = doc.autoTable.previous.finalY + 22;

  // ~ Add the underline to the PDF document
  const textWidth = doc.getTextWidth(totalCostText);
  doc.setLineWidth(0.5); // line width
  doc.setDrawColor(0); // color of the line

  // Start the line from the left of the text and end to the right of the text.
  // ( startX, startY, endX, endY)
  doc.line(totalCostX - textWidth, underlineY, totalCostX, underlineY);

  // Reset the font size to 12 (For any future updates to the PDF Creator)
  doc.setFontSize(12);

  // Save the PDF
  doc.save(`PO-${poNumber}.pdf`);
};

// Exporting poPDF as the default export of the module
// to make the poPDF module accessible in the importing module.
export default poPDF;
