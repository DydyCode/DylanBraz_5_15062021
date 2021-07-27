const productpage = document.getElementById("productpage");
const urlParams = new URLSearchParams(window.location.search);
const teddy_id = urlParams.get('id');
const quantityInCart = document.getElementById("NumberArticles");

// /***** Récupération de la taille du tableau de cart dans le local storage *****/
// let getQuantityInCart = JSON.parse(localStorage.getItem("cart"));

// /***** Affichage du nombre de produit dans le panier *****/
// quantityInCart.innerText = getQuantityInCart.length;


fetch('http://localhost:3000/api/teddies/' + teddy_id)
    .then(function (product) {
        if (product.ok) {
            return product.json();;
        }
        console.log(product);
    })
    .then(function (product) {
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
                <p class="description__text">
                    ${product.description}
                </p>
                <form>
                <select id="colorsChoices">
                </select action="cart.html">
                </form>
                    <button id="addToCartButton">
                        Ajouter au panier
                    </button>
    </div>
    `
        /* Ajout des couleurs */
            product.colors.forEach(option => {
            newchoice = addOptionToSelect(option);
            document.getElementById('colorsChoices').appendChild(newchoice);
        });

        function saveProductInCart (product) {
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
            saveProductInCart(JSON.parse(localStorage.getItem('currentProduct')));
        });
    });

// /***** Fonction qui créé qui une nouvelle 'option' et qui l'ajoute  *****/

function addOptionToSelect(opt) {
    const newOption = document.createElement('option');
    newOption.classList.add('colorsOption');

    /* Texte pour afficher l'option dans la liste */
    newOption.textContent = opt;
    return newOption
}



