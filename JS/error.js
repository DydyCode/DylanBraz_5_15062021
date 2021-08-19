/***** Fonction qui crée les éléments de texte ******/
function displayText() {
    const divError = document.createElement('div');
    divError.setAttribute('id', 'containerText');
    const title = document.createElement('h1');
    title.textContent = "Oups !";
    const text = document.createElement('h2');
    text.textContent = "La page que vous recherchez semble introuvable."

    const container = document.getElementById('homepage');

    container.appendChild(divError);
    divError.appendChild(title);
    divError.appendChild(text);
   
    return divError;
}
/***** Fonction qui crée un button *****/
function displayBtn() {
    const divBtn = document.createElement('div');
    divBtn.setAttribute('id', 'containerBtn');
    const btnToBack = document.createElement('button');
    btnToBack.setAttribute('id', 'btnToBack');
    btnToBack.textContent = "Retourner à la page d'accueil";

    const container = document.getElementById('homepage');
    container.appendChild(divBtn);
    divBtn.appendChild(btnToBack);

    return divBtn;
}
/***** Fonction qui crée un texte d'arrière plan *****/
function displayBackground() {
    const containerBackground = document.createElement('div');
    containerBackground.setAttribute('id', 'containerBackground');
    const text = document.createElement('h3');
    text.textContent = "Erreur";

    containerBackground.appendChild(text);
    document.getElementById('homepage').appendChild(containerBackground);

    return containerBackground;
}

/***** Appel des fonctions *****/
displayText();
displayBtn();
displayBackground();

/***** EventListenner sur le boutton *****/
document.getElementById('btnToBack').addEventListener('click', () => {
    window.location.href="index.html" ; 
})
