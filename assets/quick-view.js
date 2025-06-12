document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-quick-view]').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault(); // <-- importante
            e.stopPropagation(); // <-- opcional, evita bubbling
            const handle = button.dataset.quickView;
            const modal = document.getElementById('quick-view-modal');

            // Fetch product data
            const res = await fetch(`/products/${handle}.js`);
            const product = await res.json();

            // Fill modal content
            document.getElementById('quick-view-title').textContent = product.title;
            document.getElementById('quick-view-price').textContent = `$${(product.price / 100).toFixed(2)}`;
            document.getElementById('quick-view-description').textContent = product.description || '';
            document.getElementById('quick-view-image').src = product.images[0];
            document.getElementById('quick-view-variant-id').value = product.variants[0].id;

            modal.classList.add('show');
            modal.removeAttribute('hidden');
        });
    });

// Close modal
    document.querySelector('.close-modal').addEventListener('click', () => {
        const modal = document.getElementById('quick-view-modal');
        modal.classList.remove('show');
        setTimeout(() => modal.setAttribute('hidden', true), 300);
    });

// Add to cart
    document.getElementById('quick-view-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const variantId = document.getElementById('quick-view-variant-id').value;

        await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: variantId, quantity: 1 })
        });

        // Optionally close modal or show success message
    });

})