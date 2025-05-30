const baseUrl = 'http://cnms-parking-api.net.uztec.com.br/api/v1';

// Função genérica para realizar requisições à API
async function fetchApi(endpoint, resultElementId) {
  const resultElement = document.getElementById(resultElementId);
  resultElement.textContent = 'Carregando...';

  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    resultElement.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultElement.textContent = `Erro: ${error.message}`;
  }
}

// Consultar placa
document.getElementById('btnConsultarPlaca').addEventListener('click', () => {
  const plate = document.getElementById('plateInput').value.trim();
  if (!plate) {
    alert('Por favor, digite uma placa.');
    return;
  }
  fetchApi(`/check/plate?plate=${encodeURIComponent(plate)}`, 'resultadoPlaca');
});

// Listar vagas
document.getElementById('btnListarVagas').addEventListener('click', () => {
  fetchApi('/parking/spots', 'resultadoVagas');
});

// Status do estacionamento
document.getElementById('btnStatusEstacionamento').addEventListener('click', () => {
  fetchApi('/parking/status', 'resultadoStatus');
});
