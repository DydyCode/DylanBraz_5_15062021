/***** Les constantes *****/
const container = document.getElementById("containerCart");
const containerForm = document.getElementById("containerForm");
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
    containerForm.innerHTML = 
    `
    <input type="text" placeholder="Prénom">
    <input type="text" placeholder="Nom">
    <input type="text" placeholder="Mail">
    <input type="text" placeholder="Adresse postal">
    <button class="validateOrderBtn">Valider la commande</button>
    `
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

    /* Appel de la fonction qui crée un bouton supprimer */
    const deletBtn = createDeleteBtn(productsInCart);

    /* Montage de la div */
    containerProductCart.appendChild(image);
    containerProductCart.appendChild(name);
    containerProductCart.appendChild(price);
    containerProductCart.appendChild(colorSelected);
    containerProductCart.appendChild(deletBtn);


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

/***** Fonction qui crée un boutton supprimer *****/
function  createDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "Supprimer";

    return deleteBtn;
}

/*****  Boutton qui vide le panier *****/
clearCartBtn.addEventListener("click",() => {
    localStorage.clear();
    window.location.href = "cart.html";
});

// /***** Fonction qui crée un formulaire *****/
// function createForm() {
//     const container = document.createElement("div");
//     container.classList.add("containerForm");

//     const inputFirstName = document.createElement("input");
//     inputFirstName.setAttribute("type", "text");
//     inputFirstName.setAttribute("placeholder", "Prénom");

//     const inputName = document.createElement("input");
//     inputName.setAttribute("type", "text");
//     inputName.setAttribute("placeholder", "Nom");

//     const inputMail = document.createElement("input");
//     inputMail.setAttribute("type", "text");
//     inputMail.setAttribute("placeholder", "Mail");

//     const inputAdressePostal = document.createElement("input");
//     inputAdressePostal.setAttribute("type", "text");
//     inputAdressePostal.setAttribute("placeholder", "Adresse postal");

//     container.appendChild(inputFirstName);
//     container.appendChild(inputName);
//     container.appendChild(inputMail);
//     container.appendChild(inputAdressePostal);

//     return container;
// }


// // let allDeleteBtn = document.querySelectorAll(".deleteBtn");

// // for (let b = 0; b < allDeleteBtn.length; b++) {
// //     allDeleteBtn[b].addEventListener("click", (event) => {
// //         event.preventDefault();

// //         let productToDelete = productsInCart[b]._id + productsInCart[b].selectedColor;
    
//         // let prodcutDelete =  productToDelete.slice(productsInCart._id)
//         // console.log(productToDelete);
//         // productsInCart = productsInCart.filter( el => el._id !== productToDelete);
//         // console.log(productsInCart);
//     })
// }
function getCart () {
    let ProductsInCart = localStorage.getItem("cart");
    if (ProductsInCart === null){
        productsInCart = [];
        return productsInCart;
    }else {
        return ProductsInCart;
    }
}



