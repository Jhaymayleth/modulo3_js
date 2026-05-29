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
        // obtiene datos de los personajes y el total de páginas
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
        // obtiene datos de las locaciones y el total de páginas
        const response = await httpClient.get(`/location?page=${page}`);
        return [response.data.results, response.data.info.pages];

    } catch (error) {
        console.error(error);
        return [ [], 1 ];
    }
}

/**
 * Obtiene episodios
 *
 * @returns {Promise<Array>}
 */
export async function getEpisodes(page = 1) {
    try {
        // obtiene datos de los episodios y el total de páginas
        const response = await httpClient.get(`/episode?page=${page}`);
        console.log(response.data);
        return [response.data.results, response.data.info.pages];

    } catch (error) {
        console.error(error);
        return [ [], 1 ];
    }
}

// Función para cargar datos de personajes o locaciones dependiendo del view, y manejar la paginación
export async function loadPage(view, page = 1, container) {
    const views = {
        characters: getCharacters,
        locations: getLocations,
        episodes: getEpisodes
    };

    const fetchPage = views[view];

    if (!fetchPage) {
        console.error(`View "${view}" not found.`);
        return;
    }

    const currentPage = Number(page) || 1;
    const [items, lastPage] = await fetchPage(currentPage);

    container.innerHTML = '';

    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');

    const routeMap = {
        characters: '/characters',
        locations: '/location',
        episodes: '/episodes'
    };

    function goToPage(newPage) {
        const route = routeMap[view] || `/${view}`;
        history.pushState(null, '', `${route}?page=${newPage}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    nextButton.addEventListener('click', () => {
        if (currentPage < lastPage) {
            goToPage(currentPage + 1);
        }
    });

    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });

    return items;
}