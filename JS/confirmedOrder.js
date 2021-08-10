/***** Récupère l'id de la commande dans l'url *****/
const urlParams = new URLSearchParams(window.location.search);
const order_id = urlParams.get('orderId');

/***** Stockage des produits commandé dans une variable ******/
let products = JSON.parse(localStorage.getItem('cart'));

/****** Stockage des info sur le client dans une variable ******/
let info = JSON.parse(localStorage.getItem("info"));

/* variable vide pour stocker tout les prix dans le localStorage */
let allPrice = [];

/* Boucle qui va cherchez les prix dans le LocalStorage et les stock dans la variable */
for (let i = 0; i < products.length; i++) {
    let price = products[i].price;
    allPrice.push(price);
}

/* Méthode reduce() pour additionner tout les prix */
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let totalOrder = (allPrice.reduce(reducer) / 100).toFixed(2);

/* Appel des fonctions pour l'affichage */
createTitle();
createThanks();
createTemplate();
displayTotalOrder();

/* Boucle qui crée une balise img et deux balises p, par produits acheté */
for (let i =0; i < products.length; i++) {
    createImageOfProduct(products[i]);
    createNameOfProduct(products[i]);
    createPriceOfProduct(products[i]);
}

/* Fonction qui crée une balise h1 */
    function createTitle() {
    const title = document.createElement('h1');
    title.setAttribute("id", "titleConfirmedOrder");
    title.textContent = "Votre commande a été validé !";
    document.getElementById('containerConfirmedOrder').appendChild(title);

    return title;
}

/* Fonction qui crée un h2 et un p */
function createThanks() {
    const thanks = document.createElement("h2");
    thanks.setAttribute('id', "tanks");
    thanks.innerText = `Bonjour ${info.contact.firstName}, merci pour votre achat.`
    document.getElementById('containerConfirmedOrder').appendChild(thanks);

    const orderId = document.createElement('p');
    orderId.setAttribute('id', 'numberOrder');
    orderId.textContent = "Numéro de commande: " + info.orderId;
    document.getElementById('containerConfirmedOrder').appendChild(orderId);

    return thanks;
}

/* Fonction qui crée une div en display grid */
function createTemplate() {
    const grid = document.createElement('div');
    grid.setAttribute('id', 'grid');
    grid.classList.add('displayGrid');

    document.getElementById('containerConfirmedOrder').appendChild(grid);

    return grid;
}

/* Fonction qui crée une balise img pour l'image du produit*/
function createImageOfProduct(products) {

    const image = document.createElement('img');
    image.classList.add('child','imageOfProduct');
    image.setAttribute("src", products.imageUrl);

    document.getElementById('grid').appendChild(image);   

    return image
}

/*Fonction qui crée un balise p, pour le nom du produit*/
function createNameOfProduct(products) {
    const name = document.createElement('p');
    name.classList.add('nameOfProduct');
    name.textContent = products.name;

    document.getElementById('grid').appendChild(name);

    return name
}

/* Fonction qui crée une balise p, pour le prix du produit */
function createPriceOfProduct(products) {
    const price = document.createElement('p');
    price.classList.add('priceOfProduct');
    price.textContent = (products.price/ 100).toFixed(2) + "€";

    document.getElementById('grid').appendChild(price);

    return price
}

/* Fonction qui crée une ligne dans le tableau pour afficher le prix total de la commande */
function displayTotalOrder() {
    /* création d'une div en display grid */
    const containerTotalPrice = document.createElement('div');
    containerTotalPrice.classList.add('displayGrid');
    containerTotalPrice.setAttribute('id', 'containerTotalPrice');
    document.getElementById('containerConfirmedOrder').appendChild(containerTotalPrice);

    /* création d'une balise p qui  reste vide */
    const pEmpty = document.createElement('p');
    pEmpty.setAttribute('id', 'pEmpty');
    containerTotalPrice.appendChild(pEmpty);

    /* création d'une balise p qui contient "total" */
    const titleTotalPrice = document.createElement('p');
    titleTotalPrice.classList.add('bold');
    titleTotalPrice.textContent = "Total";
    containerTotalPrice.appendChild(titleTotalPrice);

    /* création d'une balise p qui contient le prix total de la commande */
    const totalPrice = document.createElement('p');
    totalPrice.classList.add('bold');
    totalPrice.setAttribute('id', 'totalPrice');
    containerTotalPrice.appendChild(totalPrice);
    totalPrice.textContent = totalOrder+"€";

    return containerTotalPrice;
}

/* Fonction qui attend 5secondes avant de vider le localStorage */
function waitToExecute()
{
 setTimeout(clearLocalStorage, 5000); 
}
function clearLocalStorage()
{
    localStorage.clear();
}
waitToExecute();