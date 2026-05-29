import { loadHTML } from '../utils/helpers.js';
import { loadPage } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

// Estado de la aplicación
const stored = (() => {
    try {
        return JSON.parse(localStorage.getItem('localCharacter'));
    } catch (e) {
        return null;
    }
})();

let localCharacters = Array.isArray(stored) && Array.isArray(stored[0]) ? stored[0] : [];
let deletedApiIds = Array.isArray(stored) && Array.isArray(stored[1]) ? stored[1] : [];

function renderCards(apiCharacters, container) {
    // 1. Filtramos los personajes de la API que estén en la lista negra
    const filteredApi = apiCharacters.filter(c => !deletedApiIds.includes(String(c.id)));

    // 2. Unimos los personajes filtrados de la API con los locales
    const all = [...filteredApi, ...localCharacters];

    // 3. Pintamos en el contenedor
    container.innerHTML = all
        .map(character => characterCard(character))
        .join('');
}

function openModal(mode = 'add', character = null) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');

    const fields = {
        name: document.getElementById('input-name'),
        status: document.getElementById('input-status'),
        species: document.getElementById('input-species'),
        image: document.getElementById('input-image'),
        origin: document.getElementById('input-origin'),
        location: document.getElementById('input-location'),
        gender: document.getElementById('input-gender')
    };

    if (mode === 'edit' && character) {
        modalTitle.textContent = 'Editar Personaje';
        fields.name.value = character.name || '';
        fields.status.value = character.status || 'Alive';
        fields.species.value = character.species || '';
        fields.image.value = character.image || '';
        fields.origin.value = character.origin || '';
        fields.location.value = character.location || '';
        fields.gender.value = character.gender || '';
        modal.dataset.editId = character.id;
    } else {
        modalTitle.textContent = 'Añadir Personaje';
        Object.values(fields).forEach(input => input.value = '');
        fields.status.value = 'Alive';
        delete modal.dataset.editId;
    }

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

export async function renderCharacters(page = 1) {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML('./assets/js/views/characters.html');

    const container = document.getElementById('characters-container');
    const apiCharacters = await loadPage('characters', page, container);

    renderCards(apiCharacters, container);

    // Evento Añadir
    document.getElementById('btn-add').addEventListener('click', () => openModal('add'));

    // Delegación de eventos para Editar/Eliminar
    container.addEventListener('click', (event) => {
        const target = event.target;
        const id = target.dataset.id;

        if (target.classList.contains('btn-edit')) {
            const character = localCharacters.find(c => String(c.id) === id) ||
                apiCharacters.find(c => String(c.id) === id);
            if (character) openModal('edit', character);
        }

        if (target.classList.contains('btn-delete')) {
            if (confirm('¿Eliminar este personaje?')) {
                // Si es un personaje local, lo filtramos. Si es de la API, va a la lista negra.
                if (String(id).startsWith('local-')) {
                    localCharacters = localCharacters.filter(c => String(c.id) !== id);
                } else {
                    deletedApiIds.push(String(id));
                    localStorage.setItem("localCharacter", JSON.stringify([localCharacters, deletedApiIds]))
                }
                renderCards(apiCharacters, container);
            }
        }
    });

    // Guardar (Crear o Editar)
    document.getElementById('btn-save').addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const editId = modal.dataset.editId;

        const newOrUpdatedChar = {
            id: editId || 'local-' + Date.now(),
            name: document.getElementById('input-name').value.trim(),
            status: document.getElementById('input-status').value,
            species: document.getElementById('input-species').value.trim(),
            image: document.getElementById('input-image').value.trim() || 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            origin: document.getElementById('input-origin').value.trim(),
            location: document.getElementById('input-location').value.trim(),
            gender: document.getElementById('input-gender').value.trim()
        };

        if (!newOrUpdatedChar.name || !newOrUpdatedChar.species) {
            alert('Por favor completa el nombre y la especie.');
            return;
        }

        if (editId) {
            const index = localCharacters.findIndex(c => String(c.id) === editId);
            if (index !== -1) {
                localCharacters[index] = newOrUpdatedChar;
            } else {
                // Si editamos algo que venía de la API, se convierte en "local"
                localCharacters.push(newOrUpdatedChar);
                deletedApiIds.push(String(editId)); // Lo ocultamos de la API original
                localStorage.setItem("localCharacter", JSON.stringify([localCharacters, deletedApiIds]))
            }
        } else {
            localCharacters.push(newOrUpdatedChar);
            localStorage.setItem("localCharacter", JSON.stringify([localCharacters, deletedApiIds]))
        }

        renderCards(apiCharacters, container);
        closeModal();
    });

    document.getElementById('btn-cancel').addEventListener('click', closeModal);
}
