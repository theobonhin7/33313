const baseUrl = 'http://cnms-parking-api.net.uztec.com.br/api/v1';

// Função genérica para requisições
async function fetchApi(endpoint, method = 'GET', body = null, resultElementId) {
  const resultElement = document.getElementById(resultElementId);
  resultElement.textContent = 'Carregando...';

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    resultElement.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultElement.textContent = `Erro: ${error.message}`;
  }
}

// Adicionar Vaga
document.getElementById('formAddSpot').addEventListener('submit', (e) => {
  e.preventDefault();
  const spotNumber = document.getElementById('spotNumber').value.trim();
  if (!spotNumber) {
    alert('Por favor, informe o número da vaga.');
    return;
  }
  fetchApi('/parking/spots', 'POST', { number: spotNumber }, 'resultadoAddSpot');
});

// Listar Vagas
document.getElementById('btnListarVagas').addEventListener('click', () => {
  fetchApi('/parking/spots', 'GET', null, 'resultadoListarVagas');
});

// Deletar Vaga
document.getElementById('btnDeletarVaga').addEventListener('click', () => {
  const spotId = document.getElementById('deleteSpotId').value.trim();
  if (!spotId) {
    alert('Por favor, informe o ID da vaga.');
    return;
  }
  fetchApi(`/parking/spots/${spotId}`, 'DELETE', null, 'resultadoDeletarVaga');
});
