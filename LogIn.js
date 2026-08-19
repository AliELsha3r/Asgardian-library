// 1. SELECT HTML ELEMENTS (Using your exact HTML IDs)
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pass");
const submitBtn = document.getElementById("sub_btn");
const msgBox = document.getElementById("msg_box"); // Our message board!

// Helper function to write messages on screen
function showMessage(text, isError) {
    msgBox.textContent = text; // Write the text
    
    if (isError) {
        msgBox.className = "error-msg"; // Make text red
    } else {
        msgBox.className = "success-msg"; // Make text green
    }
}
// 2. LISTEN FOR BUTTON CLICK
submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Stops the page from refreshing

    // 3. GET VALUES FROM INPUT FIELDS
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // 4. CHECK IF FIELDS ARE EMPTY
    if (email === "" || password === "") {
      showMessage(`Even Loki fills out his forms! Do it now!`,true)
        return; // Stop here
    }

    // 5. OPEN LOCALSTORAGE (Must use the SAME key "users" from registration)
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        users = []; // If no users exist yet
    }

    // 6. LOOK FOR A MATCH
    const foundUser = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    // 7. CHECK RESULTS
    if (foundUser) {
        // Save who is currently logged in
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        
        setTimeout(function () {
        window.location.href = "Home.html";
    }, 2000);showMessage("Welcome to Asgard, " + foundUser.name + "!",false);
        
    } else {
        showMessage("Loki's trickery! The gates of Asgard reject these credentials.",true);
    }
});