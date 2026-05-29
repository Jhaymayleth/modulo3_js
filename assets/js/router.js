/**
 * Router SPA
 */

import { renderHome } from './pages/home.js';
import { renderContacts } from './pages/contacts.js';
import { renderAbout } from './pages/about.js';
import { renderLocations } from './pages/locations.js';
import { renderCharacters } from './pages/characters.js';
import { renderEpisodes } from './pages/episodes.js';

/**
 * Rutas disponibles
 */
const routes = {
    '/': renderHome,
    '/contacts': renderContacts,
    '/about': renderAbout,
    '/location': renderLocations,
    '/characters': renderCharacters,
    '/episodes': renderEpisodes
};

/**
 * Router principal
 */
export async function router() {
    const path = window.location.pathname;
    const page = Number(new URLSearchParams(window.location.search).get('page')) || 1;
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