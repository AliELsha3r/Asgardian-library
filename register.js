// 1. SELECT HTML ELEMENTS
const nameInput = document.getElementById("name_register");
const emailInput = document.getElementById("email_register");
const passwordInput = document.getElementById("pass_register");
const submitBtn = document.querySelector(".register-submit");

// 2. LISTEN FOR BUTTON CLICK
submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Stops the form from refreshing the page

    // 3. GET VALUES FROM INPUT FIELDS
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // 4. SIMPLE VALIDATION CHECKS
    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return; // Stop running code
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 4) {
        alert("Password must be at least 4 characters long.");
        return;
    }

    // 5. LOAD EXISTING USERS FROM BROWSER MEMORY
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        users = []; // If no users exist yet, create an empty list
    }

    // 6. CHECK IF EMAIL IS ALREADY REGISTERED
    const userExists = users.some(function (user) {
        return user.email === email;
    });

    if (userExists) {
        alert("An account with this email already exists!");
        return;
    }

    // 7. SAVE THE NEW USER
    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser); // Add new user to the array
    localStorage.setItem("users", JSON.stringify(users)); // Save updated array

    // 8. SUCCESS & REDIRECT
    alert("Account created successfully!");
    window.location.href = "Main.html";
});