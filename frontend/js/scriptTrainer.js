let treinador = [];
let currentIndex = 0;
const pageSize = 8;
const URL = 'https://guilherme-cesar-dev-server.github.io/Pokemons/Treinadores.json';

function renderTreinadores() {
  const container = document.getElementById('treinador-list');
  let html = '';
  const nextTreinadores = treinador.slice(currentIndex, currentIndex + pageSize);
  nextTreinadores.forEach(treinador => {
    html += `
      <div class="card">
        <div class="container">
            <div class="img-treinador">
                <img src="${treinador.imagem}" alt="${treinador.nome}">
            </div>
            <div class="treinador" id="${treinador.regiao}">
                <h3 id="name">${treinador.nome}</h3>
                <h4 id="realName">${treinador.nomereal}</h4>
                <h4 id="region">${treinador.regiao}</h4>
            </div>
        </div>
      </div>
    `;
  });
  container.innerHTML += html;
  currentIndex += pageSize;

  // Verifica se chegou ao fim
  if (currentIndex >= treinador.length) {
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
    treinador = data;
    currentIndex = 0;
    document.getElementById('treinador-list').innerHTML = '';
    renderTreinadores();
  });

document.getElementById('load-more').addEventListener('click', renderTreinadores);