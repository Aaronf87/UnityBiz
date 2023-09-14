const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector("#company-name").value.trim();
  const phone = document.querySelector("#phone-number").value.trim();
  const state = document.querySelector("#region").value.trim();
  const city = document.querySelector("#city").value.trim();
  const address = document.querySelector("#street-address").value.trim();
  const zip = document.querySelector("#postal-code").value.trim();
  const admin = document.querySelector("#company-admin").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (
    name &&
    phone &&
    state &&
    city &&
    address &&
    zip &&
    admin &&
    email &&
    password
  ) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/company", {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        state,
        city,
        address,
        zip,
        admin,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const companyData = await response.json();
      console.log(companyData.company.company_id);

      // Alert the user what their company ID is
      alert(
        `Company Successfully Created!\n 
        Save this Company ID somewhere safe!\n 
        Your Company ID is: ${companyData.company.company_id}`
      );

      // If successful, redirect the browser to the company page
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// Sign-Up Button
document.querySelector("#signUp").addEventListener("click", signupFormHandler);
