/**
 * Character Card Component
 */

export function locationCard(location) {

    return `
        <article class="location-card">
            <img
                src="https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif"
                alt="${location.name}"
            >

            <div class="card-body">
                <h3>${location.name}</h3>
                <p>
                    <strong>Type:</strong>
                    ${location.type}
                </p>
                <p>
                    <strong>Dimension:</strong>
                    ${location.dimension}
                </p>
            </div>
        </article>
    `;
}
