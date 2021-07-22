//-------------------------------------------------
/* Les constantes */
//-------------------------------------------------

const container = document.getElementById('teddiesGeneralContainer');

//--------------------------------------------------
/* Les variables */
//--------------------------------------------------

let allTeddies = [];


//--------------------------------------------------
/* fetch */
//--------------------------------------------------

async function fetchTeddies () {
    await fetch ("http://localhost:3000/api/teddies")
    .then((res) => res.json()) 
    .then ((data) => (allTeddies = data));

    // console.log(allTeddies);
    for (const key in allTeddies) {
    console.log(key + " : " + allTeddies[key]);
    }

}
fetchTeddies ();


//------------------------------------------------
/* Affichage */
//-----------------------------------------------

// function teddiesDisplay () {
//     container.innerHTML = teddies.map (
//       `
//       <div class="productContainer>
//       <img src=${teddies[0].imageUrl}></img>
//       <h2>${teddies.name}</h2>
//       </div>
//       `
//     )
// }

// teddiesDisplay ();