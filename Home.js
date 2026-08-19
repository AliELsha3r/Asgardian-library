document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector("[data-book-carousel]");
    const track = document.querySelector(".book-track");

    const previous = document.querySelector("[data-home-prev]");
    const next = document.querySelector("[data-home-next]");

    if (!carousel || !track || !previous || !next) {
        return;
    }


    /* ---------------------------------------------------------
       BOOKS
       --------------------------------------------------------- */

    const originalBooks = Array.from(track.children);

    const totalBooks = originalBooks.length;

    let index = 0;

    let timer = null;


    /* ---------------------------------------------------------
       CLONE FIRST FEW BOOKS
       This allows the carousel to loop smoothly.
       --------------------------------------------------------- */

    const visibleBooks = 4;

    originalBooks
        .slice(0, visibleBooks)
        .forEach((book) => {
            track.appendChild(book.cloneNode(true));
        });


    /* ---------------------------------------------------------
       FIND THE DISTANCE BETWEEN BOOKS
       --------------------------------------------------------- */

    function getStep() {

        const book = originalBooks[0];

        if (!book) {
            return 0;
        }

        const style = window.getComputedStyle(track);

        const gap = parseFloat(style.columnGap) || 0;

        return book.offsetWidth + gap;
    }


    /* ---------------------------------------------------------
       MOVE THE TRACK
       --------------------------------------------------------- */

    function showSlide(animate = true) {

        const step = getStep();

        track.style.transition = animate
            ? "transform 750ms ease"
            : "none";

        track.style.transform =
            `translateX(-${index * step}px)`;
    }


    /* ---------------------------------------------------------
       MOVE LEFT / RIGHT
       --------------------------------------------------------- */

    function move(direction) {

        index += direction;


        /* Going before the first book */

        if (index < 0) {

            index = totalBooks - 1;

            showSlide(false);

            return;
        }


        /* Normal movement */

        showSlide(true);
    }


    /* ---------------------------------------------------------
       INFINITE LOOP
       When we reach the cloned books, jump back to the beginning.
       --------------------------------------------------------- */

    track.addEventListener("transitionend", () => {

        if (index >= totalBooks) {

            index = 0;

            showSlide(false);
        }
    });


    /* ---------------------------------------------------------
       BUTTONS
       --------------------------------------------------------- */

    previous.addEventListener("click", () => {

        move(-1);

        startAutoPlay();
    });


    next.addEventListener("click", () => {

        move(1);

        startAutoPlay();
    });


    /* ---------------------------------------------------------
       AUTO PLAY
       --------------------------------------------------------- */

    function startAutoPlay() {

        clearInterval(timer);

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (!reducedMotion) {

            timer = setInterval(() => {

                move(1);

            }, 3200);
        }
    }


    /* ---------------------------------------------------------
       STOP AUTO PLAY WHEN MOUSE IS OVER THE BOOKS
       --------------------------------------------------------- */

    carousel.addEventListener("mouseenter", () => {

        clearInterval(timer);
    });


    carousel.addEventListener("mouseleave", () => {

        startAutoPlay();
    });


    /* ---------------------------------------------------------
       STOP AUTO PLAY WHEN USER IS USING KEYBOARD
       --------------------------------------------------------- */

    carousel.addEventListener("focusin", () => {

        clearInterval(timer);
    });


    carousel.addEventListener("focusout", () => {

        startAutoPlay();
    });


    /* ---------------------------------------------------------
       RESPONSIVE
       --------------------------------------------------------- */

    window.addEventListener("resize", () => {

        showSlide(false);
    });


    /* ---------------------------------------------------------
       INITIAL POSITION
       --------------------------------------------------------- */

    showSlide(false);

    startAutoPlay();

});