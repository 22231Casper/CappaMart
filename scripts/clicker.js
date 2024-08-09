var upgradeButton;
var flare = "flare";
var upgradePrice = 100
var perclick = 1
// variables

// upgrade function
function upgrade() {
    if (check(upgradePrice)) {
        sounds["evil"].pause();
        sounds["evil"].currentTime = 0;
        sounds["evil"].play();
        changeCB(-upgradePrice);
        upgradePrice *= 2;
        perclick = Math.round(perclick * 1.75);
    }
    updateCBDisplays()
    priceCheck()
}

// on clicke
function buttonClick() {
    changeCB(perclick);
    sounds[flare].pause();
    sounds[flare].currentTime = 0;
    sounds[flare].play();
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

setTimeout(function () {
    upgradeButton = document.getElementById("buyButton")
}, 1000)