// Shopping Cart Module for Sicilia Bedda
// Handles cart state, add/remove items, and cart UI updates

(function() {
    'use strict';

    // Cart storage key
    const CART_STORAGE_KEY = 'siciliabedda-cart';

    // Cart state
    let cart = {
        collections: {}, // { collectionId: quantity }
        donations: {}    // { level: amount }
    };

    // Initialize cart from localStorage
    function loadCart() {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                cart = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = { collections: {}, donations: {} };
        }
    }

    // Save cart to localStorage
    function saveCart() {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    // Get total item count
    function getCartItemCount() {
        let count = 0;
        Object.values(cart.collections).forEach(qty => count += qty);
        Object.keys(cart.donations).length > 0 && count++;
        return count;
    }

    // Add collection to cart
    function addCollection(collectionId, quantity = 1) {
        const id = String(collectionId);
        if (!cart.collections[id]) {
            cart.collections[id] = 0;
        }
        cart.collections[id] += quantity;
        saveCart();
        updateCartUI();
    }

    // Remove collection from cart
    function removeCollection(collectionId) {
        delete cart.collections[String(collectionId)];
        saveCart();
        updateCartUI();
    }

    // Update collection quantity
    function updateCollectionQuantity(collectionId, quantity) {
        const id = String(collectionId);
        if (quantity <= 0) {
            removeCollection(id);
        } else {
            cart.collections[id] = quantity;
            saveCart();
            updateCartUI();
        }
    }

    // Add donation to cart (replaces any existing donation)
    function addDonation(level, amount) {
        cart.donations = { [String(level)]: parseFloat(amount) };
        saveCart();
        updateCartUI();
    }

    // Remove donation from cart
    function removeDonation() {
        cart.donations = {};
        saveCart();
        updateCartUI();
    }

    // Clear entire cart
    function clearCart() {
        cart = { collections: {}, donations: {} };
        saveCart();
        updateCartUI();
    }

    // Get cart total in EUR
    function getCartTotalEUR(collectionsData, donationLevelsData) {
        let total = 0;

        // Add collection totals
        Object.keys(cart.collections).forEach(id => {
            const collection = collectionsData[id];
            if (collection) {
                total += collection.eurAmount * cart.collections[id];
            }
        });

        // Add donation total
        Object.values(cart.donations).forEach(amount => {
            total += amount;
        });

        return total;
    }

    // Get cart items for checkout
    function getCartItems(collectionsData, donationLevelsData) {
        const items = [];

        // Add collections
        Object.keys(cart.collections).forEach(id => {
            const collection = collectionsData[id];
            if (collection) {
                items.push({
                    type: 'collection',
                    id: collection.id,
                    name: collection.name,
                    displayName: collection.displayName,
                    eurAmount: collection.eurAmount,
                    quantity: cart.collections[id]
                });
            }
        });

        // Add donation
        Object.keys(cart.donations).forEach(level => {
            const donationData = donationLevelsData[level];
            if (donationData) {
                items.push({
                    type: 'donation',
                    level: level,
                    name: donationData.name,
                    displayName: donationData.displayName,
                    eurAmount: cart.donations[level]
                });
            }
        });

        return items;
    }

    // Update cart UI (badge count, cart modal content)
    function updateCartUI() {
        const count = getCartItemCount();
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-flex' : 'none';
        }

        // Update cart modal if it exists and is visible
        const cartModal = document.getElementById('cart-modal');
        if (cartModal && cartModal.classList.contains('active')) {
            renderCartModal();
        }
    }

    // Render cart modal content
    function renderCartModal() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        if (!cartItemsContainer) return;

        // Get collections and donation data from page
        const collectionsData = window.collections || {};
        const donationLevelsData = window.donationLevels || {};

        cartItemsContainer.innerHTML = '';

        const lang = document.documentElement.lang || 'en';
        const t = (window.translations && window.translations[lang]) || (window.translations && window.translations.en) || {};

        let totalEUR = 0;

        // Render collections
        Object.keys(cart.collections).forEach(id => {
            const collection = collectionsData[id];
            if (!collection) return;

            const quantity = cart.collections[id];
            const itemTotal = collection.eurAmount * quantity;
            totalEUR += itemTotal;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${t[collection.name] || collection.displayName}</div>
                    <div class="cart-item-price">${formatSupportAmount(collection.eurAmount, supportPageCurrency)} each</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity-controls">
                        <button type="button" class="cart-quantity-btn cart-quantity-decrease" data-type="collection" data-id="${id}" aria-label="Decrease quantity">−</button>
                        <span class="cart-item-quantity">${quantity}</span>
                        <button type="button" class="cart-quantity-btn cart-quantity-increase" data-type="collection" data-id="${id}" aria-label="Increase quantity">+</button>
                    </div>
                    <button type="button" class="cart-item-remove" data-type="collection" data-id="${id}" aria-label="Remove">×</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        // Render donation
        Object.keys(cart.donations).forEach(level => {
            const donationData = donationLevelsData[level];
            if (!donationData) return;

            const amount = cart.donations[level];
            totalEUR += amount;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${t[donationData.name] || donationData.displayName} ${t.cartDonationLabel || 'Donation'}</div>
                    <div class="cart-item-price">${formatSupportAmount(amount, supportPageCurrency)}</div>
                </div>
                <div class="cart-item-actions">
                    <button type="button" class="cart-item-remove" data-type="donation" aria-label="Remove">×</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        // Update total
        if (cartTotalEl) {
            cartTotalEl.textContent = formatSupportAmount(totalEUR, supportPageCurrency);
        }

        // Show empty message if cart is empty
        const emptyMessage = document.getElementById('cart-empty-message');
        if (emptyMessage) {
            emptyMessage.style.display = (getCartItemCount() === 0) ? 'block' : 'none';
        }

        // Enable/disable checkout button
        const checkoutBtn = document.getElementById('cart-checkout-button');
        if (checkoutBtn) {
            checkoutBtn.disabled = getCartItemCount() === 0;
        }

        // Attach remove handlers
        cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                if (type === 'collection') {
                    const id = this.getAttribute('data-id');
                    removeCollection(id);
                } else if (type === 'donation') {
                    removeDonation();
                }
            });
        });

        // Attach quantity control handlers
        cartItemsContainer.querySelectorAll('.cart-quantity-increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const currentQty = cart.collections[String(id)] || 0;
                updateCollectionQuantity(id, currentQty + 1);
            });
        });

        cartItemsContainer.querySelectorAll('.cart-quantity-decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const currentQty = cart.collections[String(id)] || 0;
                if (currentQty > 1) {
                    updateCollectionQuantity(id, currentQty - 1);
                } else {
                    // If quantity is 1, remove the item
                    removeCollection(id);
                }
            });
        });
    }

    // Format amount (needs to be available globally or passed in)
    function formatSupportAmount(amount, currency) {
        if (typeof window.formatSupportAmount === 'function') {
            return window.formatSupportAmount(amount, currency);
        }
        // Fallback
        if (currency === 'USD') {
            const rate = window.supportExchangeRate || 1.08;
            const usdAmount = Math.round(amount * rate);
            return '$' + usdAmount.toLocaleString('en-US');
        }
        const whole = Math.round(amount);
        const formatted = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formatted + '€';
    }

    // Initialize cart on load
    loadCart();

    // Export cart API
    window.ShoppingCart = {
        addCollection: addCollection,
        removeCollection: removeCollection,
        updateCollectionQuantity: updateCollectionQuantity,
        addDonation: addDonation,
        removeDonation: removeDonation,
        clearCart: clearCart,
        getCartItemCount: getCartItemCount,
        getCartTotalEUR: getCartTotalEUR,
        getCartItems: getCartItems,
        getCart: function() { return JSON.parse(JSON.stringify(cart)); },
        updateCartUI: updateCartUI,
        renderCartModal: renderCartModal
    };

    // Auto-update UI when language changes
    const origUpdateLang = window.updatePageLanguage;
    if (origUpdateLang) {
        window.updatePageLanguage = function(lang) {
            origUpdateLang(lang);
            if (document.getElementById('cart-modal') && document.getElementById('cart-modal').classList.contains('active')) {
                renderCartModal();
            }
        };
    }

})();
