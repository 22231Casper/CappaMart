fetch('/templates/____.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#____");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})