import { generateAuthParams, addToFavorites } from './common.js';

let allCharacters = [];

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');

    const authParams = generateAuthParams();

    try {
        // console.log("Ts: "+authParams.ts);
        // console.log("Hash: "+authParams.hash);
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        allCharacters = data.data.results;
        displayResults(allCharacters);
    } catch (error) {
        console.error('Fetch error:', error);
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.length < 3) {
            resultsContainer.innerHTML = ''; // Clear results if query is too short
            return;
        }

        const filteredCharacters = allCharacters.filter(character => 
            character.name.toLowerCase().includes(query)
        );
        displayResults(filteredCharacters);
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
