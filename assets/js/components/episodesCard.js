export function episodeCard(episode) {
  return `
    <article class="episode-card glass-card" data-episode-id="${episode.id}">
      <img
        src="https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif"
        alt="${episode.name}"
      >

      <div class="card-body">
        <h3>${episode.name}</h3>
        <p>
          <strong>Episode:</strong>
          ${episode.episode}
        </p>
        <p>
          <strong>Air Date:</strong>
          ${episode.air_date}
        </p>
        <p>
          <strong>Number of Characters appeared:</strong>
          ${episode.characters.length}
        </p>
        <button class="episode-button" data-episode-id="${episode.id}">
          See Characters appeared
        </button>
      </div>
    </article>
  `;
}
