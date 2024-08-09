cartDisplay = document.getElementById("cartTest");

cart = getCart()
cartThing = "";
for (let i = 0; i < cart.length; i++) {
    cartThing = cartThing + cart[i] + "<br>";
}
cartDisplay.innerHTML = cartThing;