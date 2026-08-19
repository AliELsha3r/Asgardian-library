const Library = (() => {
    const STORAGE_KEY = "asgardian-library-books-v1";
    const seedBooks = [
        ["1", "Odin's Wisdom", "The Nine Realms", "The Allfather", "ᚨ", "book-odin"], ["2", "Thor Unbound", "A Saga Collection", "Tales of Thunder", "ᚦ", "book-thor"], ["3", "The Loki Code", "Myths Retold", "A Trickster's Tale", "ᛚ", "book-loki"], ["4", "Roots of Yggdrasil", "The Nine Realms", "The World Tree", "ᛇ", "book-yggdrasil"], ["5", "Flight of the Valkyries", "Northern Legends", "Daughters of Battle", "ᚹ", "book-valkyrie"], ["6", "Before Ragnarök", "Saga of Fate", "The Final Winter", "ᚱ", "book-ragnarok"], ["7", "Freyja's Gold", "Northern Legends", "Goddess of Seiðr", "ᚠ", "book-freyja"], ["8", "The Bifrost Watcher", "A Realm Chronicle", "Guardian of the Bridge", "ᚺ", "book-heimdall"], ["9", "Frigg's Foresight", "The Weaver's Tale", "Queen of Asgard", "ᚹ", "book-frigg"], ["10", "The Hand of Tyr", "Saga of Justice", "Oaths and Courage", "ᛏ", "book-tyr"], ["11", "Hel's Quiet Kingdom", "The Underworld", "Beyond the Veil", "ᚺ", "book-hel"], ["12", "Threads of the Norns", "Fates of Asgard", "Keepers of Destiny", "ᚾ", "book-norns"], ["13", "Sif's Harvest", "Fields of Gold", "The Golden-Haired", "ᛋ", "book-sif"], ["14", "Giants of Jötunheim", "The Old Enemies", "Beyond Asgard", "ᛃ", "book-jotun"]
    ].map(([id, title, author, subtitle, rune, className]) => ({ id, title, author, subtitle, rune, className }));
    const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
    const getBooks = () => { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(saved) ? saved : seedBooks; } catch { return seedBooks; } };
    const saveBooks = (books) => localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    const addBook = ({ title, author, subtitle, rune }) => { const book = { id: `book-${Date.now()}`, title, author, subtitle, rune, className: "book-custom" }; saveBooks([...getBooks(), book]); return book; };
    const removeBook = (id) => {
        id = String(id);
        saveBooks(getBooks().filter((book) => book.id !== id));
        try {
            const favorites = JSON.parse(localStorage.getItem("favorites"));
            if (Array.isArray(favorites)) localStorage.setItem("favorites", JSON.stringify(favorites.map(String).filter((favoriteId) => favoriteId !== id)));
        } catch { /* Invalid saved favorites are handled by Favorites.js. */ }
    };
    const createBookCard = (book, { removable = false } = {}) => {
        const card = document.createElement("article");
        card.className = `book-card ${book.className || "book-custom"}`;
        card.innerHTML = `<a class="book-link" href="#" aria-label="Open ${escapeHtml(book.title)}"><div class="book-cover"><span class="book-rune">${escapeHtml(book.rune)}</span><span class="book-kicker">${escapeHtml(book.subtitle)}</span><h3>${escapeHtml(book.title).replace(/\s+/g, "<br>")}</h3><span class="book-author">${escapeHtml(book.author)}</span></div></a><button class="favorite-button" type="button" data-book-id="${book.id}" aria-label="Add ${escapeHtml(book.title)} to favorites" title="Add to favorites"><span aria-hidden="true">${removable ? "×" : "♡"}</span></button><p>${escapeHtml(book.title)}</p>`;
        const button = card.querySelector("button");
        if (removable) { button.classList.add("is-favorite"); button.addEventListener("click", () => removeFavorite(book.id)); }
        else button.addEventListener("click", () => addFavorite(book.id, button));
        return card;
    };
    return { getBooks, addBook, removeBook, createBookCard, escapeHtml };
})();
