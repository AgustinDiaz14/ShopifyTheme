document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quick-view-modal');
    const closeBtn = modal.querySelector('.drawer-close');
    const form = document.getElementById('quick-view-form');

    const qtyInput = document.getElementById('quick-view-qty');
    const priceOutput = document.getElementById('quick-view-price');
    const variantIdInput = document.getElementById('quick-view-variant-id');

    let selectedVariant = null;

    // Open modal from any product
    document.querySelectorAll('[data-quick-view]').forEach(button => {
        button.addEventListener('click', async () => {
            const handle = button.dataset.quickView;
            const res = await fetch(`/products/${handle}.js`);
            const product = await res.json();

            // Fill modal content
            modal.querySelector('#quick-view-title').textContent = product.title;
            modal.querySelector('#quick-view-description').innerHTML = product.description;
            modal.querySelector('#quick-view-image').src = product.images[0] || '';

            const template = document.getElementById('variant-row-template');
            const variantQuantities = {};

            product.variants.forEach(variant => {
                variantQuantities[variant.id] = 0;

                const clone = template.content.cloneNode(true);
                const row = clone.querySelector('tr');

                const match = variant.title.split("/")
                console.log(match)
                const capsuleTitle = match ? match[1] : '';
                const capsuleLabel = match ? match[0] : '';

                row.querySelector('.variant-image').src = variant.featured_image?.src || product.images[0];
                row.querySelector('.variant-size').textContent = capsuleLabel;
                row.querySelector('.variant-label').textContent = capsuleTitle;
                row.querySelector('.variant-price').textContent = `$${(variant.price / 100).toFixed(2)}`;

                const input = row.querySelector('.variant-input');
                const plus = row.querySelector('.qty-plus');
                const minus = row.querySelector('.qty-minus');
                const total = row.querySelector('.variant-total');

                plus.addEventListener('click', () => {
                    input.value = parseInt(input.value) + 1;
                    updateLineTotal(variant, input, total);
                });

                minus.addEventListener('click', () => {
                    input.value = Math.max(0, parseInt(input.value) - 1);
                    updateLineTotal(variant, input, total);
                });

                input.addEventListener('input', () => {
                    input.value = Math.max(0, parseInt(input.value) || 0);
                    updateLineTotal(variant, input, total);
                });

                document.getElementById('variant-table').appendChild(clone);
            });

            function updateLineTotal(variant, input, totalElement) {
                const qty = parseInt(input.value);
                const total = (variant.price / 100) * qty;
                totalElement.textContent = `$${total.toFixed(2)}`;
            }



            modal.classList.add('show');
            modal.removeAttribute('hidden');
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.setAttribute('hidden', true), 300);
    });

    // Quantity controls
    document.getElementById('qty-minus').addEventListener('click', () => {
        qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
        updatePriceDisplay();
    });

    document.getElementById('qty-plus').addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
        updatePriceDisplay();
    });

    function updatePriceDisplay() {
        if (!selectedVariant) return;
        const qty = parseInt(qtyInput.value);
        const total = (selectedVariant.price / 100) * qty;
        priceOutput.textContent = `$${total.toFixed(2)}`;
    }

    // Add to cart
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const variantId = variantIdInput.value;
        const quantity = parseInt(qtyInput.value);

        await fetch('/cart/add.js', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: variantId, quantity})
        });

        // Cerrar el modal y abrir el drawer
        modal.classList.remove('show');
        setTimeout(() => modal.setAttribute('hidden', true), 300);

        if (typeof updateCartDrawer === 'function') {
            await updateCartDrawer();
            const cartDrawer = document.getElementById('cart-drawer');
            cartDrawer.classList.add('show');
            cartDrawer.removeAttribute('hidden');
        }
    });

    document.getElementById('variant-table').addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        const input = document.getElementById(`qty-${id}`);
        let qty = parseInt(input.value) || 0;

        if (e.target.classList.contains('qty-plus')) qty++;
        if (e.target.classList.contains('qty-minus')) qty = Math.max(0, qty - 1);

        input.value = qty;
        updateLineTotal(id, qty);
    });

    document.getElementById('variant-table').addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.id.startsWith('qty-')) {
            const id = e.target.id.replace('qty-', '');
            const qty = Math.max(0, parseInt(e.target.value) || 0);
            e.target.value = qty;
            updateLineTotal(id, qty);
        }
    });

    function updateLineTotal(variantId, qty) {
        const variant = product.variants.find(v => v.id == variantId);
        const total = (variant.price / 100) * qty;
        document.getElementById(`line-total-${variantId}`).textContent = `$${total.toFixed(2)}`;
    }

});
