document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-book-carousel]");
    const track = document.querySelector(".book-track");
    const previous = document.querySelector("[data-home-prev]");
    const next = document.querySelector("[data-home-next]");
    if (!carousel || !track || !previous || !next) return;
    track.innerHTML = "";
    Library.getBooks().forEach((book) => track.appendChild(Library.createBookCard(book)));
    if (typeof syncHomeFavoriteButtons === "function") syncHomeFavoriteButtons();
    let index = 0, timer;
    const visibleBooks = () => window.innerWidth <= 760 ? 1 : 4;
    const maxIndex = () => Math.max(track.children.length - visibleBooks(), 0);
    const showSlide = (animate = true) => {
        const first = track.children[0];
        if (!first) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.style.transition = animate ? "transform 750ms ease" : "none";
        track.style.transform = `translateX(-${index * (first.offsetWidth + gap)}px)`;
    };
    const move = (direction) => { index += direction; if (index > maxIndex()) index = 0; if (index < 0) index = maxIndex(); showSlide(); };
    const startAutoPlay = () => {
        clearInterval(timer);
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches && track.children.length > visibleBooks()) timer = setInterval(() => move(1), 3200);
    };
    previous.addEventListener("click", () => { move(-1); startAutoPlay(); });
    next.addEventListener("click", () => { move(1); startAutoPlay(); });
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", startAutoPlay);
    carousel.addEventListener("focusin", () => clearInterval(timer));
    carousel.addEventListener("focusout", startAutoPlay);
    window.addEventListener("resize", () => { index = Math.min(index, maxIndex()); showSlide(false); });
    showSlide(false);
    startAutoPlay();
});
