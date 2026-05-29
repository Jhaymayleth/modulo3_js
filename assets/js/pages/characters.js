import { loadHTML } from '../utils/helpers.js';
import { loadPage } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

let localCharacters = [];

function renderCards(apiCharacters, container) {
    const all = [...apiCharacters, ...localCharacters];
    container.innerHTML = all
        .map(character => characterCard(character))
        .join('');
}

function openModal(mode = 'add', character = null) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const inputName = document.getElementById('input-name');
    const inputStatus = document.getElementById('input-status');
    const inputSpecies = document.getElementById('input-species');
    const inputImage = document.getElementById('input-image');

    if (mode === 'edit' && character) {
        modalTitle.textContent = 'Editar Personaje';
        inputName.value = character.name;
        inputStatus.value = character.status;
        inputSpecies.value = character.species;
        inputImage.value = character.image;
        modal.dataset.editId = character.id;
    } else {
        modalTitle.textContent = 'Añadir Personaje';
        inputName.value = '';
        inputStatus.value = 'Alive';
        inputSpecies.value = '';
        inputImage.value = '';
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

    document.getElementById('btn-add').addEventListener('click', () => {
        openModal('add');
    });

    container.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('btn-edit')) {
            const id = target.dataset.id;
            const character =
                localCharacters.find(c => String(c.id) === id) ||
                apiCharacters.find(c => String(c.id) === id);

            if (character) {
                openModal('edit', character);
            }
        }

        if (target.classList.contains('btn-delete')) {
            const id = target.dataset.id;
            const confirmed = confirm('¿Eliminar este personaje?');
            if (!confirmed) return;

            localCharacters = localCharacters.filter(c => String(c.id) !== id);
            renderCards(apiCharacters, container);
        }
    });

    document.getElementById('btn-save').addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const name = document.getElementById('input-name').value.trim();
        const status = document.getElementById('input-status').value;
        const species = document.getElementById('input-species').value.trim();
        const image = document.getElementById('input-image').value.trim();

        if (!name || !species) {
            alert('Por favor completa el nombre y la especie.');
            return;
        }

        const editId = modal.dataset.editId;

        if (editId) {
            const existingIndex = localCharacters.findIndex(c => String(c.id) === editId);

            if (existingIndex !== -1) {
                localCharacters[existingIndex] = { ...localCharacters[existingIndex], name, status, species, image };
            } else {
                localCharacters.push({ id: editId, name, status, species, image });
            }
        } else {
            const newCharacter = {
                id: 'local-' + Date.now(),
                name,
                status,
                species,
                image: image || 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
            };
            localCharacters.push(newCharacter);
        }

        renderCards(apiCharacters, container);
        closeModal();
    });

    document.getElementById('btn-cancel').addEventListener('click', closeModal);
}