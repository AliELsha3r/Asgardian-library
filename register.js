// 1. SELECT HTML ELEMENTS
const nameInput = document.getElementById("name_register");
const emailInput = document.getElementById("email_register");
const passwordInput = document.getElementById("pass_register");
const submitBtn = document.querySelector(".register-submit");
const msgBox = document.getElementById("msg_box");
function showMessage(text, isError) {
    msgBox.textContent = text;
    if (isError) {
        msgBox.className = "error-msg";
    } else {
        msgBox.className = "success-msg";
    }
}

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (name === "" || email === "" || password === "") {
        showMessage("Even Loki fills out his forms! Do it now!", true);
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showMessage("Heimdall sees no true mark! Thy email lacks '@' or '.'.", true);
        return;
    }

    if (password.length < 4) {
        showMessage("Thy password lacks strength! Forge it with at least 4 characters.", true);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(function (user) {
        return user.email === email;
    });

    if (userExists) {
        showMessage("A warrior with this email already walks the Hall of Records!", true);
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    showMessage("Thy name is etched in the scrolls of Valhalla!", false);

    setTimeout(function () {
        window.location.href = "Main.html";
    }, 2000);
});