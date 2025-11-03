//About page contact form
const contactForm= document.getElementById("contactform");

if(contactForm){
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.qty = (existing.qty || 1) + (item.qty || 1);
    } else {
        cart.push({ id: item.id, title: item.title, price: item.price, qty: item.qty || 1 });
    }
    saveCart(cart);
    updateCartEmptyState();
    alert(`${item.title} added to cart`);
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartEmptyState();
}

function updateCartEmptyState() {
    const emptyEl = document.getElementById('cart-empty');
    const listEl = document.getElementById('cart-items');
    const cart = getCart();
    if (emptyEl) emptyEl.style.display = cart.length ? 'none' : 'block';
    if (listEl) {
        listEl.innerHTML = '';
        if (cart.length) {
            cart.forEach(i => {
                const row = document.createElement('div');
                row.className = 'cart-row';
                row.innerHTML = `<div class="cart-title">${i.title}</div><div class="cart-qty">Qty: ${i.qty}</div><div class="cart-price">$${(i.price).toFixed(2)}</div>`;
                listEl.appendChild(row);
            });
            const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
            const tot = document.createElement('div');
            tot.className = 'cart-total';
            tot.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
            listEl.appendChild(tot);
        }
    }
}

// wire up add-to-cart buttons on storefront (delegation)
document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('[data-add-to-cart]');
    if (btn) {
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title') || 'Item';
        const price = parseFloat(btn.getAttribute('data-price')) || 0;
        addToCart({ id, title, price, qty: 1 });
    }
});

// initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => updateCartEmptyState());

    const first = document.getElementById("first-name").value;
    const last = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if(!first || !last|| !email || !message){
        alert ("Please fill in all fields");
        return;
    }

    alert(`Thank you, ${first}! Your messasge has been received.`);
    contactForm.reset(); 
});
}
// Login Page: Sign Up / Login Form
const signupForm= document.getElementById("signup-form");

if(signupForm){
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value; 

    if(!username || !password){
        alert ("Please enter both username and password");
        return;
    }

    alert(`Welcome, ${username}! You have successfully logged in.`);
    signupForm.reset(); 
});
}


