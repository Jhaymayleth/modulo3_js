import { renderLocations } from '../pages/locations.js';
import { renderCharacters } from '../pages/characters.js';

/**
 * Servicio API Rick and Morty
 */

import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */
export async function getCharacters(page = 1) {
    try {
        const response = await httpClient.get(`/character?page=${page}`);
        return [response.data.results, response.data.info.pages];

    } catch (error) {
        console.error(error);
        return [ [], 1 ];
    }
}

/**
 * Obtiene ubicaciones
 *
 * @returns {Promise<Array>}
 */
export async function getLocations(page = 1) {
    try {
        const response = await httpClient.get(`/location?page=${page}`);
        return [response.data.results, response.data.info.pages];

    } catch (error) {
        console.error(error);
        return [ [], 1 ];
    }
}

// Función para cargar datos de personajes o locaciones dependiendo del view, y manejar la paginación
export async function loadPage(view ,page = 1, container) {
    let currentPageAPI;
    let info;

    const views = {
        characters: [renderCharacters, getCharacters],
        locations: [renderLocations, getLocations]
    }

    const items = await views[view][1](page);
    info = items[0];
    let lastPage = items[1];

    if (page) {
        container.innerHTML = "";
        currentPageAPI = page;
    } else {
        currentPageAPI = 1;
    }
    
    // Agrega eventos a los botones de paginacion para cambiar la pagina actual y renderizar la pagina correspondiente
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');
    
    nextButton.addEventListener('click', () => {    
        if (currentPageAPI < lastPage) {
            currentPageAPI++;
            history.pushState(null, null, `?page=${currentPageAPI}`);
            views[view][0](currentPageAPI);
        } else {
            history.pushState(null, null, `?page=${currentPageAPI}`);
        }
    });
    
    previousButton.addEventListener('click', () => {
        if (currentPageAPI > 1 ) {
            currentPageAPI--;
            history.pushState(null, null, `?page=${currentPageAPI}`);
            views[view][0](currentPageAPI);
        } else {
            history.pushState(null, null, `?page=${currentPageAPI}`);
        }
    });
    return info;
}