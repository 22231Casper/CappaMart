var CBDisplays;
var cartNumDisplays;
var price;
var perclick;
var upgradeButton;
var cartTotal = 0;

var sounds = {
    "click": new Audio("/audio/Better Clicker Sound.mp3"),
    "flare": new Audio("/audio/flare_launch.mp3"),
    "evil": new Audio("/audio/Evil Laugh.mp3"),
    "dunk": new Audio("/audio/dunk.mp3"),
    "giggle": new Audio("/audio/giggle.mp3")
};

// Update the CappaBucks displays to show the current amount
function updateCBDisplays() {
    for (let i = 0; i < CBDisplays.length; i++) {
        CBDisplays[i].innerHTML = "CB: $" + getCB();
    }
}

// Return the current amount of CappaBucks
function getCB() {
    return parseFloat(localStorage.getItem("CappaBucks"));
}

// Set the current amount of CappaBucks to the given amount
function setCB(amount) {
    localStorage.setItem("CappaBucks", amount);
    updateCBDisplays();
}

// Add the given amount to the current amount of CappaBucks
function changeCB(amount) {
    setCB(parseFloat(getCB()) + amount);
}

function CBDisplaysInit() {
    if (!localStorage.getItem("CappaBucks")) {
        setCB(1);
    }
    // Get all displays on the page
    CBDisplays = document.getElementsByClassName("CBDisplay");

    // Update CappaBucks display once at the start
    updateCBDisplays();
}

// Cart
function cartNumDisplaysInit() {
    if (!localStorage.getItem("cart")) {
        resetCart();
    }
    cartNumDisplays = document.getElementsByClassName("cartNumDisplay");
    updateCartNumDisplays();
}

function resetCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    updateCartNumDisplays();
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

function addToCart(productName) {
    cart = getCart();

    cartIndex = 0;
    if (cart.length) {
        cartIndex = cart.length;
    }
    cart[cartIndex] = productName;
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartNumDisplays();
}

function removeFromCart(productName) {
    var cart = getCart();
    var newCart = [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i] == productName) {
            console.log("Removing " + productName + " from cart")
            productName = "";
            continue;
        }
        console.log("Added the other thing");
        newCart.push(cart[i]);
    }
    console.log(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCartNumDisplays();
    updateCartDisplay();
}

function buyProducts() {
    if (check(cartTotal)) {
        changeCB(-cartTotal);
        for (let i = 0; i < getCart().length; i++) {
            download(getCart()[i]);
        }
        removeAllFromCart();
    }
}

function removeAllFromCart() {
    resetCart();
    updateCartDisplay();
}

function updateCartNumDisplays() {
    cart = getCart();
    for (let i = 0; i < cartNumDisplays.length; i++) {
        cartNumDisplays[i].innerHTML = "Cart (" + cart.length + ")";
    }
}

function updateCartTotal() {
    document.getElementById("cartTotal").innerHTML = "$CB: " + cartTotal;
    cartPriceCheck();
}

function cartPriceCheck() {
    console.log("Checking cart");
    var cartButton = document.getElementById("buyButton");
    console.log(cartButton)
    if (check(cartTotal)) {
        cartButton.classList.remove("disabled");
    } else {
        cartButton.classList.add("disabled");
    }
}

function check(amount) {
    return getCB() >= amount;
}

function buyButton() {
    sounds["giggle"].play();
    buyProducts();
}

function download(file) {
    let element = document.createElement("a");
    element.setAttribute("href", "/images/" + file);
    element.setAttribute("download", file);
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

// The main function that runs on every page
function main() {
    var page = window.location.pathname.split("/").pop();
    console.log("Main is running at " + page);

    // Initialise displays
    CBDisplaysInit();
    cartNumDisplaysInit();

    // Change all delay_name scripts to actual scripts
    var allScripts = document.getElementsByTagName("script");
    for (let i = 0; i < allScripts.length; i++) {
        let scriptID = allScripts[i].id;
        if (!scriptID) {
            continue;
        }
        if (scriptID.substring(0, 6) == "delay_") {
            allScripts[i].setAttribute(
                "src",
                "/scripts/" + scriptID.substring(6) + ".js",
            );
        }
    }
}

// This event runs when the page has loaded
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(main, 1000);
});
