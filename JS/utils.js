/**
 * fonction qui renvoie le panier
 * 
 */
function getCart() {
    let stringifiedCart = localStorage.getItem("cart");
    return stringifiedCart === null ? [] : JSON.parse(stringifiedCart);
}

/***** Fonction qui affiche le nombre d'article dans le panier ******/
function displayQuantityInCart() {
    const quantityInCart = document.getElementById("NumberArticles");
    let cart = getCart();
    quantityInCart.innerText = cart.length;
};