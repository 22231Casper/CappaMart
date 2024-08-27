var clickerButton;
var upgradeButton;
var price;
var removeEvil;
var upgradePrice = 100;
var perclick = 1;
var evilIn = -1;

// variables ^^^

function exorcism() {
    // Do the thing
    if (clickerButton.classList.contains("yarg") || clickerButton.classList.contains("evilSoon")) {
        clickerButton.classList.remove("yarg");
        clickerButton.classList.remove("evilSoon");
        evilIn = -1;
        setTimeout(function() {evilIn = -1;}, 250);
        setTimeout(function() {evilIn = -1;}, 500);
        setTimeout(function() {evilIn = -1;}, 750);
        setTimeout(function() {evilIn = -1;}, 1000);
        playSound("whip");
        let prankSounds = ["prank", "prank2", "prank3"];
        let prankSound = prankSounds[Math.floor(Math.random()*prankSounds.length)]
        setTimeout(function() {playSound(prankSound);}, 2000);
    }
}

// on clicke
function buttonClick() {
    // If lottery is in the classList
    if (clickerButton.classList.contains("lottery")) {
        changeCB(perclick * (Math.random() * 10 + 20));
        activateMoney();
        clickerButton.classList.remove("lottery");
    } else if (clickerButton.classList.contains("yarg")) {
        setCB(0);
        playSound("evil");
        evilNoise();
        clickerButton.classList.remove("yarg");
    } else if ((Math.random()) < 0.02) {
        changeCB(-perclick*2);
        playSound("boowomp");
    } else {
        changeCB(perclick);
        playSound("click");
    }
    priceCheck();
    
    // lottery
    randNum = Math.random();
    let classToAdd = "";
    
    if (randNum > 1 - (1/200)) {
        classToAdd = "lottery";
    } else if (randNum < (1/400)) {
        setTimeout(function() {evilIn = 10;}, 1000);
        classToAdd = "evilSoon";
    }
    if (classToAdd) {
        clickerButton.classList.add(classToAdd);
    }
    
    evil();
}

// if the evil when the yup
function evil() {
    if (evilIn > 0) {
        evilIn -= 1;
    } else if (evilIn == 0) {
        evilIn = -1;
        clickerButton.classList.remove("evilSoon");
        clickerButton.classList.add("yarg");
    }
}

// upgrade function
function upgrade() {
    if (check(upgradePrice)) {
        playSound("upgrade");
        changeCB(-upgradePrice);
        upgradePrice *= 3;
        perclick = Math.round(perclick * 2);
    }
    priceCheck();
}

// checks vost against money to change button
function priceCheck() {
    upgradeButton.innerHTML = "Upgrade (" + upgradePrice + ")";
    if (check(upgradePrice)) {
        upgradeButton.classList.remove("disabled");
    } else {
        upgradeButton.classList.add("disabled");
    }
}

// evil test for debugging
function evilInTest() {
    setInterval(function() {
        console.log("evil in: " + evilIn)
    }, 500)
}

// go gambling

function init() {
    clickerButton = document.getElementById("clickerButton");
    upgradeButton = document.getElementById("buyButton");
    removeEvil = document.getElementById("removeEvil");
    priceCheck();
}

setTimeout(function () {
    init();
}, 1000)