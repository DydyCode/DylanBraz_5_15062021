
const containerTeddies = document.getElementById("teddiesGeneralContainer")
// console.log(containerTeddies);

const fetchTeddies = async () => {
	await fetch("http://localhost:3000/api/teddies")
	.then((res) => res.json())
	.then ((data) => (teddies = data));

	console.log(teddies);

}

const DisplayTeddies = async () => {
	await fetchTeddies();

	containerTeddies.innerHTML = teddies.map(
		(teddy) => 
		`
		<div class="productContainer">
			<a href="product.html?id=${teddy._id}">
				<img src="${teddy.imageUrl}">
					<h3>
						${teddy.name}
					</h3>
						<p>
							${(teddy.price /100).toFixed(2)}€
						</p>
			</a>
		</div>
		`
	)
	.join("");
};
DisplayTeddies();




