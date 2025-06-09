document.addEventListener("DOMContentLoaded", function () {
    const root = document.querySelector(".trending-products-section");
    const sections = root.querySelectorAll(".collection-section");
    const titleEl = root.querySelector(".slider-collection-title");
    const viewAllLink = root.querySelector(".slider-view-all");
    const arrows = root.querySelectorAll(".slider-arrow");

    let current = 0;

    function updateSlider(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? "block" : "none";
        });

        const currentSection = sections[index];
        const title = currentSection.dataset.title;
        titleEl.textContent = title;
        viewAllLink.href = "/collections/" + title.toLowerCase().replace(/\s+/g, "-");
    }

    arrows.forEach(btn => {
        btn.addEventListener("click", () => {
            const dir = btn.dataset.direction === "next" ? 1 : -1;
            current = (current + dir + sections.length) % sections.length;
            updateSlider(current);
        });
    });

    if (sections.length > 0) {
        updateSlider(0);
    }
});