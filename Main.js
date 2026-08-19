document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector("[data-book-slider]");
    const previous = document.querySelector("[data-slider-prev]");
    const next = document.querySelector("[data-slider-next]");

    if (!slider || !previous || !next) return;

    const getStep = () => slider.querySelector(".book-card").offsetWidth + 22;
    const move = (direction) => slider.scrollBy({ left: getStep() * direction, behavior: "smooth" });

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));

    slider.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        let timer;
        const startFlow = () => {
            clearInterval(timer);
            timer = setInterval(() => {
                const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 4;
                slider.scrollTo({ left: atEnd ? 0 : slider.scrollLeft + getStep(), behavior: "smooth" });
            }, 3600);
        };

        slider.addEventListener("mouseenter", () => clearInterval(timer));
        slider.addEventListener("mouseleave", startFlow);
        slider.addEventListener("focusin", () => clearInterval(timer));
        slider.addEventListener("focusout", startFlow);
        startFlow();
    }
});
