const logout = async () => {
    console.log("click");
  const res = await fetch("/api/employee/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    document.location.replace("/employee/login");
  } else {
    alert(res.statusText);
  }
};

document.querySelector(".logout-btn").addEventListener("click", logout);
