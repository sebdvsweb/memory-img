// Création du tableau contenant les liens vers les images
const images = [
    'https://source.unsplash.com/random/600x600?fire',
    'https://source.unsplash.com/random/600x600?water',
    'https://source.unsplash.com/random/600x600?winter',
    'https://source.unsplash.com/random/600x600?dog',
    'https://source.unsplash.com/random/600x600?food',
    'https://source.unsplash.com/random/600x600?forest',
    'https://source.unsplash.com/random/600x600?summer',
    'https://source.unsplash.com/random/600x600?cat',
    'https://source.unsplash.com/random/600x600?autumn',
    'https://source.unsplash.com/random/600x600?drink'
];

// Doubler chaque lien pour créer des paires d'images
const cards = images.concat(images);

// Mélanger aléatoirement les cartes
cards.sort(() => Math.random() - 0.5);

// Référence au plateau de jeu
const gameBoard = document.getElementById('gameBoard');

// Référence à la div du message de succès
const successText = document.getElementById('successText');

// Référence au compteur de paires assorties
let matchCountElement = document.getElementById('matchCount');

// Variable pour suivre les cartes retournées
let flippedCards = [];

// Variable pour suivre les cartes assorties
let matchedCards = [];

// Variable pour suivre le nombre de paires
let matchCount = 0;

// Fonction pour créer les éléments des cartes
function createCard(imageUrl, index) {
    // Création d'un nouvel élément div pour représenter la carte
    const card = document.createElement('div');
    // Ajout de la classe 'card' à l'élément div pour styliser la carte
    card.classList.add('card');
    // Définition de l'attribut de données 'index' pour garder une trace de l'index de la carte
    card.dataset.index = index;
    // Création d'une balise img pour afficher l'image de la carte
    const image = document.createElement('img');
    // Définition de l'attribut src de l'image avec l'URL de l'image
    image.src = imageUrl;
    // Ajout de l'image en tant qu'enfant de la carte
    card.appendChild(image);
    // Ajout d'un écouteur d'événements pour gérer le clic sur la carte
    card.addEventListener('click', () => flipCard(card));
    // Ajout de la carte en tant qu'enfant du plateau de jeu (élément avec l'ID 'gameBoard')
    gameBoard.appendChild(card);
}

// Fonction pour retourner une carte
function flipCard(card) {
    // Vérifie si la carte n'est pas déjà retournée et n'est pas déjà assortie
    if (!flippedCards.includes(card) && !matchedCards.includes(card) && flippedCards.length < 2) {
        // Ajoute la classe 'flipped' pour indiquer que la carte est retournée
        card.classList.add('flipped');
        // Ajoute la carte à la liste des cartes retournées
        flippedCards.push(card);

        // Vérifie s'il y a deux cartes retournées
        if (flippedCards.length === 2) {
            // Désactive temporairement les clics sur les autres cartes
            gameBoard.style.pointerEvents = 'none';
            // Si deux cartes sont retournées, vérifie si elles correspondent après un délai
            setTimeout(checkMatch, 1500);
        }
    }
}

// Fonction pour vérifier si les cartes retournées correspondent
function checkMatch() {
    // Destructuration pour obtenir les deux cartes retournées
    const [card1, card2] = flippedCards;
    // Récupère l'URL de l'image de la première carte
    const imageSrc1 = card1.querySelector('img').src;
    // Récupère l'URL de l'image de la deuxième carte
    const imageSrc2 = card2.querySelector('img').src;
    // Vérifie si les URL des images correspondent
    if (imageSrc1 === imageSrc2) {
        // Si les URL des images correspondent, ajoute les cartes assorties à la liste des cartes assorties
        matchedCards.push(card1, card2);
        // Incrémente le compteur de paires assorties
        matchCount++;
        // Met à jour le contenu du compteur de paires assorties
        matchCountElement.textContent = matchCount;
        // Affiche le message de succès
        successText.style.display = 'block';
        // Masque le message de succès après un délai
        setTimeout(() => {
            successText.style.display = 'none';
        }, 2000);
        // Vérifie si toutes les cartes ont été assorties
        if (matchedCards.length === cards.length) {
            // Si toutes les cartes ont été assorties, affiche une alerte de félicitations
            alert('Félicitations ! Tu as gagné !');
        }
    } else {
        // Si les URL des images ne correspondent pas, masque les images en retirant la classe 'flipped'
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
        });
    }
    // Réinitialise la liste des cartes retournées
    flippedCards = [];
    // Réactive les clics sur les cartes après la vérification des paires
    gameBoard.style.pointerEvents = 'auto';
}

// Créer les cartes sur le plateau de jeu
cards.forEach(createCard); 