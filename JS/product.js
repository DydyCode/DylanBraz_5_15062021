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

        productpage.appendChild(createImg(product));
        productpage.appendChild(createDiv(product));

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

/***** Fonction qui crée des balises HTML *****/

function createImg (product) {
    const img = document.createElement('img');
    img.classList.add('imageProduct');
    img.setAttribute("width", "700");
    img.setAttribute('src', product.imageUrl);

    return img
}

function createDiv (product) {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add("imageProduct");
    
    const  nameProduct = document.createElement('h2');
    nameProduct.innerHTML = product.name;

    const priceProduct = document.createElement('p');
    priceProduct.innerHTML = (product.price /100).toFixed(2) + "€";

    const descriptionProduct = document.createElement('p');
    descriptionProduct.classList.add('descriptionProduct');
    descriptionProduct.innerHTML = product.description;

    const form = document.createElement('form');
    const select = document.createElement('select');
    select.setAttribute('id', "colorsChoices");
    select.setAttribute('action', 'cart.html');

    const baseChoice = document.createElement('option');
    baseChoice.setAttribute("selected", "selected");
    baseChoice.setAttribute("id", "baseChoice");
    baseChoice.value = "";
    baseChoice.textContent = "Choissisez une couleur";

    const choiceMessage = document.createElement('p');
    choiceMessage.setAttribute('id', 'choiceMessage');

    const btn = document.createElement('button');
    btn.setAttribute('id', 'addToCartButton');
    btn.innerHTML = "Ajouter au panier";

    containerProduct.appendChild(nameProduct);
    containerProduct.appendChild(priceProduct);
    containerProduct.appendChild(descriptionProduct);
    select.appendChild(baseChoice);
    form.appendChild(select);
    containerProduct.appendChild(form);
    containerProduct.appendChild(choiceMessage);
    containerProduct.appendChild(btn);

    return containerProduct;
}