import { loadHTML } from "../utils/helpers.js";
import { getHomeStats } from "../services/api.js";

export async function renderHome() {
  const content = document.getElementById("content");
  content.innerHTML = await loadHTML("./assets/js/views/home.html");

  const stats = await getHomeStats();

  const totalCharacters = document.getElementById("total-characters");
  const totalLocations = document.getElementById("total-locations");
  const totalEpisodes = document.getElementById("total-episodes");

  if (totalCharacters) {
    totalCharacters.textContent = stats.characters;
  }

  if (totalLocations) {
    totalLocations.textContent = stats.locations;
  }

  if (totalEpisodes) {
    totalEpisodes.textContent = stats.episodes;
  }
}
