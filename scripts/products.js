fetch('/templates/products.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#products");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})