const Library = (() => {
    const STORAGE_KEY = "asgardian-library-books-v1";
    const seedBooks = [
        ["1", "Odin's Wisdom", "The Nine Realms", "The Allfather", "ᚨ", "book-odin", "https://www.gutenberg.org/ebooks/58829"], ["2", "Thor Unbound", "A Saga Collection", "Tales of Thunder", "ᚦ", "book-thor", "https://www.gutenberg.org/ebooks/18947"], ["3", "The Loki Code", "Myths Retold", "A Trickster's Tale", "ᛚ", "book-loki", "https://www.gutenberg.org/ebooks/46063"], ["4", "Roots of Yggdrasil", "The Nine Realms", "The World Tree", "ᛇ", "book-yggdrasil", "https://www.gutenberg.org/ebooks/14726"], ["5", "Flight of the Valkyries", "Northern Legends", "Daughters of Battle", "ᚹ", "book-valkyrie", "https://www.gutenberg.org/ebooks/46288"], ["6", "Before Ragnarök", "Saga of Fate", "The Final Winter", "ᚱ", "book-ragnarok", "https://www.gutenberg.org/ebooks/45373"], ["7", "Freyja's Gold", "Northern Legends", "Goddess of Seiðr", "ᚠ", "book-freyja", "https://www.gutenberg.org/ebooks/48365"], ["8", "The Bifrost Watcher", "A Realm Chronicle", "Guardian of the Bridge", "ᚺ", "book-heimdall", "https://www.gutenberg.org/ebooks/31954"]
    ].map(([id, title, author, subtitle, rune, className, link]) => ({ id, title, author, subtitle, rune, className, link }));
    const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
    const isValidBookLink = (link) => {
        try { return ["http:", "https:"].includes(new URL(link).protocol); }
        catch { return false; }
    };
    const getBooks = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!Array.isArray(saved)) return seedBooks;
            const seedLinks = new Map(seedBooks.map((book) => [book.id, book.link]));
            return saved
                .filter((book) => !/^\d+$/.test(String(book.id)) || seedLinks.has(String(book.id)))
                .map((book) => book.link ? book : { ...book, link: seedLinks.get(String(book.id)) });
        } catch { return seedBooks; }
    };
    const saveBooks = (books) => localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    const addBook = ({ title, author, subtitle, link, rune }) => { const book = { id: `book-${Date.now()}`, title, author, subtitle, link, rune, className: "book-custom" }; saveBooks([...getBooks(), book]); return book; };
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
        const bookLink = isValidBookLink(book.link) ? book.link : "#";
        card.innerHTML = `<a class="book-link" href="${escapeHtml(bookLink)}" aria-label="Open ${escapeHtml(book.title)}"><div class="book-cover"><span class="book-rune">${escapeHtml(book.rune)}</span><span class="book-kicker">${escapeHtml(book.subtitle)}</span><h3>${escapeHtml(book.title).replace(/\s+/g, "<br>")}</h3><span class="book-author">${escapeHtml(book.author)}</span></div></a><button class="favorite-button" type="button" data-book-id="${book.id}" aria-label="Add ${escapeHtml(book.title)} to favorites" title="Add to favorites"><span aria-hidden="true">${removable ? "×" : "♡"}</span></button><p>${escapeHtml(book.title)}</p>`;
        const button = card.querySelector("button");
        if (removable) { button.classList.add("is-favorite"); button.addEventListener("click", () => removeFavorite(book.id)); }
        else button.addEventListener("click", () => addFavorite(book.id, button));
        return card;
    };
    return { getBooks, addBook, removeBook, createBookCard, escapeHtml, isValidBookLink };
})();
