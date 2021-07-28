/***** Les constantes *****/
const container = document.getElementById("containerCart");
console.log(container);
const clearCartBtn = document.getElementById("clearCartBtn");
/***** Les variables *****/

/* Récupération des produits dans le local storage */
let productsInCart = JSON.parse(localStorage.getItem("cart"));

/* Stockage du nombre de produit du localStorage dans un variable */
if (productsInCart === null ) {
    container.innerHTML =   `
    <div id="containerCartEmpty">
        <h2>
            Votre panier est vide.
        </h2>
    </div>
    `
    clearCartBtn.style = "display: none"
}else {
    for (var i = 0; i < productsInCart.length; i++){
        createDiv(productsInCart);
    }
};



/***** Fonction qui crée la div de produit *****/

function createDiv(productsInCart) {

    /* Création d'une div container des produits */
    const containerProductCart = document.createElement("div");
    containerProductCart.classList.add("containerProductCart");

    /* Appel de la fonction qui crée une balise img */
    const image = createimg(productsInCart);

    /* Appel de la fonction qui crée une balise p pour le nom du produit */
    const name = createName(productsInCart);

    /* Appel de la fonction qui crée une balise p pour le prix */
    const price = createPrice(productsInCart);

    /* Appel de la fonction qui crée un p pour la couleur selectionnée */
    const colorSelected = createColorSelected(productsInCart);

    /* Montage de la div */
    containerProductCart.appendChild(image);
    containerProductCart.appendChild(name);
    containerProductCart.appendChild(price);
    containerProductCart.appendChild(colorSelected);

    /* Ajout de la div dans le DOM */
    document.getElementById("containerCart").appendChild(containerProductCart)
};

/***** Fonction qui crée une balise image *****/
function createimg(productsInCart) {
    const imageFigure = document.createElement("figure");
	const image = document.createElement("img");
	image.setAttribute("src", productsInCart[i].imageUrl);
	imageFigure.appendChild(image);

	return image;
};

/***** Fonction qui crée une balise p pour le nom du produit *****/
function createName(productsInCart) {
    const name = document.createElement("p");
    name.classList.add("nameProductInCart");
    name.innerText = productsInCart[i].name;

    return name;
};

/***** Fonction qui crée une balise p pour le prix *****/
function createPrice(productsInCart) {
    const price = document.createElement("p");
    price.classList.add("priceProductInCart");
    price.innerText = (productsInCart[i].price/ 100).toFixed(2) + "€";

    return price;
};

/***** Fonction qui crée une balise p pour la couleur selectionnée *****/
function createColorSelected(productsInCart) {
    const colorSelected = document.createElement("p");
    colorSelected.classList.add("colorSelected");
    colorSelected.innerText = productsInCart[i].selectedColor;

    return colorSelected;
}


/*****  Boutton qui vide le panier *****/
clearCartBtn.addEventListener("click",() => {
    localStorage.clear();
    // alert("Le panier a été vidé ");
    window.location.href = "cart.html";
});





