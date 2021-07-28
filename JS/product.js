const productpage = document.getElementById("productpage");
const urlParams = new URLSearchParams(window.location.search);
const teddy_id = urlParams.get('id');
const quantityInCart = document.getElementById("NumberArticles");

fetch('http://localhost:3000/api/teddies/' + teddy_id)
    .then(function (product) {
        if (product.ok) {
            return product.json();;
        }
    })
    .then(function (product) {

        /* Fonction qui affiche le nombre d'article dans le panier */
        displayQuantityInCart();

        localStorage.setItem('currentProduct', JSON.stringify(product));
        console.log(product);

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
                    <p id="hidden">
                    
                    </p>
                    <button id="addToCartButton">
                        Ajouter au panier
                    </button>
    </div>
    `
        /* Ajout d'une option dans le tableau couleurs */
        let choice = "Choisissez une couleur";
        product.colorBaseChoice = choice;

        /* Fonction qui crée une option "choisissez une couleur et la séléctionne" */
        function addBaseChoice() {
            let baseChoice = document.createElement("option");
            baseChoice.setAttribute("selected", "selected");
            baseChoice.textContent = choice;

            document.getElementById('colorsChoices').appendChild(baseChoice);
            return baseChoice;
        }

        /* Ajout de l'option "Choisissez une couleur " */
        addBaseChoice();

        /* Ajout des couleurs */
        product.colors.forEach(option => {
            newchoice = addOptionToSelect(option);
            document.getElementById('colorsChoices').appendChild(newchoice);
        });

        function saveProductInCart(product) {
            // let currentProduct = JSON.parse(localStorage.currentProduct);
            let selectedColor = document.getElementById('colorsChoices').value;
            product.selectedColor = selectedColor;
            /*  
            let result = var1 == var2 ? valueIfTrue : valueIfFalse;

            let result;
            if (localStorage.getItem("cart") === null) {
                result = [];
            } else {
                result = JSON.parse(localStorage.getItem("cart"));
            }
            
            */
            let stringifiedCart = localStorage.getItem("cart");
            let cart = stringifiedCart === null ? [] : JSON.parse(stringifiedCart);
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        const btnAddToCart = document.querySelector('button');

        btnAddToCart.addEventListener("click", () => {
            if (document.getElementById('colorsChoices').value === choice) {
                // compulsorychoiceVisible();
                const compulsorychoice = document.getElementById("hidden");
                compulsorychoice.classList.add("textRed");
                compulsorychoice.innerText = "Veuillez choisir une couleur"
                compulsorychoice.style = "visibility : visible"
            }else {
                const compulsorychoice = document.getElementById("hidden");
                compulsorychoice.classList.add("textGreen");
                compulsorychoice.innerText = "Article ajoué au panier"
                compulsorychoice.style = "visibility : visible";
                saveProductInCart(JSON.parse(localStorage.getItem('currentProduct')));
                addQuantityInCart();
                // compulsorychoiceHidden();
            }
        });
    });

/***** Fonction qui ajoute un dans le logo du panier sur le DOM *****/
function addQuantityInCart() {
    let quantityProductsInCart = JSON.parse(localStorage.getItem("cart")).length;
    quantityInCart.textContent = quantityProductsInCart;
}

// /***** Fonction qui créé qui une nouvelle 'option' et qui l'ajoute  *****/

function addOptionToSelect(opt) {

    const newOption = document.createElement('option');
    newOption.classList.add('colorsOption');

    /* Texte pour afficher l'option dans la liste */

    newOption.textContent = opt;
    return newOption
}

/***** Fonction qui affiche le nombre d'article dans le panier ******/
function displayQuantityInCart() {
    let quantity = JSON.parse(localStorage.getItem('cart'));
	if (quantity === null) {
		NumberArticles.innerText = 0;
	}else {
		NumberArticles.innerText = quantity.length;
	}
};