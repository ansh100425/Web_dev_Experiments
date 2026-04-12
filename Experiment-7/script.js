// --- TASK 2: Product Data (Updated with Rupee values) ---
const products = [
    { id: 1, name: "Wireless Headphones", price: 2499.00, desc: "High-quality noise-canceling headphones." },
    { id: 2, name: "Smartwatch", price: 3999.00, desc: "Track your fitness and receive notifications." },
    { id: 3, name: "Mechanical Keyboard", price: 3499.00, desc: "Clicky switches with RGB backlighting." },
    { id: 4, name: "Gaming Mouse", price: 1299.00, desc: "Ergonomic design with adjustable DPI." }
];

// --- TASK 7 (Bonus): Load cart from Local Storage ---
let cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];

window.onload = () => {
    renderProducts();
    updateCartUI();
};

// --- TASK 2: Render Products dynamically ---
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="desc">${product.desc}</p>
            <p class="price">₹${product.price.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

// --- TASK 4: Add to Cart ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    alert(`${product.name} added to cart!`);
}

// --- TASK 7: Update Quantity (+ / -) ---
function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// --- TASK 4: Remove Item ---
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// --- TASK 5: Cart Summary & Math ---
function updateCartUI() {
    localStorage.setItem('techstore_cart', JSON.stringify(cart));

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong> <br>
                ₹${item.price.toFixed(2)} each
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <div>
                <strong>₹${itemTotal.toFixed(2)}</strong>
                <button class="btn btn-danger btn-sm" style="margin-left:10px" onclick="removeFromCart(${item.id})">X</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    document.getElementById('cart-total').innerText = totalPrice.toFixed(2);
}

// --- Navigation / UI Toggle ---
function showSection(sectionName) {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('cart-section').classList.add('hidden');
    document.getElementById('checkout-section').classList.add('hidden');

    document.getElementById(`${sectionName}-section`).classList.remove('hidden');
}

// --- TASK 6: Checkout Simulation ---
function processCheckout(event) {
    event.preventDefault(); 
    
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }

    document.getElementById('checkout-form').classList.add('hidden');
    document.getElementById('confirmation-msg').classList.remove('hidden');
    
    cart = [];
    localStorage.removeItem('techstore_cart');
    updateCartUI();
}
