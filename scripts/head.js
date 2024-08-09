fetch('/templates/head.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#head");
    let newelem = document.createElement("head");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})