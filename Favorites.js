let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

// Add a book to favorites
function addFavorite(bookNumber) {
    if (!favorites.includes(bookNumber)) {
        favorites.push(bookNumber);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

// Remove a book from favorites
function removeFavorite(bookNumber) {
    favorites = favorites.filter(id => id !== bookNumber);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Display favorites with a Remove button
let container = document.getElementById("favorites_container");

if (container) {
    container.innerHTML = "";
    for (let bookNumber of favorites) {
        container.innerHTML += '';
    }
}