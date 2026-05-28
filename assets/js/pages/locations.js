import { loadHTML } from '../utils/helpers.js';
import { getLocations } from '../services/api.js';
import { locationCard } from '../components/locationsCard.js';

/**
 * Renderiza las locaciones
 */
export async function renderLocations() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/locations.html'
    );
    const container = document.getElementById(
        'locations-container'
    );
    const locations = await getLocations();
    container.innerHTML = locations
        .map(location => locationCard(location))
        .join('');
}
