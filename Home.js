document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector("[data-book-carousel]");
    const track = document.querySelector(".book-track");

    const previous = document.querySelector("[data-home-prev]");
    const next = document.querySelector("[data-home-next]");

    if (!carousel || !track || !previous || !next) {
        return;
    }


    /* =========================================================
       BOOKS
       ========================================================= */

    const books = Array.from(track.children);

    const totalBooks = books.length;

    /*
       Number of books visible at the same time.
       Your design currently shows 4.
    */
    const visibleBooks = 4;


    /*
       The furthest position we can move to.
       Example:

       14 books
       4 visible

       maxIndex = 14 - 4 = 10
    */

    const maxIndex = Math.max(totalBooks - visibleBooks, 0);

    let index = 0;

    let timer = null;


    /* =========================================================
       FIND BOOK MOVEMENT DISTANCE
       ========================================================= */

    function getStep() {

        const firstBook = books[0];

        if (!firstBook) {
            return 0;
        }

        const trackStyle = window.getComputedStyle(track);

        const gap = parseFloat(trackStyle.columnGap) || 0;

        return firstBook.offsetWidth + gap;
    }


    /* =========================================================
       SHOW CURRENT SLIDE
       ========================================================= */

    function showSlide(animate = true) {

        const step = getStep();

        track.style.transition =
            animate ? "transform 750ms ease" : "none";

        track.style.transform =
            `translateX(-${index * step}px)`;
    }


    /* =========================================================
       MOVE CAROUSEL
       ========================================================= */

    function move(direction) {

        index += direction;


        /*
           We went past the LAST position.
           Go back to the FIRST position.
        */

        if (index > maxIndex) {
            index = 0;
        }


        /*
           We went before the FIRST position.
           Go to the LAST position.
        */

        if (index < 0) {
            index = maxIndex;
        }


        showSlide(true);
    }


    /* =========================================================
       BUTTONS
       ========================================================= */

    previous.addEventListener("click", () => {

        move(-1);

        startAutoPlay();
    });


    next.addEventListener("click", () => {

        move(1);

        startAutoPlay();
    });


    /* =========================================================
       AUTO PLAY
       ========================================================= */

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


    /* =========================================================
       STOP AUTO PLAY WHEN HOVERING
       ========================================================= */

    carousel.addEventListener("mouseenter", () => {
        clearInterval(timer);
    });


    carousel.addEventListener("mouseleave", () => {
        startAutoPlay();
    });


    /* =========================================================
       STOP AUTO PLAY WHEN FOCUSING
       ========================================================= */

    carousel.addEventListener("focusin", () => {
        clearInterval(timer);
    });


    carousel.addEventListener("focusout", () => {
        startAutoPlay();
    });


    /* =========================================================
       RESPONSIVE
       ========================================================= */

    window.addEventListener("resize", () => {

        showSlide(false);
    });


    /* =========================================================
       INITIAL POSITION
       ========================================================= */

    showSlide(false);

    startAutoPlay();

});