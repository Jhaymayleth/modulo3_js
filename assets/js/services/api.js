import httpClient from "./httpClient.js";

export async function getCharacters(page = 1) {
  try {
    const response = await httpClient.get(`/character?page=${page}`);
    return [response.data.results, response.data.info.pages];
  } catch (error) {
    console.error(error);
    return [[], 1];
  }
}

export async function getLocations(page = 1) {
  try {
    const response = await httpClient.get(`/location?page=${page}`);
    return [response.data.results, response.data.info.pages];
  } catch (error) {
    console.error(error);
    return [[], 1];
  }
}

export async function getEpisodes(page = 1) {
  try {
    const response = await httpClient.get(`/episode?page=${page}`);
    return [response.data.results, response.data.info.pages];
  } catch (error) {
    console.error(error);
    return [[], 1];
  }
}

export async function loadPage(view, page = 1, container) {
  const views = {
    characters: getCharacters,
    locations: getLocations,
    episodes: getEpisodes,
  };

  const fetchPage = views[view];

  if (!fetchPage) {
    console.error(`View "${view}" not found.`);
    return [];
  }

  const currentPage = Number(page) || 1;
  const [items, lastPage] = await fetchPage(currentPage);

  if (container) {
    container.innerHTML = "";
  }

  const nextButton = document.getElementById("next");
  const previousButton = document.getElementById("previous");

  const routeMap = {
    characters: "/characters",
    locations: "/location",
    episodes: "/episodes",
  };

  function goToPage(newPage) {
    const route = routeMap[view] || `/${view}`;
    history.pushState(null, "", `${route}?page=${newPage}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  if (nextButton) {
    nextButton.onclick = () => {
      if (currentPage < lastPage) {
        goToPage(currentPage + 1);
      }
    };
  }

  if (previousButton) {
    previousButton.onclick = () => {
      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    };
  }

  return items;
}

export async function getCharactersByEpisode(episode) {
  const characterUrls = episode.characters || [];

  if (!characterUrls.length) return [];

  const ids = characterUrls.map((url) => url.split("/").pop()).join(",");

  const response = await httpClient.get(`/character/${ids}`);
  return Array.isArray(response.data) ? response.data : [response.data];
}
