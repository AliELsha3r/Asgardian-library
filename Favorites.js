const FAVORITES_STORAGE_KEY = "favorites";
function getFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY));

        return Array.isArray(saved) ? [...new Set(saved.map(String))].filter((id) => Library.getBooks().some((book) => book.id === id)) : [];

    } 
    catch { return []; }
}
let favorites = getFavorites();

function saveFavorites() { localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites)); }

function updateFavoriteButton(button, isFavorite) {

    (button.querySelector("span") || button).textContent = isFavorite ? "♥" : "♡";
    button.classList.toggle("is-favorite", isFavorite);
    button.setAttribute("aria-pressed", String(isFavorite));
    button.title = isFavorite ? "Remove from favorites" : "Add to favorites";

}

function syncHomeFavoriteButtons() {
    favorites = getFavorites();
    document.querySelectorAll(".favorite-button[data-book-id]").forEach((button) => updateFavoriteButton(button, favorites.includes(button.dataset.bookId)));
}

function addFavorite(bookId, button) {
    bookId = String(bookId);
    favorites = getFavorites();
    favorites = favorites.includes(bookId) ? favorites.filter((id) => id !== bookId) : [...favorites, bookId];
    saveFavorites();
    updateFavoriteButton(button, favorites.includes(bookId));
}

function removeFavorite(bookId) {
    favorites = getFavorites().filter((id) => id !== String(bookId));
    saveFavorites();
    displayFavorites();
}

function displayFavorites() {
    const container = document.querySelector("#favorites_container");

    if (!container) 
        return;

    favorites = getFavorites();

    container.innerHTML = "";

    if (!favorites.length) { 
        container.innerHTML = '<p class="no-favorites">No relics adorn these sacred halls.</p>'; 
        return; 
    
    }
    favorites.forEach((id) => {
        const book = Library.getBooks().find((item) => item.id === id);
        if (book) container.appendChild(Library.createBookCard(book, { removable: true }));
    });
}
document.addEventListener("DOMContentLoaded", () =>
    { 
        syncHomeFavoriteButtons(); 
        displayFavorites(); 
    }
);
