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
                    <strong>Episode Number:</strong>
                    ${episode.episode}
                </p>
                <p>
                    <strong>Air Date:</strong>
                    ${episode.air_date}
                </p>
                <p>
                    <strong>number of Characters Appeared:</strong>
                    ${episode.characters.length}
                </p>
            </div>
        </article>
    `;
}

// air_date
// characters
// created
// episode
// id
// name
// url