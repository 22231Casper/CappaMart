var upgradeButton = document.getElementById("buyButton");
var flare = "flare";
// variables

// upgrade function
function upgrade() {
    if (getCB() >= price) {
        sounds["evil"].pause();
        sounds["evil"].currentTime = 0;
        sounds["evil"].play();
        setCB(getCB() - price);
        price *= 2;
        perclick = Math.round(perclick * 1.75);
    }
    updateCBDisplays()
}

// on clicke
function buttonClick() {
    changeCB(perclick);
    sounds[flare].pause();
    sounds[flare].currentTime = 0;
    sounds[flare].play();
    priceCheck();
    console.log("it ran")
}

// checks vost against money to change button
function priceCheck() {
    upgradeButton.innerHTML = "Upgrade (" + price + ")";
    if (getCB() >= price) {
        upgradeButton.disabled = false;
    } else {
        upgradeButton.disabled = true;
    }

}