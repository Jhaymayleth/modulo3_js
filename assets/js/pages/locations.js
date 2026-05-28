import { loadHTML } from '../utils/helpers.js';
import { loadPage } from '../services/api.js';
import { locationCard } from '../components/locationsCard.js';

/**
 * Renderiza las locaciones
 */
export async function renderLocations(page = 1) {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/locations.html'
    );
    const container = document.getElementById(
        'locations-container'
    );

    const locations = await loadPage('locations', page, container);

    container.innerHTML = locations
        .map(location => locationCard(location))
        .join('');
}
