document.addEventListener('DOMContentLoaded', () => {
    const dessertItemsContainer = document.getElementById('dessert-items');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const orderTotal = document.getElementById('order-total');

    let cart = [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(dessert => {
                const dessertItem = document.createElement('div');
                dessertItem.classList.add('dessert-item');
                dessertItem.innerHTML = `
                    <img src="${dessert.image.desktop}" alt="${dessert.name}">
                    <h3>${dessert.name}</h3>
                    <p>${dessert.category}</p>
                    <p>$${dessert.price.toFixed(2)}</p>
                    <button onclick="addToCart('${dessert.name}', ${dessert.price})">Add to Cart</button>
                `;
                dessertItemsContainer.appendChild(dessertItem);
            });
        });

    window.addToCart = (name, price) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    };

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
        orderTotal.textContent = `$${total.toFixed(2)}`;
    };

    window.removeFromCart = (name) => {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCart();
    };

    document.getElementById('confirm-order').addEventListener('click', () => {
        alert('Order confirmed!');
        cart = [];
        updateCart();
    });
});
