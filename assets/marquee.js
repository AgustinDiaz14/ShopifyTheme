document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("marquee-list");
    if (!list) return;

    const baseItems = Array.from(list.children);
    const containerWidth = window.innerWidth * 2;
    let width = list.scrollWidth;

    while (width < containerWidth) {
        baseItems.forEach(item => {
            list.appendChild(item.cloneNode(true));
        });
        width = list.scrollWidth;
    }

    const pixelsPerSecond = 400;
    const duration = width / pixelsPerSecond;

    list.style.setProperty("--scroll-width", `${width/2}px`);
    list.style.setProperty("--scroll-duration", `${duration}s`);
});
