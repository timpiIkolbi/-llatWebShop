// Elemek kijelölése
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Belső kosár állapot (üres tömbként indul)
let cart = [];

// 1. Kosár oldalsáv ki-be csukása
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// 2. Termék kosárba helyezése gombok
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        
        addItemToCart(name, price);
        
        // Animációs visszajelzés a gombnak
        button.innerText = "✓ Hozzáadva";
        button.style.background = "#10b981";
        button.style.color = "white";
        
        setTimeout(() => {
            button.innerText = "Kosárba";
            button.style.background = "#f1f5f9";
            button.style.color = "#2b2d42";
        }, 1000);
    });
});

// 3. Kosár tömb kezelése
function addItemToCart(name, price) {
    // Megnézzük, benne van-e már a kosárban
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    
    updateCartUI();
}

// 4. Kosár felületének frissítése (UI)
function updateCartUI() {
    // Kiürítjük a kosár konténert
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">A kosarad még üres.</p>';
        cartCount.innerText = '0';
        cartTotal.innerText = '0';
        return;
    }
    
    let totalItemsCount = 0;
    let totalPrice = 0;
    
    // Végigmegyünk a kosár elemein és legeneráljuk a HTML-t
    cart.forEach(item => {
        totalItemsCount += item.quantity;
        totalPrice += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>${item.price.toLocaleString()} Ft x ${item.quantity}</small>
            </div>
            <strong style="color: #4895ef;"> ${(item.price * item.quantity).toLocaleString()} Ft</strong>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Számlálók frissítése
    cartCount.innerText = totalItemsCount;
    cartTotal.innerText = totalPrice.toLocaleString();
}

// 5. Kamu vásárlás befejezése gomb
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("A kosarad üres! Adj hozzá termékeket a rendeléshez.");
        return;
    }
    
    alert("Köszönjük a vásárlást! (Ez egy teszt webshop, igazi rendelés nem történt).");
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove('active');
});