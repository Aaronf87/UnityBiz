const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log("Sign-Up Button Clicked!"); // Log statement to test function
    // Collect values from the signup form
    const companyId = document.querySelector("#company-id").value.trim();
    const firstName = document.querySelector("#first-name").value.trim();
    const lastName = document.querySelector("#last-name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    console.log("Form Data:", {
      companyId,
      firstName,
      lastName,
      email,
      username,
      password,
    }); // Log form data
  
    if (
      companyId &&
      firstName &&
      lastName &&
      email &&
      username &&
      password
    ) {
      const requestData = {
        company_id: companyId, // Make sure the server is expecting snake_case
        first_name: firstName, // Make sure the server is expecting snake_case
        last_name: lastName, // Make sure the server is expecting snake_case
        email,
        username,
        password,
      };
  
      console.log("Request Data:", requestData); // Log data that will be sent in the request
  
      // Send a POST request to the API endpoint
      const response = await fetch("/api/employee", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response Status:", response.status); // Log response status
  
      if (response.ok) {
        const employeeData = await response.json();
        console.log("Response Data:", employeeData); // Log response data
  
        // Alert the user what their Employee ID is
        alert(
          `Employee Successfully Created!\n 
          Save this Employee ID somewhere safe!\n 
          Your Employee ID is: ${employeeData.employee.employee_id}`
        );
  
        // If successful, redirect the browser to the homepage or any other page
        document.location.replace("/");
      } else {
        console.log("Response Text:", response.statusText); // Log response text if not OK
        alert(response.statusText);
      }
    }
  };
  
  // Sign-Up Button
  document.querySelector("#sign-up").addEventListener("click", signupFormHandler);
  
  
  