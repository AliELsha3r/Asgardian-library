const currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("username_user").textContent = currentUser.name;
document.getElementById("email_user").textContent = currentUser.email;