/**
 * Servicio API Rick and Morty
 */

import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */
export async function getCharacters(page = 1) {
    try {
        const response = await httpClient.get(`/character?page=${page}`);
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Obtiene ubicaciones
 *
 * @returns {Promise<Array>}
 */
export async function getLocations(page = 1) {
    try {
        const response = await httpClient.get(`/location?page=${page}`);
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}