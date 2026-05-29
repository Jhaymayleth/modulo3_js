/**
 * Character Card Component
 */

export function characterCard(character) {

    return `
        <article class="card">
            <img
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="card-body">
                <h2>${character.name}</h2>
                <p>
                    <strong>Status:</strong>
                    ${character.status}
                </p>
                <p>
                    <strong>Actual location:</strong>
                    ${character.location.name}
                </p>
                <p>
                    <strong>Gender:</strong>
                    ${character.gender}
                </p>
                
                <span class="MoreInfo">
                    <p>
                        <strong>Origin:</strong>
                        ${character.origin.name}
                    </p>
                    <p>
                        <strong>Species:</strong>
                        ${character.species}
                    </p>
                    ${character.type? `<p><strong>Type:</strong> ${character.type}</p>` : ""}
                </span>
            </div>
        </article>
    `;
}

// created
// episode
// gender -
// id 
// image -
// location
//     name -
//     url
// name -
// origin
//     name -
//     url
// species -
// status -
// type -
// url