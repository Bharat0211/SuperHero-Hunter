import { generateAuthParams, removeFromFavorites } from './common.js';

document.addEventListener('DOMContentLoaded', async () => {
    const favoritesContainer = document.getElementById('favorites');
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

    const authParams = generateAuthParams();

    for (const id of favoriteIds) {
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}`);
        const data = await response.json();
        displayFavorite(data.data.results[0]);
    }

    function displayFavorite(character) {
        const favoriteCard = document.createElement('div');
        favoriteCard.classList.add('col-md-4');
        favoriteCard.innerHTML = `
            <div class="card mb-4">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <button class="btn btn-danger remove-from-favorites" data-id="${character.id}">Remove from Favorites</button>
                </div>
            </div>
        `;
        favoritesContainer.appendChild(favoriteCard);
    }

    // Attach event listeners to the dynamically created buttons
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('remove-from-favorites')) {
            const characterId = e.target.getAttribute('data-id');
            removeFromFavorites(characterId);
        }
    });
});
