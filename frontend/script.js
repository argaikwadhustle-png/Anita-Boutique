let cart = [];

fetch("http://localhost:5000/products")
.then(res => res.json())
.then(data => {
    const list = document.getElementById("product-list");

    data.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${product.image}" width="100%">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;

        list.appendChild(div);
    });
});

function addToCart(name, price){
    cart.push({name, price});
    updateCart();
}

function updateCart(){
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "<h3>Cart</h3>";

    let total = 0;
    let message = "Hello, I want to order:\n";

    cart.forEach(item => {
        cartDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
        total += item.price;
        message += `${item.name} - ₹${item.price}\n`;
    });

    cartDiv.innerHTML += `<strong>Total: ₹${total}</strong><br>`;

    const whatsappLink = `https://wa.me/919518923235?text=${encodeURIComponent(message + "Total: ₹" + total)}`;

    cartDiv.innerHTML += `<br><a href="${whatsappLink}" target="_blank">Checkout via WhatsApp</a>`;
}
