/***** Pointage des éléments sur le DOM *****/
const NumberArticles = document.getElementById("NumberArticles");

/***** Le fetch *****/
fetch('http://localhost:3000/api/teddies') 
.then (res => {
	if (res.ok) {
		return res.json();
	}

	throw Error;
})
.then (arrayAllProducts => {
	/* Appel de la fonction qui met à jour la quantité du panier */
	displayQuantityInCart();

	/* Appel de la fonction qui crée une div produit */
	insertNewProduct(arrayAllProducts);

})
/***** catch qui permet de renvoyer vers la page d'erreur *****/
.catch ( (e) => {
	window.location.href="error.html";
})

/***** Fonction qui "monte" la div *****/

function insertNewProduct(array) {
	array.forEach((teddies) => {
		/* Création de la div Produit */
		const newDivProduct = document.createElement("div");
		newDivProduct.classList.add("containerProduct");

		/* Ajout du lien */
		const link = addLinkToProduct(teddies);

		/* Ajout de l'image */
		const figure = addImageToProduct(teddies);

		/* Ajout de la description */
		const description = addDescriptionToProduct(teddies);

		/* Montage de la div Produit */
		link.appendChild(figure);
		link.appendChild(description);
		newDivProduct.appendChild(link);

		/* Ajout du produit dans le DOM */
		document.getElementById('homepage').appendChild(newDivProduct);
	});
};

/***** Fonction qui ajoute une balise a *****/
function addLinkToProduct(teddies) {
	const link = document.createElement("a");
	link.setAttribute("href", "product.html?id="+teddies._id);

	return link;
}

/***** Fonction qui ajoute l'image *****/
function addImageToProduct(teddies) {
	const imageFigureProduct = document.createElement("figure");
	const image = document.createElement("img");
	image.setAttribute("src", teddies.imageUrl);
	imageFigureProduct.appendChild(image);

	return imageFigureProduct;
}

/****** Fonction qui ajoute la description *****/
function addDescriptionToProduct(teddies) {
	const divDescription = document.createElement("div");
	divDescription.classList.add("description__text");

	const nameTeddies = document.createElement("p");
	const priceTeddies = document.createElement("p");

	/* Récupére le nom et le prix sur l'API */
	nameTeddies.innerText = teddies.name;
	priceTeddies.innerText = (teddies.price/ 100).toFixed(2) + "€";

	/* Ajout du nom et du prix à la div */
	divDescription.appendChild(nameTeddies);
	divDescription.appendChild(priceTeddies);

	return divDescription;
}