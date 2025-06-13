document.addEventListener("DOMContentLoaded", function () {
    const root = document.querySelector(".trending-products-section");
    const sections = root.querySelectorAll(".collection-section");
    const arrows = root.querySelectorAll(".slider-arrow");

    let current = 0;

    function updateSlider(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? "block" : "none";
        });

        // The following lines are commented out because they are not used in the current implementation. If needed and if they were designed, this pages could be routed by this logic.
        // for the sake of this trial, we will disable the "view all" link.
        /*const currentSection = sections[index];
        const title = currentSection.dataset.title;
        titleEl.textContent = title;
        viewAllLink.href = "/collections/" + title.toLowerCase().replace(/\s+/g, "-");*/
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