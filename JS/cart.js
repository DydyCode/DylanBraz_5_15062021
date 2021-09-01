/********************** Pointage des éléments sur le DOM **********************/
const container = document.getElementById("containerCart");
const containerForm = document.getElementById("containerForm");
const clearCartBtn = document.getElementById("clearCartBtn");


/****************** Récupération des produits dans le local storage ****************/
let productsInCart = getCart();

/***** Test si le panier est vide *****/
if (productsInCart.length === 0) {
    container.innerHTML = `
    <div id="containerCartEmpty">
        <h2>
            Votre panier est vide.
        </h2>
    </div>
    `
    document.getElementById('form').style = "display: none"
    clearCartBtn.style = "display: none"
} else {
    /***** Si le panier n'est pas vide *****/
    for (let i = 0; i < productsInCart.length; i++) {
        createDiv(productsInCart[i]);
    }
}

/***** Fonction qui crée une balise image *****/
function createimg(productsInCart) {
    const imageFigure = document.createElement("figure");
    const image = document.createElement("img");
    image.setAttribute("src", productsInCart.imageUrl);
    image.classList.add('imgProduct');
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

/***** Fonction qui crée la div du produit *****/
function createDiv(productsInCart) {

    /* Création d'une div container des produits */
    const containerProductCart = document.createElement("div");
    containerProductCart.classList.add("containerProductCart");

    /* Appel de la fonction qui crée une balise img */
    const image = createimg(productsInCart);

    /* Appel de la fonction qui crée une balise p pour le nom du produit */
    const name = createName(productsInCart);

    /* Appel de la fonction qui crée un p pour la couleur selectionnée */
    const colorSelected = createColorSelected(productsInCart);

    /* Appel de la fonction qui crée une balise p pour le prix */
    const price = createPrice(productsInCart);

    /* Montage de la div */
    containerProductCart.appendChild(image);
    containerProductCart.appendChild(name);
    containerProductCart.appendChild(colorSelected);
    containerProductCart.appendChild(price);

    /* Ajout de la div dans le DOM */
    document.getElementById("containerCart").appendChild(containerProductCart)
};

/*****  Boutton qui vide le panier *****/
clearCartBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
});

/**************************** Le montant total du panier ****************************/

/* variable vide pour stocker tout les prix dans le localStorage */
let priceOfProducts = [];

/* Boucle qui va cherchez les prix dans le LocalStorage et les stock dans la variable */
for (let i = 0; i < productsInCart.length; i++) {
    let prix = productsInCart[i].price;
    priceOfProducts.push(prix);
}

/* Méthode reduce() pour additionner tout les prix */
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let totalOder = (priceOfProducts.reduce(reducer) / 100).toFixed(2);

/* Affichage du prix total à payer */
const totalDiv = document.getElementById('totalOrder');
totalDiv.innerText = "Total à payer : " + totalOder + "€";

/********************************* Le formulaire ********************************* /

/***** Envoi des données à l'API *****/
function sendData() {
    /***** Récupération des donées du formulaire *****/

    /* Pointage des éléments sur le DOM */
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('adress').value;
    let city = document.getElementById('postal').value;
    let email = document.getElementById('mail').value;

    /* Création de l'objet user qui stock toutes les valeurs des input */
    let user = {
        'firstName': firstName,
        'lastName': lastName,
        'address': address,
        'city': city,
        'email': email
    }

    var listIdInCart = [];
    /* Boucle qui va récupérer tout les id des produits dans le panier */
    for (let i = 0; i < productsInCart.length; i++) {
        let IdInCart = productsInCart[i];
        listIdInCart.push(IdInCart._id);
    }

    /* Fusion des ID de produits et le contact du formulaire en un seul objet */
    var products = listIdInCart;
    var contact = user;
    var data = JSON.stringify({ products, contact });
    // console.log(data);

    /* Envois des donées a l'API */
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(info => {
        localStorage.setItem('info', JSON.stringify(info));
        window.location.href = `confirmedOrder.html?orderId=${info.orderId}`
    })

    .catch(function (err) {
        console.log(err);
    });
}

/***** Les REGEX *****/

   let nameLastNameCityValidation = /^[A-Za-z]{3,20}$/;
   let adressValidation = /^([0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ \s-]{1,50})$/;
   let postalValidation = /^\d{5}$/;
   let mailValidation = /^[a-zA-Z0-9.-_]+[@]{1}[a-z-A-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
   
/***** Fonction qui test le contenu des input *****/
function isTextInputValid(input, regex, message) {
    let inputElement   = document.getElementById(input);
    let messageElement = inputElement.nextElementSibling;
    
     /* Test si l'utilisateur a rempli l'input */
     if (inputElement.value == '') {
            messageElement.innerText =  message + " manquant";
            messageElement.style.color = "red";

            return false;
 
     /* Test si ce qu'a rempli l'utilisateur respect les REGEX */
     } else if (regex.test(inputElement.value) == false) {
            messageElement.innerText = "Format incorrect";
            messageElement.style.color = "red";

            return false;
     } else {
         messageElement.innerText = "";
         return true
     }
}
/***** Fonction qui vérifie le formulaire *****/
function validForm(e) {
    e.preventDefault();

    return isTextInputValid('firstName', nameLastNameCityValidation, "prénom")
        && isTextInputValid('lastName', nameLastNameCityValidation, "Nom")
        && isTextInputValid('adress', adressValidation, "Adresse")
        && isTextInputValid('postal', postalValidation, "Code postal")
        && isTextInputValid('mail', mailValidation, "Adresse mail")
}
/***** Pointage du buton "valider la commande" sur le DOM *****/
const validateOrderBtn = document.getElementById('validateOrderBtn');

/***** Event sur le bouton "valider la commande" *****/
validateOrderBtn.addEventListener('click', (e) => {
        let isValid = validForm(e);

        if (isValid) {
            sendData();
        }
});
