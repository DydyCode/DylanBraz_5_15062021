// 	/* Ajout du produit dans le local Storage */ 
// 	const addToCart = document.getElementById('addToCartButton');

// 	addToCart.addEventListener('click', () => {
// 		localStorage.setItem('cart', []);
// 		if (localStorage.cart == 0) {
// 			let cart = [];
// 			cart = localStorage.teddy;
// 			localStorage.setItem('cart', JSON.stringify(cart));
// 			localStorage.cart = localStorage.teddy;

// 		} else {


// 		}

// 		//Rafraichir le nb d'article dans le panier (regarde la methode .length des array ;))
// 	});
// })
// .catch (function(err) {
// 	console.log(err);
// });



const productpage = document.getElementById("productpage");
const urlParams = new URLSearchParams(window.location.search);
const teddy_id = urlParams.get('id');

// console.log(teddy_id);

fetch('http://localhost:3000/api/teddies/' + teddy_id)
    .then(function (product) {
        if (product.ok) {
            return product.json();
        }


    })
    .then(function (product) {

        console.log(product);
        productpage.innerHTML =
            `
    <img class="imageProduct" src="${product.imageUrl}" width="900">
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

        function passColor() {
            let selectColors = document.getElementById('colorsChoices').value;
            localStorage.setItem("ColorSelected", selectColors);
        
            return true;
        }

        function passName() {
            let nameTeddy = JSON.stringify(product.name);
            localStorage.setItem("Name", nameTeddy);
        
        }
        function passPrice() {
            let priceTeddy = JSON.stringify((product.price / 100).toFixed(2));
            localStorage.setItem("Price", priceTeddy);
        
        }
        function passImg() {
            let imgTeddy = JSON.stringify(product.imageUrl);
            localStorage.setItem("imgTeddy", imgTeddy);
        
        }
        const btn = document.querySelector('button');

        btn.addEventListener("click", () => {
            passColor();
            passName();
            passPrice();
            passImg();
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



