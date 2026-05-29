export function episodeCard(episode) {
  return `
    <article class="episode-card" data-episode-id="${episode.id}">
      <img
        src="https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif"
        alt="${episode.name}"
      >

      <div class="card-body">
        <h3>${episode.name}</h3>
        <p>
          <strong>Episodio:</strong>
          ${episode.episode}
        </p>
        <p>
          <strong>Fecha de emisión:</strong>
          ${episode.air_date}
        </p>
        <p>
          <strong>Cantidad de personajes:</strong>
          ${episode.characters.length}
        </p>
        <button class="episode-button" data-episode-id="${episode.id}">
          Ver personajes
        </button>
      </div>
    </article>
  `;
}
