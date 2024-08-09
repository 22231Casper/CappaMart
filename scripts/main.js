var CBDisplays;
var cartNumDisplays;
var price;
var perclick;
var upgradeButton;

var sounds = {
    "click": new Audio("/sounds/Better Clicker Sound.mp3"),
    "flare": new Audio("/sounds/flare_launch.mp3"),
    "evil": new Audio("/sounds/Evil Laugh.mp3"),
    "dunk": new Audio("/sounds/dunk.mp3"),
    "giggle": new Audio("/sounds/giggle.mp3")   
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
    // Get all displays on the page
    CBDisplays = document.getElementsByClassName("CBDisplay");
    price = 100
    perclick = 1

    // Update CappaBucks display once at the start
    updateCBDisplays();
}

// Cart
function cartNumDisplaysInit() {
    if (!localStorage.getItem("cart")) {
        resetCart()
    }
    cartNumDisplays = document.getElementsByClassName("cartNumDisplay")
    updateCartNumDisplays()
}

function resetCart() {
    localStorage.setItem("cart", JSON.stringify([]));
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

function addToCart(productName) {
    cart = getCart()

    cartIndex = 0;
    if (cart.length) {
        cartIndex = cart.length;      
    }
    cart[cartIndex] = productName;
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartNumDisplays()
}

function removeFromCart(productName) {
    localStorage.setItem("cart", JSON.stringify(getCart().filter(item => item !== productName)));
    updateCartNumDisplays()
}

function buyProducts() {
    for (let i = 0; i < getCart().length; i++) {
        download(getCart()[i])
    }
    removeAllFromCart()
}

function removeAllFromCart() {
    for (let i = 0; i < getCart().length; i++) {
        removeFromCart(getCart()[i])
    }
}

function updateCartNumDisplays() {
    cart = getCart()
    for (let i = 0; i < cartNumDisplays.length; i++) {
        cartNumDisplays[i].innerHTML = "Cart (" + cart.length + ")";
    }
}

function updateCartDisplay() {
    cart = getCart()
    
    for (let i = 0; i < cart.length; i ++) {
        console.log(cart[i] + " is in the cart.")
        fetch("/templates/cartItem.html")
        .then(res => res.text())
        .then(text => {
            
        })
    }
    
    fetch('/templates/cart.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("div#cartDisplay");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem,oldelem);
    });
}

function buyButton() {
    funny2.play();
    buyProducts();
}

function download(file) {
    // Creating an invisible element

    let element = document.createElement('a');
    element.setAttribute('href', '/images/' + file);
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}
// The main function that runs on every page

function main() {
    console.log("Main is running");
    
    // Initialise displays
    CBDisplaysInit()
    cartNumDisplaysInit()
    
    // Change all delay_name scripts to actual scripts
    var allScripts = document.getElementsByTagName("script");
    for (let i = 0; i < allScripts.length; i++) {
        let scriptID = allScripts[i].id;
        if (!scriptID) {
            continue;
        }
        if (scriptID.substring(0, 6) == "delay_") {
            allScripts[i].setAttribute("src", "/scripts/" + scriptID.substring(6) + ".js");
        }
    }
}

// This event runs when the page has loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(main, 1000);
})