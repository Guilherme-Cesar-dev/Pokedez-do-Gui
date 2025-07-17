let pokemons = [];
let currentIndex = 0;
const pageSize = 8;
const URL = 'https://guilherme-cesar-dev-server.github.io/Pokemons/Treinador.json';

function renderPokemons() {
  const container = document.getElementById('treinador-list');
  let html = '';
  const nextPokemons = pokemons.slice(currentIndex, currentIndex + pageSize);
  nextPokemons.forEach(pokemon => {
    html += `
      <!--${treinador.nome}-->
      <div class="card">
        <div class="container">
            <div class="img-treinador">
                <img src="${treinador.imagem}" alt="${treinador.nome}">
            </div>
            <div class="treinador" id="${treinador.regiao}">
                <h3 id="name">${treinador.nome}</h3>
                <h5 id="realName">${treinador.nomereal}<h5>
                <h4 id="region">${treinador.regiao}<h4>
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
    endMsg.textContent = 'Acabou =(';
    endMsg.style.textAlign = 'center';
    endMsg.style.fontWeight = 'bold';
    endMsg.style.color = '#424242';
    container.appendChild(endMsg);
  }
}

fetch(URL) //caso esteja alterando pelo codigo usa o de backend
  .then(response => response.json())
  .then(data => {
    pokemons = data;
    currentIndex = 0;
    document.getElementById('treinador-list').innerHTML = '';
    renderPokemons();
  });

document.getElementById('load-more').addEventListener('click', renderPokemons);