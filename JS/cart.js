
/***** Pointage des éléments sur le DOM *****/
const container = document.getElementById("containerCart");
const containerForm = document.getElementById("containerForm");
const clearCartBtn = document.getElementById("clearCartBtn");

/* Récupération des produits dans le local storage */
let productsInCart = JSON.parse(localStorage.getItem("cart"));

/***** Test si le panier est vide *****/
if (productsInCart === null) {
    container.innerHTML = `
    <div id="containerCartEmpty">
        <h2>
            Votre panier est vide.
        </h2>
    </div>
    `
    clearCartBtn.style = "display: none"
} else {
    /***** Si le panier n'est pas vide *****/
    for (let i = 0; i < productsInCart.length; i++) {
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
        
        <label for="postal" > Entrez votre code postal :</label>
        <input type="postal" name="postal" id="postal" required="required">
        <span id="postalMissing"></span>

        <label for="email" > Entrez votre adresse mail :</label>
        <input type="email" name="mail" id="mail" required="required">
        <span id="mailMissing"></span>

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
    // const deletBtn = createDeleteBtn(productsInCart);

    /* Montage de la div */
    containerProductCart.appendChild(image);
    containerProductCart.appendChild(name);
    containerProductCart.appendChild(price);
    containerProductCart.appendChild(colorSelected);
    // containerProductCart.appendChild(deletBtn);

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
    price.innerText = (productsInCart.price / 100).toFixed(2) + "€";

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
    total.setAttribute("id", "totalOrder");

    return total;
}

const prixtotalapayer = createPforTotal();
container.appendChild(prixtotalapayer);

/***** Fonction qui crée un boutton supprimer *****/
// function createDeleteBtn() {
//     const deleteBtn = document.createElement('button');
//     deleteBtn.classList.add("deleteBtn");
//     deleteBtn.innerText = "Supprimer";

//     return deleteBtn;
// }

/*****  Boutton qui vide le panier *****/
clearCartBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "cart.html";
});

/**************************** Le montant total du panier ****************************/

/* variable vide pour stocker tout les prix dans le localStorage */
let prixOfProducts = [];

/* Boucle qui va cherchez les prix dans le LocalStorage et les stock dans la variable */
for (let i = 0; i < productsInCart.length; i++) {
    let prix = productsInCart[i].price;
    prixOfProducts.push(prix);
}

/* Méthode reduce() pour additionner tout les prix */
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let totalOder = (prixOfProducts.reduce(reducer) / 100).toFixed(2);

/* Affichage du prix total à payer */
const totalDiv = document.getElementById('totalOrder');
totalDiv.innerText = "Total à payer : " + totalOder + "€";

/********************************* Le formulaire ********************************* /

/***** Les REGEX *****/

let nameValidation = /^[a-zA-ZéèîïÉÈÎÏÜÛ][a-zéèêàçîï]+([' -][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;
let telValidation = /^\d{10}$/;
let postalValidation = /^\d{5}$/;
let mailValidation = /^/;

/***** Pointage du buton "valider la commande" sur le DOM *****/
const validateOrderBtn = document.getElementById('validateOrderBtn');

/***** Event sur le bouton "valider la commande" *****/
validateOrderBtn.addEventListener('click',(e) => {
    firstNameIsValid(e);
    nameIsValid(e);
    telIsValid(e);
    postalIsValid(e);
    mailIsValid(e);
} );

/***** Fonction qui test l'input du prénom ******/
function firstNameIsValid(e) {
    /* Pointage des éléments sur le DOM */
    let firstName = document.getElementById('firstName');
    let firstNameMissing = document.getElementById('firstNameMissing');

    /* Test si l'utilisateur a rempli l'input */
    if (firstName.validity.valueMissing) {
        e.preventDefault();
        firstNameMissing.textContent = "Prénom manquant";
        firstNameMissing.style.color = "red";

        /* Test si ce qu'a rempli l'utilisateur respect les REGEX */
    }else if (nameValidation.test(firstName.value) == false) {
        e.preventDefault();
        firstNameMissing.textContent = "Format incorrect";
        firstNameMissing.style.color = "red";
    }
}

/***** Fonction qui test l'input du nom *****/
function nameIsValid(e) {
        /* Pointage des éléments sur le DOM */
    let nameUser = document.getElementById('name');
    let nameMissing = document.getElementById('nameMissing');
    
    /* Test si l'utilisateur a rempli l'input */
    if (nameUser.validity.valueMissing) {
        e.preventDefault();
        nameMissing.textContent = "Nom manquant";
        nameMissing.style.color = "red";

        /* Test si ce qu'a rempli l'utilisateur respect les REGEX */
    }else if (nameValidation.test(nameUser.value) == false) {
        e.preventDefault();
        nameMissing.textContent = "Format incorrect";
        nameMissing.style.color = "red";
    }
}

/***** Fonction qui test l'input du numéro de téléphone *****/
function telIsValid(e) {
         /* Pointage des éléments sur le DOM */
         let tel = document.getElementById('tel');
         let telMissing = document.getElementById('telMissing');
         
         /* Test si l'utilisateur a rempli l'input */
         if (tel.validity.valueMissing) {
             e.preventDefault();
             telMissing.textContent = "Prénom manquant";
             telMissing.style.color = "red";
     
             /* Test si ce qu'a rempli l'utilisateur respect les REGEX */
         }else if (telValidation.test(tel.value) == false) {
             e.preventDefault();
             telMissing.textContent = "Format incorrect";
             telMissing.style.color = "red";
         }
}

/***** Fonction qui test l'input code postal *****/
function postalIsValid(e) {
      /* Pointage des éléments sur le DOM */
    let postal = document.getElementById('postal');
    let postalMissing = document.getElementById('postalMissing');

    /* Test si l'utilisateur a rempli l'input */
    if (postal.validity.valueMissing) {
        e.preventDefault();
        postalMissing.textContent = "Code postal manquant";
        postalMissing.style.color = "red";

        /* Test si ce qu'a rempli l'utilisateur respect les REGEX */
    }else if (postalValidation.test(postal.value) == false) {
        e.preventDefault();
        postalMissing.textContent = "Format incorrect";
        postalMissing.style.color = "red";
    }
}

/***** Fonction qui test l'input adresse mail *****/
function mailIsValid(e) {
    /* Pointage des éléments sur le DOM */
    let mail = document.getElementById('mail');
    let mailMissing = document.getElementById('mailMissing');

      /* Test si l'utilisateur a rempli l'input */
      if (mail.validity.valueMissing) {
        e.preventDefault();
        mailMissing.textContent = "Adresse mail manquante";
        mailMissing.style.color = "red";

        /* Test si ce qu'a rempli l'utilisateur respect les REGEX */
    }else if (mailValidation.test(mail.value) == false) {
        e.preventDefault();
        mailMissing.textContent = "Format incorrect";
        mailMissing.style.color = "red";
    }
}

