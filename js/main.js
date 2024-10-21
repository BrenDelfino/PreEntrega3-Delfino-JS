let cart = [];
let products = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then (data => {
        products = data;
        loadProducts(data);
    })

/*** Cargar productos al inicio ***/
function loadProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="item producto">
                <img class="foto" src="${product.imagen}" alt="">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
                <button onclick="addToCart('${product.id}')" class="boton-agregar">Agregar al Carrito</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

/*** Cargar el carrito desde localStorage ***/
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

/*** Cargar productos al carrito ***/
function addToCart(productId) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "bottom", 
        position: "left",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #a61a1c, #f59c39)",
        borderRadius: "2rem",
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

/*** Actualizar el carrito y guardar en localStorage ***/
function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name} (x${item.quantity})</h3>
            <p>Precio: $${item.price * item.quantity}</p>
            <button class="removeButton" onclick="removeFromCart('${item.id}')">Eliminar</button>
        `;
        cartDiv.appendChild(itemDiv);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = totalPrice;

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Carrito guardado en localStorage:', JSON.stringify(cart)); // Verificar guardado
}

/*** Eliminar productos del carrito ***/
function removeFromCart(productId) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "bottom", 
        position: "left",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #a61a1c, #f59c39)",
        borderRadius: "2rem",
        },
        onClick: function(){}
    }).showToast();
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

/*** Mostrar el cartel del carrito ***/
function showCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'block';
}

/*** Cerrar el cartel del carrito ***/
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
}

/*** Función para finalizar la compra ***/
function checkout() {
    if (cart.length > 0) {
        Swal.fire({
            icon: "success",
            title: "¡Gracias!",
            text: "El pedido fue confirmado, gracias por su compra",
        });
        cart = []; 
        updateCart();
        localStorage.removeItem('cart');
        closeCart();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡El carrito está vacío! Agrega productos antes de finalizar la compra",
        });
        closeCart();
    }
}

document.getElementById('cartButton').addEventListener('click', showCart);
document.querySelector('.close-button').addEventListener('click', closeCart);
document.getElementById('checkoutButton').addEventListener('click', checkout);

/*** Inicializador ***/
loadProducts();
loadCart();