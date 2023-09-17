const logout = async () => {

  // Send a POST request to the API endpoint to logout the user
  const res = await fetch("/api/employee/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  
  // If successful, redirect the browser to the homepage
  if (res.ok) {
    document.location.replace("/employee/login");
  } else {
    alert(res.statusText);
  }
};

// Logout Button
document.querySelector(".logout-btn").addEventListener("click", logout);
