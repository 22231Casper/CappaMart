fetch('/templates/productsFeatured.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#productsFeatured");
    let newelem = document.createElement("div");
    newelem.classList.add("row");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})