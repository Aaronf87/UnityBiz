const signupFormHandler = async (event) => {
    event.preventDefault();
    
    // Collect values from the signup form
    const admin = document.querySelector("#company-admin").value.trim();
    const companyName = document.querySelector("#company-name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone-number").value.trim();
    const address = document.querySelector("#street-address").value.trim();
    const city = document.querySelector("#city").value.trim();
    const state = document.querySelector("#region").value.trim();
    const password = document.querySelector("#password").value.trim();
    const 


    
    if (admin && password) {
        // Send a POST request to the API endpoint
        const response = await fetch("/api/company", {
        method: "POST",
        body: JSON.stringify({ admin, password }),
        headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
        // If successful, redirect the browser to the company page
        document.location.replace("/company");
        } else {
        alert(response.statusText);
        }
    }
    }