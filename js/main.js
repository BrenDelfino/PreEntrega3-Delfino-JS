const products = [
    { id: 'hamburguesa', name: 'Hamburguesa completa', price: 40, imagen: "img/hamburguesa.jpg"},
    { id: 'pollo', name: 'Pollo al spiedo', price: 70, imagen: "img/pollo.jpg" },
    { id: 'milanesa', name: 'Milanesa napolitana', price: 55, imagen: "img/mila-napo.jpg"  },
    { id: 'pizza', name: 'Pizza de rucula y tomate', price: 50, imagen: "img/pizza.jpg" },

    { id: 'papas', name: 'Papas fritas', price: 30, imagen: "img/paps-fritas.jpg"},
    { id: 'ensalada', name: 'Ensalada de lechuga y tomate', price: 15, imagen: "img/ensalada.jpg"  },
    { id: 'pure', name: 'Pure de calabaza', price: 25, imagen: "img/pure.jpg" },
    { id: 'tortilla', name: 'Tortilla de papa', price: 35, imagen: "img/tortilla-de-patatas-espanola.jpg"},

    { id: 'gaseosa', name: 'Gaseosa 2lt', price: 30, imagen: "img/coca-cola.jpg"},
    { id: 'saborizada', name: 'Agua saborizada 500ml', price: 18, imagen: "img/jugo.jpg"  },
    { id: 'agua', name: 'Agua sin gas 500ml', price: 13, imagen: "img/agua.jpg"  },
    { id: 'cerveza', name: 'Cerveza 710cc', price: 20, imagen: "img/cerveza.jpg" },
];

let cart = [];

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
        alert('¡Gracias por su compra! El repartidor se encuentra en camino.');
        cart = []; 
        updateCart();
        localStorage.removeItem('cart');
        closeCart();
    } else {
        alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
        closeCart();
    }
}

document.getElementById('cartButton').addEventListener('click', showCart);
document.querySelector('.close-button').addEventListener('click', closeCart);
document.getElementById('checkoutButton').addEventListener('click', checkout);

/*** Inicializador ***/
loadProducts();
loadCart();