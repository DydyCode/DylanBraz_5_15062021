
/***** Pointage des éléments sur le DOM *****/
const container = document.getElementById("containerCart");
const containerForm = document.getElementById("containerForm");
const clearCartBtn = document.getElementById("clearCartBtn");

/* Récupération des produits dans le local storage */
let productsInCart = JSON.parse(localStorage.getItem("cart"));

/***** Test si le panier est vide *****/
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
    /***** Si le panier n'est pas vide *****/
    for (let i = 0; i < productsInCart.length; i++){
        createDiv(productsInCart[i]);
    }
    containerForm.innerHTML = 
    `
    <form method="post">
        <label for="firstName" > Entrez votre Prénom :</label>
        <input type="text" name="firstName" id="firstName" required="required" maxlength="20">
        <span id="firstNameMissing"></span>

        <label for="name" > Entrez votre Nom :</label>
        <input type="text" name="name" id="name" required="required" maxlength="20">
        <span id="nameMissing"></span>

        <label for="tel" > Entrez votre numéro de téléphone :</label>
        <input type="tel" name="tel" id="tel" required="required">
        <span id="telMissing"></span>
        
        <label for="email" > Entrez votre adresse mail :</label>
        <input type="email" name="mail" id="mail" required="required">
        <span id="mailMissing"></span>

        <label for="adresse" > Entrez votre adresse :</label>
        <input type="adresse" name="adresse" id="adresse" required="required">
        <span id="adresseMissing"></span>

        <label for="postal" > Entrez votre adresse code postal :</label>
        <input type="postal" name="postal" id="postal" required="required">
        <span id="postalMissing"></span>

        <input type="submit" value="Valider ma commande" id="validateOrderBtn">
    </form>
    `
}



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

    /* Appel de la fonction qui crée un p pour afficher le total a payer */
    const total = createPforTotal(productsInCart);

    /* Montage de la div */
    containerProductCart.appendChild(image);
    containerProductCart.appendChild(name);
    containerProductCart.appendChild(price);
    containerProductCart.appendChild(colorSelected);
    containerProductCart.appendChild(deletBtn);
    containerCart.appendChild(total);


    /* Ajout de la div dans le DOM */
    document.getElementById("containerCart").appendChild(containerProductCart)
};

/***** Fonction qui crée une balise image *****/
function createimg(productsInCart) {
    const imageFigure = document.createElement("figure");
	const image = document.createElement("img");
	image.setAttribute("src", productsInCart.imageUrl);
	imageFigure.appendChild(image);

	return image;
};

/***** Fonction qui crée une balise p pour le nom du produit *****/
function createName(productsInCart) {
    const name = document.createElement("p");
    name.classList.add("nameProductInCart");
    name.innerText = productsInCart.name;

    return name;
};

/***** Fonction qui crée une balise p pour le prix *****/
function createPrice(productsInCart) {
    const price = document.createElement("p");
    price.classList.add("priceProductInCart");
    price.innerText = (productsInCart.price/ 100).toFixed(2) + "€";

    return price;
};

/***** Fonction qui crée une balise p pour la couleur selectionnée *****/
function createColorSelected(productsInCart) {
    const colorSelected = document.createElement("p");
    colorSelected.classList.add("colorSelected");
    colorSelected.innerText = productsInCart.selectedColor;

    return colorSelected;
}

/***** Fonction qui crée une balise p pour afficher le total a payer *****/
function createPforTotal() {
    const total = document.createElement('p');
    total.classList.add('totalOrder');
    
    return total;
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

/**************************** Le montant total du panier ****************************/

let total = [];

/***** Boucle qui va chercher tout les prix dans le panier ******/

if (total ===! null) {
    for (let i = 0; i < productsInCart.length; i++) {
        total.push(productsInCart[i].price);
    }
}



/***** Calcul tu prix total *****/

let totalPrice;
if (totalPrice ===! null) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPrice = (total.reduce(reducer) /100 .toFixed(2));
    const divTotal = document.querySelector('.totalOrder');
    divTotal.textContent = "prix total : " + totalPrice + "€";
}
/***** Affichage du prix total sur le DOM *****/


/********************************* Le formulaire ********************************* /

/***** Les REGEX *****/

let nameValidation = /^[a-zA-ZéèîïÉÈÎÏÜÛ][a-zéèêàçîï]+([' -][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;
let telValidation = /^\d{10}$/;
let postalValidation = /^\d{5}$/;

/***** Pointage des éléments du formulaire sur le DOM *****/
let firstName = document.getElementById('firstName');
let firstNameMissing = document.getElementById('firstNameMissing');
let nameUser = document.getElementById('name');
let nameMissing = document.getElementById('nameMissing');
let tel = document.getElementById('tel');
let telMissing = document.getElementById("telMissing");
let mail = document.getElementById('mail');
let mailMissing = document.getElementById('mailMissing');
let postal = document.getElementById('postal');
let postalMissing = document.getElementById('postalMissing');

/***** Events *****/

let validateOrderBtn = document.getElementById('validateOrderBtn');

if (productsInCart ===! null) {
    validateOrderBtn.addEventListener("click",(e) => {
        e.preventDefault();
        firstNameIsValid(e);
        nameIsValid(e);
        telIsValid(e);
        mailIsValid(e);
        postalIsValid(e);
    })
}


/********** Les fonctions du formulaire **********/

/***** Fonction qui vérifie si le champ prénom est remplie et respect les REGEX *****/
function firstNameIsValid() {
    if(firstName.validity.valueMissing) {
      
        firstNameMissing.textContent = "Veuillez renseignez un prénom";
        firstNameMissing.style.color = "red";
    }else if (nameValidation.test(firstName.value) == false){
   
        firstNameMissing.textContent="Format incorrect";
        firstNameMissing.style.color ="red";
    }else {

    }
}

/***** Fonction qui vérifie si le champ Nom est remplie et respect les REGEX *****/
function nameIsValid() {
    if(nameUser.validity.valueMissing) {
       
        nameMissing.textContent = "Veuillez renseignez un nom";
        nameMissing.style.color = "red";
    }else if (nameValidation.test(nameUser.value) == false){
    
        nameMissing.textContent="Format incorrect";
        nameMissing.style.color ="red";
    }else {

    }
}

/***** Fonction qui vérifie si le champ tel est remplie et respect les REGEX *****/
function telIsValid() {
    if(tel.validity.valueMissing) {
        telMissing.textContent = "Veuillez renseignez un numéro";
        telMissing.style.color = "red";
    }else if (telValidation.test(tel.value) == false){
        telMissing.textContent="Format incorrect";
        telMissing.style.color ="red";
    }else {

    }
}

/***** Fonction qui vérifie si le champ email est rempli et respect les REGEX *****/
function mailIsValid() {
    if(mail.validity.valueMissing) {
        mailMissing.textContent = "Veuillez renseignez une adresse mail";
        mailMissing.style.color = "red";
    }else if (mailValidation.test(mail.value) == false){
        mailMissing.textContent="Format incorrect";
        mailMissing.style.color ="red";
    }else {

    }
}

/***** Fonction qui vérifie si le champ code postal est rempli et respect les REGEX *****/
function postalIsValid() {
    if(postal.validity.valueMissing) {
        postalMissing.textContent = "Veuillez renseignez un code postal";
        postalMissing.style.color = "red";
    }else if (postalValidation.test(postal.value) == false){
        postalMissing.textContent="Format incorrect";
        postalMissing.style.color ="red";
    }else {

    }
}

