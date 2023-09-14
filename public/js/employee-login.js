// create login variables to getelementsbyid
const signIn = document.getElementById("signIn");

// create event listener for sign in button

const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log("loginFormHandler");
  // Collect values from the login form
  const username = document.querySelector("#employee-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (!username || !password) {
    alert("Form must not be empty");
    return;
  }

  if (username && password) {

    // Send a POST request to the API endpoint
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

// Click the login button
document
  .querySelector("#signIn")
  .addEventListener("click", loginFormHandler);