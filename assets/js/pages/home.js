import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

let currentPageAPI = 1;

/**
 * Renderiza Home
 */
export async function renderHome(page = 1) {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const container = document.getElementById(
        'characters-container'
    );

    // Verifica si la funcion es llamada con un numero de pagina, si es asi, llama a la funcion getCharactersByPage, 
    // sino, llama a la funcion getCharacters
    let characters;
    if (page) {
        characters = await getCharacters(page);
        container.innerHTML = "";   
    } else {
        characters = await getCharacters(1);
    }

    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
    loadPage();
}

function loadPage() {
    // Agrega eventos a los botones de paginacion para cambiar la pagina actual y renderizar la pagina correspondiente
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');
    
    nextButton.addEventListener('click', () => {    
        currentPageAPI++;
        history.pushState(null, null, `?page=${currentPageAPI}`);
        renderHome(currentPageAPI);
    });
    
    previousButton.addEventListener('click', () => {
        if (currentPageAPI > 1) {
            currentPageAPI--;
            history.pushState(null, null, `?page=${currentPageAPI}`);
            renderHome(currentPageAPI);
        } else {
            history.pushState(null, null, `?page=${currentPageAPI}`);
        }
    });
}