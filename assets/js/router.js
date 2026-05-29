/**
 * Router SPA
 */

import { renderHome } from './pages/home.js';
import { renderContacts } from './pages/contacts.js';
import { renderAbout } from './pages/about.js';
import { renderLocations } from './pages/locations.js';
import { renderCharacters } from './pages/characters.js';

/**
 * Rutas disponibles
 */
const routes = {
    '/': renderHome,
    '/contacts': renderContacts,
    '/about': renderAbout,
    '/location': renderLocations,
    '/characters': renderCharacters
};

/**
 * Router principal
 */
export async function router() {
    const path = window.location.pathname;
    // convierte a numero el valor del query param "page" (query param es un valor que va despues del "?" en la url, por ejemplo: "?page=2")
    const page = Number(new URLSearchParams(window.location.search).get('page'));

    // obtiene la función de renderizado para la ruta actual
    const render = routes[path];

    if (render) {
        await render(page);
        return;
    }

    document.getElementById('content').innerHTML = `
        <section>
            <h2>404 - Página no encontrada</h2>
        </section>
    `;
}