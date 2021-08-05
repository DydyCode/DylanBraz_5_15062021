/***** Fonction qui renvoie le panier *****/
function getCart() {
    let stringifiedCart = localStorage.getItem("cart");
    /* Ternaire qui test si le localStorage est vide */
    return stringifiedCart === null ? [] : JSON.parse(stringifiedCart);
}

/***** Fonction qui met à jour l'affichage du panier ******/
function displayQuantityInCart() {
    const quantityInCart = document.getElementById("NumberArticles");
    let cart = getCart();
    quantityInCart.innerText = cart.length;
};