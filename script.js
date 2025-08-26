document.addEventListener("DOMContentLoaded", function () {
    // State variables
    let allProducts = [];
    let cart = [];
    
    // Your WhatsApp number
    const whatsappNumber = "9360615435"; 

    // Fetch product data from CSV
    function initializeStore() {
        fetch("Product.csv") 
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok. Make sure products.csv exists.");
                }
                return response.text();
            })
            .then(csvText => {
                parseCSVData(csvText);
            })
            .catch(err => {
                console.error("Error loading CSV:", err);
                document.getElementById("productsContainer").innerHTML = `<p class="text-center text-danger">Could not load product list. Please check the console for errors.</p>`;
            });
    }

    // Parse CSV text into product objects (Updated for new column)
    function parseCSVData(csvText) {
        const lines = csvText.trim().split('\n');
        allProducts = [];
        // Start from 1 to skip header row
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",");
            // Now expects at least 6 columns
            if (values.length >= 6) {
                allProducts.push({
                    id: values[0].trim(),
                    name: values[1].trim(),
                    quantity_text: values[2].trim(), // New quantity field
                    category: values[3].trim(),
                    price: parseFloat(values[4].trim()) || 0,
                    originalPrice: parseFloat(values[5].trim()) || 0,
                });
            }
        }
        renderCategories();
        renderProducts("All");
        updateCartBadge();
    }

    // Render category filter pills
    function renderCategories() {
        const categories = ['All', ...new Set(allProducts.map(p => p.category))];
        const container = document.getElementById("categoriesContainer");
        container.innerHTML = categories.map(category => `
            <button class="category-pill ${category === 'All' ? 'active' : ''}" data-category="${category}">
                ${category}
            </button>
        `).join('');
        
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                renderProducts(pill.dataset.category);
            });
        });
    }

    // Render products based on selected category (Updated card HTML)
    function renderProducts(category) {
        const container = document.getElementById("productsContainer");
        const filtered = category === 'All' ? allProducts : allProducts.filter(p => p.category === category);
        
        if (filtered.length === 0) {
            container.innerHTML = `<p class="text-center w-100">No products found in this category.</p>`;
            return;
        }

        container.innerHTML = filtered.map(product => `
            <div class="product-card">
                <div>
                    <h5 class="card-title">${product.name}</h5>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="text-muted mb-0">${product.category}</p>
                        <span class="quantity-badge">${product.quantity_text}</span>
                    </div>
                </div>
                <div class="price-wrapper mt-auto">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="price-original">₹${product.originalPrice}</span>
                            <span class="price-current ms-2">₹${product.price}</span>
                        </div>
                        <button class="btn btn-add-cart" onclick="addToCart('${product.id}')">Add</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // --- CART FUNCTIONS ---
    window.addToCart = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartBadge();
        showCartFeedback();
    };

    function showCartFeedback() {
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.classList.add('animate');
        setTimeout(() => cartBtn.classList.remove('animate'), 300);
    }

    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('cartBadge');
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.classList.remove('d-none');
        } else {
            badge.classList.add('d-none');
        }
        updateCartModal();
    }

    function updateCartModal() {
        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');

        if (cart.length === 0) {
            container.innerHTML = `<div class="text-center py-5"><i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i><p>Your cart is empty.</p></div>`;
            totalEl.textContent = '0';
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalEl.textContent = total.toFixed(2);

        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="flex-grow-1 me-3">
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">₹${item.price.toFixed(2)}</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="mx-3">${item.quantity}</span>
                    <button class="btn btn-sm quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="btn btn-sm remove-btn" onclick="removeFromCart('${item.id}')"><i class="fas fa-times"></i></button>
                </div>
            </div>
        `).join('');
    }

    window.updateQuantity = (productId, change) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                updateCartBadge();
            }
        }
    };

    window.removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        updateCartBadge();
    };

    // --- BILL GENERATION ---
    window.generateBill = () => {
        if (cart.length === 0) return;
        
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const billHTML = `
            <div>
                <div class="bill-container" id="billToPrint">
                    <div class="bill-header">
                        <h4>🎆 Sree Agencies 🎆</h4>
                        <p>Sivakasi</p>
                    </div>
                    <table class="bill-table">
                        <thead>
                            <tr>
                                <th class="item-col">Item</th>
                                <th class="qty-col">Qty</th>
                                <th class="price-col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cart.map(item => `
                                <tr>
                                    <td class="item-col">${item.name}</td>
                                    <td class="qty-col">${item.quantity}</td>
                                    <td class="price-col">₹${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-between bill-total">
                        <span>GRAND TOTAL</span>
                        <span>₹${total.toFixed(2)}</span>
                    </div>
                    <div class="bill-footer">
                        <p>Thank you for your order!<br>Have a Safe & Happy Diwali!</p>
                    </div>
                </div>
                <div class="bill-instructions">
                    <h6 class="instructions-title">How to Confirm Your Order:</h6>
                    <p><strong>Step 1:</strong> Click the 'Download' button to save this bill as an image.</p>
                    <p><strong>Step 2:</strong> Click 'Send via WhatsApp' and attach the downloaded bill image to the message to finalize your order.</p>
                </div>
            </div>`;
        
        document.getElementById('billContent').innerHTML = billHTML;
        bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
        new bootstrap.Modal(document.getElementById('billModal')).show();
    };

    window.sendToWhatsApp = () => {
        let billText = "🧾 *Sree Agencies - Diwali Order* 🧨\n\nHello! I would like to place the following order. The bill is attached.\n\n";
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        billText += `*Order Total: ₹${total.toFixed(2)}*\n\nThank you!`;
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(billText)}`, "_blank");
    };

    window.downloadBill = () => {
        html2canvas(document.getElementById('billToPrint'), {
            backgroundColor: "#ffffff" 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `sree-agencies-bill-${Date.now()}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    // Initialize the application
    initializeStore();
});
