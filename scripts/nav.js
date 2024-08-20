fetch('/templates/nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#nav");
    let newelem = document.createElement("nav");
    newelem.id = "nav";
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})