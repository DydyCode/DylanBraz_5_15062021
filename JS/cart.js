let colorSelected = document.getElementById("colorSelected");
let teddySelected = document.getElementById("teddySelected");
let price = document.getElementById("price");
const containerCart = document.getElementById("containerCart");
const img = localStorage.getItem("imgTeddy");

colorSelected = localStorage.getItem("ColorSelected");
teddySelected = localStorage.getItem("Name");
price = localStorage.getItem("Price");

containerCart.innerHTML = 
`
<div class="productInCart">
<img src="${img}">
<p>
produit : ${teddySelected}
</p>
<p>
couleur : ${colorSelected}
</p>
<p>
prix : ${price}€
</p>
</div>

`
