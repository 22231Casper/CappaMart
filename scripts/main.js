var CBDisplays;
var cartNumDisplays;

var sounds = {
    "click": new Audio("/audio/Better Clicker Sound.mp3"),
    "upgrade": new Audio("/audio/Better Clicker Sound.mp3"),
    "boowomp": new Audio("/audio/boowomp.mp3"),
    "buy": new Audio("/audio/money.mp3"),
    "lottery": new Audio("/audio/lottery.mp3"),
    "flare": new Audio("/audio/flare_launch.mp3"),
    "evil": new Audio("/audio/evil-laugh.mp3"),
    "dunk": new Audio("/audio/dunk.mp3"),
    "giggle": new Audio("/audio/giggle.mp3"),
    "nummy pobcorn": new Audio("/audio/i-got-nummy-pobcorn.mp3"),
    "drink": new Audio("/audio/noah-drink.mp3"),
    "cappabot": new Audio("/audio/cappabot.mp3"),
    "crash1": new Audio("/audio/crash1.mp3"),
    "crash2": new Audio("/audio/crash2.mp3"),
    "crash3": new Audio("/audio/crash3.mp3"),
    "crash4": new Audio("/audio/crash4.mp3"),
    "crash5": new Audio("/audio/crash5.mp3"),
    "whip": new Audio("/audio/whip.mp3"),
    "prank": new Audio("/audio/funny-prank.mp3"),
    "prank2": new Audio("/audio/bathroom-prank2.mp3"),
    "prank3": new Audio("/audio/bathroom-prank3.mp3")
};

function playSound(soundName) {
    let sound = sounds[soundName];
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

function evilNoise() {
    // Do the thing
    setTimeout(function() {
        playSound("crash4")
    }, 1000)

    setTimeout(function() {
        playSound("crash1")
    }, 6000)

    setTimeout(function() {
        playSound("crash2")
    }, 11000)

    setTimeout(function() {
        playSound("crash4")
    }, 16000)
}

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
    localStorage.setItem("CappaBucks", Math.floor(amount));
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
            productName = "";
            continue;
        }
        newCart.push(cart[i]);
    }
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

function updateCartTotal(cartTotal) {
    document.getElementById("cartTotal").innerHTML = "$CB: " + cartTotal;
    cartPriceCheck(cartTotal);
}

function cartPriceCheck(cartTotal) {
    var cartButton = document.getElementById("buyButton");
    if (check(cartTotal)) {
        cartButton.classList.remove("disabled");
    } else {
        cartButton.classList.add("disabled");
    }
}

function productClick(productName) {
    playSound("click")
    console.log("Clicked " + productName);
}

function check(amount) {
    return getCB() >= amount;
}

function buyButton() {
    playSound("buy");
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

function activateMoney() {
    playSound("lottery")
    let moneys = document.getElementsByClassName("money");

    // Mega money jumpscare fr
    activateCoins();
    for (let i = 0; i < moneys.length; i++) {
        moneys[i].style.display = "block";

        setTimeout(function () {
            moneys[i].style.display = "none";
        }, 3700);
    }
}

function activateCoins() {
    // Get the coin image names
    let coinNames = ["burger-coin.png", "coin.png", "coin2.png", "dabloon.png", "happy-coin.png", "big money.jpg", "gfgfg.jpg", "nfhf.jpg", "cart.jpg", "ai.webp", "gggggg.png", "ffffff.webp", "sash.webp"];

    // Make a few coins on the page using random coin names
    for (let i = 0; i < 100; i++) {
        setTimeout(function() {makeCoin("/images/coin/" + coinNames[Math.floor(Math.random() * coinNames.length)]);}
                   , i * 30);
    }
}

function makeCoin(coinName) {
    let coin = document.createElement("img");
    
    let x = Math.floor(Math.random() * 100);
    let y = -50;
    let xv = Math.random() - 0.5;
    let yv = 0;

    var gravity = 0.2;
    var boingus = -0.1;
    
    coin.src = coinName;
    coin.classList.add("coin");
    document.body.appendChild(coin);
    
    let coinInterval = setInterval(function () {
        if (x > 100 || x < 0) {
            xv *= -1 - boingus;
        }

        if (y > 75) {
            yv *= -1 - boingus;
        }
        
        yv += gravity;
        
        y += yv;
        x += xv;
        
        coin.style.left = x + "%";
        coin.style.top = y + "%";
    }, 20)
    
    // Remove the coin after a random amount of time
    setTimeout(function () {
        clearInterval(coinInterval)
        document.body.removeChild(coin);
    }, Math.random() * 1000 + 30000);
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
    setTimeout(main, 500);
});
