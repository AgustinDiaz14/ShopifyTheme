let currentIndex = 0;
let carousel = []
let cards = []
let videos = [];
function goToNext() {
    const videos = document.querySelectorAll("video");
    if (currentIndex + 1 < videos.length) {
        currentIndex += 1;
        scrollToCard(currentIndex);
        setTimeout(() => highlightAndPlay(currentIndex), 400);
    }
}

function goToPrev() {
    if (currentIndex - 1 >= 0) {
        currentIndex -= 1;
        scrollToCard(currentIndex);
        setTimeout(() => highlightAndPlay(currentIndex), 400);
    }
}

function scrollToCard(index, instant = false) {
    const card = cards[index];
    if (!card) return;

    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const containerCenter = carousel.offsetWidth / 2;
    const scrollLeft = cardCenter - containerCenter;

    carousel.scrollTo({
        left: scrollLeft,
        behavior: instant ? 'auto' : 'smooth'
    });
}
function highlightAndPlay(index) {
    if (!videos[index]) return;

    videos.forEach((vid, i) => {
        if (i !== index) {
            vid.pause();
            vid.currentTime = 0;
        }
    });

    videos[index].play().catch(() => {});

    cards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    carousel = document.querySelector(".carousel-track");
    cards = carousel.querySelectorAll(".testimonial-card");
    videos = carousel.querySelectorAll("video");



    function getCenteredCardIndex() {
        const center = carousel.scrollLeft + carousel.offsetWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(center - cardCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    window.addEventListener("load", () => {
        scrollToCard(0, true);
        highlightAndPlay(0);
    });

    carousel.addEventListener("scroll", debounce(() => {
        const index = getCenteredCardIndex();
        cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    }, 300));

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
});