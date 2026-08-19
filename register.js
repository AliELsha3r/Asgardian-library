const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const submitBtn = document.querySelector(".register-submit");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }
    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email");
        return;
    }
    if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return;
    }
    alert("Account created successfully");

    window.location.href = "Home.html";
});