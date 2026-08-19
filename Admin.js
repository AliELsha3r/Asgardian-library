document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#book-form");
    const list = document.querySelector("#admin-book-list");
    const message = document.querySelector("#admin-message");
    const showMessage = (text, isError = false) => {
        message.textContent = text;
        message.className = isError ? "admin-message error-msg" : "admin-message success-msg";
    };
    const renderBooks = () => {
        list.innerHTML = "";
        Library.getBooks().forEach((book) => {
            const item = document.createElement("li");
            item.className = "admin-book-item";
            item.innerHTML = `<span class="admin-book-rune">${Library.escapeHtml(book.rune)}</span><span class="admin-book-details"><strong>${Library.escapeHtml(book.title)}</strong><small>${Library.escapeHtml(book.author)}</small></span><button type="button" class="remove-book" data-book-id="${book.id}">Remove</button>`;
            list.appendChild(item);
        });
    };
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const title = data.get("title").trim();
        const author = data.get("author").trim();
        const subtitle = data.get("subtitle").trim();
        const link = data.get("link").trim();
        const rune = data.get("rune").trim() || "ᛉ";
        if (!title || !author || !subtitle || !link) return showMessage("Please complete the title, chronicle, author, and book link fields.", true);
        if (!Library.isValidBookLink(link)) return showMessage("Please enter a valid http or https book link.", true);
        Library.addBook({ title, author, subtitle, link, rune });
        form.reset();
        showMessage(`“${title}” has been placed in the library.`);
        renderBooks();
    });
    list.addEventListener("click", (event) => {
        const button = event.target.closest("[data-book-id]");
        if (!button) return;
        const book = Library.getBooks().find((item) => item.id === button.dataset.bookId);
        if (!book) return;
        Library.removeBook(book.id);
        showMessage(`“${book.title}” has been removed from the library.`);
        renderBooks();
    });
    renderBooks();
});
