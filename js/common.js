import CryptoJS from 'crypto-js';

function generateAuthParams() {
    const ts = new Date().getTime();
    const publicKey = '5a61249b0d84b0e8eb13c87561aec5d2';
    const privateKey = 'db6104c25ff661edef48210518b63a53670acf26';
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    return {
        ts: ts,
        apikey: publicKey,
        hash: hash
    };
}

function addToFavorites(characterId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(characterId)) {
        favorites.push(characterId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites!');
    }
}

function removeFromFavorites(characterId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== characterId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Removed from favorites!');
    location.reload();
}

export { generateAuthParams, addToFavorites, removeFromFavorites };
