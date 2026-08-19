document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector("[data-flowing-books]");
    if (!slider || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Duplicate the banners once so the slow sideways flow loops without a visible jump.
    slider.insertAdjacentHTML("beforeend", slider.innerHTML);

    let paused = false;
    let previousTime = 0;
    const flow = (time) => {
        if (!paused && previousTime) {
            slider.scrollLeft += (time - previousTime) * 0.018;
            if (slider.scrollLeft >= slider.scrollWidth / 2) slider.scrollLeft = 0;
        }
        previousTime = time;
        requestAnimationFrame(flow);
    };

    slider.addEventListener("mouseenter", () => paused = true);
    slider.addEventListener("mouseleave", () => paused = false);
    slider.addEventListener("focusin", () => paused = true);
    slider.addEventListener("focusout", () => paused = false);
    requestAnimationFrame(flow);
});
