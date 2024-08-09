fetch('/templates/footer.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#footer");
    let newelem = document.createElement("footer");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})