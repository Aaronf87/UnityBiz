const poFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form (id's from po.handlebars) and data from the datasets
  const po_number = document.querySelector("#po-number").value.trim();
  const invoice_number = document.querySelector("#invoice-number").value.trim();
  const goods = document.querySelector("#po-goods").value.trim();
  const description = document.querySelector("#description").value.trim();
  const cost = document.querySelector("#cost").value.trim();
  const vendor_name = document.querySelector("#po-vendor-name").value.trim();
  const vendor_address = document.querySelector("#po-vendor-address").value.trim();
  const vendor_city = document.querySelector("#po-vendor-city").value.trim();
  const vendor_state = document.querySelector("#po-vendor-state").value.trim();
  const vendor_zip = document.querySelector("#po-vendor-zipcode").value.trim();
  const company_id = document.querySelector("#company-name").dataset.id;
  const employee_id = document.querySelector("#company-name").dataset.user;

  // If the fields are not empty, send a POST request to the API endpoint
  if (
    po_number &&
    invoice_number &&
    goods &&
    description &&
    cost &&
    vendor_name &&
    vendor_address &&
    vendor_city &&
    vendor_state &&
    vendor_zip &&
    company_id &&
    employee_id
  ) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/po", {
      method: "POST",
      body: JSON.stringify({
        po_number,
        invoice_number,
        goods,
        description,
        cost,
        vendor_name,
        vendor_address,
        vendor_city,
        vendor_state,
        vendor_zip,
        company_id,
        employee_id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // If successful, alert the user
    if (response.ok) {
      // Alert the user what their PO # is
      const poData = await response.json();
      alert(`PO #${poData.po.po_number} created successfully!`);

      // If successful, redirect the browser to the View PO page
      document.location.replace("/po/view");
    } else {
      alert("Failed to create PO");
    }
  } else {
    alert("Form must not be empty");
  }
};

// Sign-Up Button
document.querySelector(".submit-btn").addEventListener("click", poFormHandler);
