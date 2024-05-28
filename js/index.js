import { generateAuthParams, addToFavorites } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        if (query.length < 3) {
            resultsContainer.innerHTML = ''; // Clear results if query is too short
            return;
        }

        const authParams = generateAuthParams();

        try {
            // console.log("Ts: "+authParams.ts);
            // console.log("Hash: "+authParams.hash);
            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            displayResults(data.data.results);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    function displayResults(characters) {
        resultsContainer.innerHTML = '';
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('col-md-4');
            characterCard.innerHTML = `
                <div class="card mb-4">
                    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <button class="btn btn-primary add-to-favorites" data-id="${character.id}">Add to Favorites</button>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(characterCard);
        });

        document.querySelectorAll('.add-to-favorites').forEach(button => {
            button.addEventListener('click', (e) => {
                const characterId = e.target.getAttribute('data-id');
                addToFavorites(characterId);
            });
        });
    }
});
