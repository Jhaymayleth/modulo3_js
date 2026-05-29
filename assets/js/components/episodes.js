/**
 * Character Card Component
 */

export function episodeCard(episode) {

    return `
        <article class="episode-card">
            <img
                src="https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif"
                alt="${episode.name}"
            >

            <div class="card-body">
                <h3>${episode.name}</h3>
                <p>
                    <strong>Type:</strong>
                    ${episode.type}
                </p>
                <p>
                    <strong>Dimension:</strong>
                    ${episode.dimension}
                </p>
            </div>
        </article>
    `;
}
