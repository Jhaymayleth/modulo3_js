import { loadHTML } from '../utils/helpers.js';
import { loadPage } from '../services/api.js';
import { episodeCard } from '../components/episodesCard.js';

/**
 * Renderiza los episodios
 */
export async function renderEpisodes(page = 1) {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/episodes.html'
    );
    const container = document.getElementById(
        'episodes-container'
    );

    const episodes = await loadPage('episodes', page, container);

    container.innerHTML = episodes
        .map(episode => episodeCard(episode))
        .join('');
}
