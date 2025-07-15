let pokemons = [];
let currentIndex = 0;
const pageSize = 8;
const URL = 'https://guilherme-cesar-dev-server.github.io/Pokemons/PokemonsFriends.json';

function renderPokemons() {
  const container = document.getElementById('pokemon-list');
  let html = '';
  const nextPokemons = pokemons.slice(currentIndex, currentIndex + pageSize);
  nextPokemons.forEach(pokemon => {
    html += `
      <div class="card">
        <div class="container-f">
          <div class="img-pokemon">
            <img src="${pokemon.imagem}" alt="${pokemon.nome}">
          </div>
          <div class="pokemon">
            <h1 id="number-f">N° ${pokemon.id}</h1>
            <h2 class="criador" id="${pokemon.criador}">${pokemon.criador}</h2>
            <div class="informacao">
              <h3 id="name">${pokemon.nome}</h3>
              ${pokemon.tipos.map(tipo => `<h4 class="type" id="${tipo}">${tipo}</h4>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML += html;
  currentIndex += pageSize;

  // Verifica se chegou ao fim
  if (currentIndex >= pokemons.length) {
    document.getElementById('load-more').style.display = 'none';
    const endMsg = document.createElement('p');
    endMsg.textContent = 'Acabou =( ';
    endMsg.style.textAlign = 'center';
    endMsg.style.fontWeight = 'bold';
    endMsg.style.color = '#424242';
    container.appendChild(endMsg);
  }
}

fetch(URL)
  .then(response => response.json())
  .then(data => {
    pokemons = data;
    currentIndex = 0;
    document.getElementById('pokemon-list').innerHTML = '';
    renderPokemons();
  });

document.getElementById('load-more').addEventListener('click', renderPokemons);