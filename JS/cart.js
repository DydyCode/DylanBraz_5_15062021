
/***** Pointage des éléments sur le DOM *****/
const container = document.getElementById("containerCart");
const containerForm = document.getElementById("containerForm");
const clearCartBtn = document.getElementById("clearCartBtn");

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
    <form method="post">
        <label for="prenom" > Entrez votre Prénom :</label>
        <input type="text" name="prenom" id="prenom" required="required" maxlength="20">
        <span id="prenomManquant"></span>

        <label for="Nom" > Entrez votre Nom :</label>
        <input type="text" name="nom" id="nom" required="required" maxlength="20">
        <span id="nomManquant"></span>

        <label for="tel" > Entrez votre numéro de téléphone :</label>
        <input type="tel" name="tel" id="tel" required="required">
        <span id="telManquant"></span>
        
        <label for="email" > Entrez votre adresse mail :</label>
        <input type="email" name="mail" id="mail" required="required">
        <span id="mailManquant"></span>

        <input type="submit" value="Valider ma commande" id="validateOrderBtn">
    </form>
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

function getCart () {
    let ProductsInCart = localStorage.getItem("cart");
    if (ProductsInCart === null){
        productsInCart = [];
        return productsInCart;
    }else {
        return ProductsInCart;
    }
}

/********************************* Le formulaire ********************************* /

/***** Les REGEX *****/

let prenomValidation = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;
let telValidation = /^\d{10}$/;
let mailValidation = /^/;

/***** Pointage des éléments du formulaire sur le DOM *****/
let prenom = document.getElementById('prenom');
let prenomManquant = document.getElementById('prenomManquant');
let nom = document.getElementById('nom');
let nomManquant = document.getElementById('nomManquant');
let tel = document.getElementById('tel');
let telManquant = document.getElementById("telManquant");
let mail = document.getElementById('mail');
let mailManquant = document.getElementById('mailManquant');

/***** Events *****/

let validateOrderBtn = document.getElementById('validateOrderBtn');
validateOrderBtn.addEventListener("click",(e) => {
    firstNameIsValid(e);
    nameIsValid(e);
    telIsValid(e);
    mailIsValid(e);
})

/********** Les fonctions du formulaire **********/

/***** Fonction qui vérifie si le champ prénom est remplie et respect les REGEX *****/
function firstNameIsValid(e) {
    if(prenom.validity.valueMissing) {
        e.preventDefault();
        prenomManquant.textContent = "Veuillez renseignez un prénom";
        prenomManquant.style.color = "red";
    }else if (prenomValidation.test(prenom.value) == false){
        e.preventDefault(); 
        prenomManquant.textContent="Format incorrect";
        prenomManquant.style.color ="red";
    }else {

    }
}

/***** Fonction qui vérifie si le champ Nom est remplie et respect les REGEX *****/
function nameIsValid(e) {
    if(nom.validity.valueMissing) {
        e.preventDefault();
        nomManquant.textContent = "Veuillez renseignez un nom";
        nomManquant.style.color = "red";
    }else if (prenomValidation.test(nom.value) == false){
        e.preventDefault(); 
        nomManquant.textContent="Format incorrect";
        nomManquant.style.color ="red";
    }else {

    }
}

/***** Fonction qui vérifie si le champ tel est remplie et respect les REGEX *****/
function telIsValid(e) {
    if(tel.validity.valueMissing) {
        e.preventDefault();
        telManquant.textContent = "Veuillez renseignez un numéro";
        telManquant.style.color = "red";
    }else if (telValidation.test(tel.value) == false){
        e.preventDefault(); 
        telManquant.textContent="Format incorrect";
        telManquant.style.color ="red";
    }else {

    }
}

/***** Fonction qui vérifie si le champ email est remplie et respect les REGEX *****/
function mailIsValid(e) {
    if(mail.validity.valueMissing) {
        e.preventDefault();
        mailManquant.textContent = "Veuillez renseignez une adresse mail";
        mailManquant.style.color = "red";
    }else if (mailValidation.test(mail.value) == false){
        e.preventDefault(); 
        mailManquant.textContent="Format incorrect";
        mailManquant.style.color ="red";
    }else {

    }
}