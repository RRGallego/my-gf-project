document.addEventListener('DOMContentLoaded', () => {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSection = document.getElementById('cart');
    const cartContent = document.querySelector('.cart-content');
    const totalItems = document.getElementById('total-items-cart');
    const cartTotalItems = document.getElementById('cart-total-items');
    const totalPrice = document.getElementById('total-price-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    // Function to update cart UI
    function updateCart() {
        cartContent.innerHTML = '';
        let itemsCount = 0;
        let priceTotal = 0.0;
    
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total Price: $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
    
            cartContent.appendChild(cartItem);
    
            itemsCount += item.quantity; // Update items count with item quantity
            priceTotal += item.price * item.quantity;
        });
    
        totalItems.textContent = itemsCount;
        cartTotalItems.textContent = itemsCount;
        totalPrice.textContent = priceTotal.toFixed(2);
    }

    // Function to add item to cart
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCart();
    }

    // Function to remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Example usage: Add item to cart
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const item = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                img: button.getAttribute('data-img')
            };
            addToCart(item);
        });
    });

    // Remove item from cart when "Remove" button is clicked
    cartContent.addEventListener('click', event => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    // Checkout button event
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // You can add your checkout logic here
    });

    // Toggle cart visibility when clicking on the "Cart" link in the navbar
    cartToggle.addEventListener('click', () => {
        cartSection.classList.toggle('show-cart');
    });

    // Dark Mode Toggle (Example, if implemented)
    const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
    toggleSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Navbar Toggle for Mobile (Example, if implemented)
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});
