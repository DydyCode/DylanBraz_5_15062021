/***** Pointage des éléments sur le DOM *****/
const productpage = document.getElementById("productpage");

/***** Récupère l'id du produit dans l'url *****/
const urlParams = new URLSearchParams(window.location.search);
const teddy_id = urlParams.get('id');

/***** Appel de l'api *****/
fetch('http://localhost:3000/api/teddies/' + teddy_id)
    .then((product) => {
        if (product.ok) {
            return product.json();
        }
    })
    /* Redirection vers la page d'érreur */
    .catch(() => {
        window.location.href = "error.html";
    })
    .then((product) => {

        /* Appel de la fonction qui affiche et met à jour le nombre d'article dans le panier */
        displayQuantityInCart();

        /* Ajout du produit dans le localStorage */
        localStorage.setItem('currentProduct', JSON.stringify(product));

        productpage.innerHTML =
            `
                <img class="imageProduct" src="${product.imageUrl}" width="700">
                <div class="product">
                    <h2>
                        ${product.name}
                    </h2>
                        <p>
                            ${(product.price / 100).toFixed(2)}€
                        </p>
                        <p class="descriptionProduct">
                            ${product.description}
                        </p>
                    <form>
                        <select id="colorsChoices">
                        </select action="cart.html">
                    </form>
                        <p id="choiceMessage"></p>
                        <button id="addToCartButton">
                            Ajouter au panier
                        </button>
                </div>
            `

        /* Appel de la fonction qui crée une option "choisissez une couleur et la séléctionne" */
        addBaseChoice();

        /* Ajout des couleurs dans le select */
        product.colors.forEach(option => {
            newchoice = addOptionToSelect(option);
            document.getElementById('colorsChoices').appendChild(newchoice);
        });

        /* Pointage du bouton ajouter au panier sur le DOM */
        const btnAddToCart = document.querySelector('button');

        /* event sur le bouton ajouter au panier */
        btnAddToCart.addEventListener("click", () => {
            if (document.getElementById('colorsChoices').value === "") {
                const choiceRequired = document.getElementById("choiceMessage");
                choiceRequired.classList.add("textRed");
                choiceRequired.classList.remove("textGreen");
                choiceRequired.innerText = "Veuillez choisir une couleur"
                choiceRequired.style = "visibility : visible"
            } else {
                const choiceRequired = document.getElementById("choiceMessage");
                choiceRequired.classList.add("textGreen");
                choiceRequired.classList.remove("textRed");
                choiceRequired.innerText = "Article ajoué au panier"
                choiceRequired.style = "visibility : visible";
                saveProductInCart(JSON.parse(localStorage.getItem('currentProduct')));
                /* Appel de la fonction qui affiche et met à jour le nombre d'article dans le panier */
                displayQuantityInCart();
            }
        });
    });

/***** Fonction qui créé qui une nouvelle 'option' et qui l'ajoute  *****/

function addOptionToSelect(opt) {

    const newOption = document.createElement('option');
    newOption.classList.add('colorsOption');

    /* Texte pour afficher l'option dans la liste */

    newOption.textContent = opt;
    return newOption
}
/***** Fonction qui sauvegarde un produit dans le localStorage ******/
function saveProductInCart(product) {
    let selectedColor = document.getElementById('colorsChoices').value;
    product.selectedColor = selectedColor;

    /* Ternaire qui test si le panier est null */
    let cart = getCart();
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}
/* Fonction qui crée une option "choisissez une couleur et la séléctionne" */
function addBaseChoice() {
    let baseChoice = document.createElement("option");
    baseChoice.setAttribute("selected", "selected");
    baseChoice.setAttribute("id", "baseChoice");
    baseChoice.value = "";
    baseChoice.textContent = "Choissisez une couleur";

    document.getElementById('colorsChoices').appendChild(baseChoice);
    return baseChoice;
}