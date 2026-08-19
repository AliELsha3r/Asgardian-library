document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-book-carousel]");
    const previous = document.querySelector("[data-home-prev]");
    const next = document.querySelector("[data-home-next]");
    if (!carousel || !previous || !next) return;

    const track = document.createElement("div");
    track.className = "book-track";
    track.append(...carousel.children);
    carousel.append(track);

    const originalBooks = [...track.children];
    const visibleBooks = 4;
    originalBooks.slice(0, visibleBooks).forEach((book) => track.append(book.cloneNode(true)));

    let index = 0;
    let timer;
    const step = () => originalBooks[0].offsetWidth + 22;
    const showSlide = (animate = true) => {
        track.style.transition = animate ? "transform 750ms ease" : "none";
        track.style.transform = `translateX(-${index * step()}px)`;
    };
    const move = (direction) => {
        index += direction;
        if (index < 0) {
            index = originalBooks.length - 1;
            showSlide(false);
            return;
        } else {
            showSlide();
        }
    };
    const startAutoPlay = () => {
        clearInterval(timer);
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => move(1), 3200);
    };

    track.addEventListener("transitionend", () => {
        if (index === originalBooks.length) {
            index = 0;
            showSlide(false);
        }
    });
    previous.addEventListener("click", () => { move(-1); startAutoPlay(); });
    next.addEventListener("click", () => { move(1); startAutoPlay(); });
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", startAutoPlay);
    carousel.addEventListener("focusin", () => clearInterval(timer));
    carousel.addEventListener("focusout", startAutoPlay);
    window.addEventListener("resize", () => showSlide(false));
    startAutoPlay();
});
