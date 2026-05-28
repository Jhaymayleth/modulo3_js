import { loadHTML } from '../utils/helpers.js';
import { loadPage } from '../utils/helpers.js';
import { characterCard } from '../components/characterCard.js';

/**
 * Renderiza personajes
 */
export async function renderCharacters(page = 1) {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/characters.html'
    );
    const container = document.getElementById(
        'characters-container'
    );

    // Carga los personajes de la pagina actual y los renderiza en el contenedor
    const characters = await loadPage('characters', page, container);

    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
}