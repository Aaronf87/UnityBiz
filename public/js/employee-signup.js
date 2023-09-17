const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const companyId = document.querySelector("#company-id").value.trim();
  const firstName = document.querySelector("#first-name").value.trim();
  const lastName = document.querySelector("#last-name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  // If the fields are not empty, send a POST request to the API endpoint
  if (companyId && firstName && lastName && email && username && password) {
    const requestData = {
      company_id: companyId, // Make sure the server is expecting snake_case
      first_name: firstName, // Make sure the server is expecting snake_case
      last_name: lastName, // Make sure the server is expecting snake_case
      email,
      username,
      password,
    };

    // Send a POST request to the API endpoint
    const response = await fetch("/api/employee", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { "Content-Type": "application/json" },
    });

    // If successful, alert the user
    if (response.ok) {
      const employeeData = await response.json();

      // Alert the user what their Employee ID is
      alert(`${employeeData.message}`);

      // If successful, redirect the browser to the homepage
      document.location.replace("/home");
    } else {
      alert(response.statusText);
    }
  } else {
    // If the fields are empty, alert the user
    alert("Form must not be empty");
  }
};

// Employee Sign-Up Button
document.querySelector("#sign-up").addEventListener("click", signupFormHandler);
