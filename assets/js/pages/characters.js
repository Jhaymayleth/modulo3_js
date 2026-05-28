import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { getLocations } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

let currentPageAPI = 1;

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

    // Verifica si la funcion es llamada con un numero de pagina, si es asi, llama a la funcion getCharactersByPage, 
    // sino, llama a la funcion getCharacters
    const characters = await loadPage('characters', page, container);

    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
}

async function loadPage(view ,page = 1, container) {

    const views = {
        characters: getCharacters,
        locations: getLocations,
    };

    let info;
    if (page) {
        info = await views[view](page);
        container.innerHTML = "";
    } else {
        info = await views[view](1);
    }
    // Agrega eventos a los botones de paginacion para cambiar la pagina actual y renderizar la pagina correspondiente
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');
    
    nextButton.addEventListener('click', () => {    
        currentPageAPI++;
        history.pushState(null, null, `?page=${currentPageAPI}`);
        renderCharacters(currentPageAPI);
    });
    
    previousButton.addEventListener('click', () => {
        if (currentPageAPI > 1) {
            currentPageAPI--;
            history.pushState(null, null, `?page=${currentPageAPI}`);
            renderCharacters(currentPageAPI);
        } else {
            history.pushState(null, null, `?page=${currentPageAPI}`);
        }
    });
    return info;
}