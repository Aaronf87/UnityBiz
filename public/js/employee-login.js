// Create login variables to getelementsbyid
const signIn = document.getElementById("signIn");

// Create event listener for sign in button

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#employee-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // If username or password is empty, alert user
  if (!username || !password) {
    alert("Form must not be empty");
    return;
  }

  // If username and password are not empty, send a POST request to the API endpoint
  if (username && password) {
    const response = await fetch("/api/employee/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const employeeData = await response.json();
    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      alert(`${employeeData.message}`)
      document.location.replace(`/home`);
    } else {
      alert(`${employeeData.message}`)
    }
  }
};

// Click the employee login button
document
  .querySelector("#signIn")
  .addEventListener("click", loginFormHandler);