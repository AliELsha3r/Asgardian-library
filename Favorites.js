const FAVORITES_STORAGE_KEY = "favorites";

const books = [
    { id: 1, name: "Odin's Wisdom", className: "book-odin" },
    { id: 2, name: "Thor Unbound", className: "book-thor" },
    { id: 3, name: "The Loki Code", className: "book-loki" },
    { id: 4, name: "Roots of Yggdrasil", className: "book-yggdrasil" },
    { id: 5, name: "Flight of the Valkyries", className: "book-valkyrie" },
    { id: 6, name: "Before Ragnarök", className: "book-ragnarok" },
    { id: 7, name: "Freyja's Gold", className: "book-freyja" },
    { id: 8, name: "The Bifrost Watcher", className: "book-heimdall" },
    { id: 9, name: "Frigg's Foresight", className: "book-frigg" },
    { id: 10, name: "The Hand of Tyr", className: "book-tyr" },
    { id: 11, name: "Hel's Quiet Kingdom", className: "book-hel" },
    { id: 12, name: "Threads of the Norns", className: "book-norns" },
    { id: 13, name: "Sif's Harvest", className: "book-sif" },
    { id: 14, name: "Giants of Jötunheim", className: "book-jotun" }
];

function getFavorites() {
    try {
        const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY));

        if (!Array.isArray(savedFavorites)) {
            return [];
        }

        return [...new Set(savedFavorites.map(Number))]
            .filter(id => books.some(book => book.id === id));
    } catch {
        return [];
    }
}

let favorites = getFavorites();

function saveFavorites() {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}


// Add or remove a favorite
function updateFavoriteButton(button, isFavorite) {
    const symbol = button.querySelector("span") || button;
    symbol.textContent = isFavorite ? "♥" : "♡";
    button.classList.toggle("is-favorite", isFavorite);
    button.setAttribute("aria-pressed", String(isFavorite));
    button.title = isFavorite ? "Remove from favorites" : "Add to favorites";
}

function syncHomeFavoriteButtons() {
    document.querySelectorAll(".favorite-button[onclick*='addFavorite']").forEach(button => {
        const match = button.getAttribute("onclick").match(/addFavorite\((\d+)/);

        if (match) {
            updateFavoriteButton(button, favorites.includes(Number(match[1])));
        }
    });
}

function addFavorite(bookNumber, button) {
    bookNumber = Number(bookNumber);

    // If the book is already a favorite
    if (favorites.includes(bookNumber)) {

        // Remove it
        favorites = favorites.filter(id => id !== bookNumber);

    } else {

        // Add it
        favorites.push(bookNumber);

    }

    saveFavorites();
    updateFavoriteButton(button, favorites.includes(bookNumber));
}


// Remove favorite from Favorites page

function removeFavorite(bookNumber) {
    bookNumber = Number(bookNumber);
    favorites = favorites.filter(id => id !== bookNumber);
    saveFavorites();
    displayFavorites();
}


// Display favorites

function displayFavorites() {

    let container =
        document.getElementById("favorites_container");

    if (!container) {
        return;
    }

    favorites = getFavorites();
    container.innerHTML = "";

    if (favorites.length === 0) {

        container.innerHTML = `
            <p class="no-favorites">
                Your collection is empty.
            </p>
        `;

        return;
    }

    for (let id of favorites) {

        let book = books.find(book => book.id === id);

        if (!book) {
            continue;
        }

        container.innerHTML += `
            <article class="book-card ${book.className}">

                <div class="book-cover">

                    <h3>${book.name}</h3>

                </div>

                <button
                    class="favorite-button"
                    onclick="removeFavorite(${book.id})"
                >
                    ×
                </button>

            </article>`;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    syncHomeFavoriteButtons();
    displayFavorites();
});
