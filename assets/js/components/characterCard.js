export function characterCard(character, options = {}) {
  const { showActions = true } = options;

  return `
    <article class="card glass-card" data-id="${character.id || ""}">
      <img
        src="${character.image}"
        alt="${character.name}"
      >

            <div class="card-body">
                <h3>${character.name}</h3>
                <p>
                    <strong>Status:</strong> 
                    ${character.status}
                </p>
                <p>
                    <strong>Species:</strong> 
                    ${character.species}
                </p>
                <p>
                    <strong>Actual location:</strong> 
                    ${character.location.name ? character.location.name : ''}
                </p> 
                <p>
                    <strong>Gender:</strong> 
                    ${character.gender}
                </p>
                <p>
                    <strong>Origin:</strong> 
                    ${character.origin.name}
                </p>

                ${character.type ? `<p><strong>Type:</strong> ${character.type}</p>` : ''}

        ${
          showActions
            ? `
          <div class="card-actions">
            <button class="btn-edit" data-id="${character.id}">✏️ Editar</button>
            <button class="btn-delete" data-id="${character.id}">🗑️ Eliminar</button>
          </div>
        `
            : ""
        }
      </div>
    </article>
  `;
}
