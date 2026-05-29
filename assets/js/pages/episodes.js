import { loadHTML } from "../utils/helpers.js";
import { loadPage, getCharactersByEpisode } from "../services/api.js";
import { episodeCard } from "../components/episodesCard.js";
import { characterCard } from "../components/characterCard.js";

let currentEpisodes = [];
const episodeCharactersCache = {};

export async function renderEpisodes() {
  const content = document.getElementById("content");
  content.innerHTML = await loadHTML("/assets/js/views/episodes.html");

  const container = document.getElementById("episodes-container");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const currentPage = Number(params.get("page")) || 1;

  const episodes = await loadPage("episodes", currentPage, container);

  currentEpisodes = episodes;
  container.innerHTML = episodes.map(episodeCard).join("");

  bindEpisodeEvents();
  setupEpisodeModal();
}

function bindEpisodeEvents() {
  const buttons = document.querySelectorAll(".episode-button");

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const episodeId = Number(event.currentTarget.dataset.episodeId);
      const episode = currentEpisodes.find((item) => item.id === episodeId);

      if (!episode) return;

      await openEpisodeCharactersModal(episode);
    });
  });
}

function setupEpisodeModal() {
  let modal = document.getElementById("episode-modal");

  if (modal) return;

  modal = document.createElement("div");
  modal.id = "episode-modal";
  modal.className = "episode-modal hidden";
  modal.innerHTML = `
    <div class="episode-modal-overlay"></div>
    <div class="episode-modal-content">
      <button id="close-episode-modal" class="episode-modal-close">×</button>
      <h2 id="episode-modal-title"></h2>
      <p id="episode-modal-meta"></p>
      <div id="episode-modal-body"></div>
    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector("#close-episode-modal")
    .addEventListener("click", closeEpisodeModal);

  modal
    .querySelector(".episode-modal-overlay")
    .addEventListener("click", closeEpisodeModal);
}

function closeEpisodeModal() {
  const modal = document.getElementById("episode-modal");
  if (!modal) return;
  modal.classList.add("hidden");
}

async function openEpisodeCharactersModal(episode) {
  const modal = document.getElementById("episode-modal");
  const title = document.getElementById("episode-modal-title");
  const meta = document.getElementById("episode-modal-meta");
  const body = document.getElementById("episode-modal-body");

  if (!modal || !title || !meta || !body) return;

  title.textContent = episode.name;
  meta.textContent = `${episode.episode} • ${episode.air_date} • ${episode.characters.length} personajes`;
  body.innerHTML = `<p class="episode-loading">Cargando personajes...</p>`;
  modal.classList.remove("hidden");

  try {
    let characters = episodeCharactersCache[episode.id];

    if (!characters) {
      characters = await getCharactersByEpisode(episode);
      episodeCharactersCache[episode.id] = characters;
    }

    if (!characters.length) {
      body.innerHTML = `<p class="episode-empty">No hay personajes asociados a este episodio.</p>`;
      return;
    }

    body.innerHTML = `
      <div class="episode-characters-grid">
        ${characters.map((character) => characterCard(character, { showActions: false })).join("")}
      </div>
    `;
  } catch (error) {
    body.innerHTML = `<p class="episode-error">No se pudieron cargar los personajes del episodio.</p>`;
  }
}
