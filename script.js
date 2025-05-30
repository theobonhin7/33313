const baseUrl = 'http://cnms-parking-api.net.uztec.com.br/api/v1';

// Função genérica para requisições
async function fetchApi(endpoint, method, body, resultElementId) {
  const resultElement = document.getElementById(resultElementId);
  resultElement.textContent = 'Carregando...';

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    resultElement.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultElement.textContent = `Erro: ${error.message}`;
  }
}

// Eventos para cada funcionalidade

// Consultar placa
document.getElementById('btnConsultarPlaca').addEventListener('click', () => {
  const plate = document.getElementById('plateInput').value.trim();
  if (!plate) {
    alert('Por favor, digite uma placa.');
    return;
  }

  fetchApi(`/check/${encodeURIComponent(plate)}`, 'resultadoPlaca');
});

// Listar veículos ativos
document.getElementById('btnListActive').addEventListener('click', () => {
  fetchApi('/active', 'GET', null, 'resultListActive');
});

// Verificar vagas disponíveis
document.getElementById('btnCheckSlots').addEventListener('click', () => {
  fetchApi('/slots', 'GET', null, 'resultCheckSlots');
});

// Registrar entrada de veículo
document.getElementById('formAddVehicle').addEventListener('submit', (e) => {
  e.preventDefault();
  const plate = document.getElementById('plateAdd').value.trim();
  fetchApi('/entry', 'POST', { plate }, 'resultAddVehicle');
});

// Remover veículo
document.getElementById('btnRemoveVehicle').addEventListener('click', () => {
  const plate = document.getElementById('plateRemove').value.trim();
  fetchApi(`/cancel/${plate}`, 'DELETE', null, 'resultRemoveVehicle');
});

// Atualizar dados de veículo
document.getElementById('formUpdateVehicle').addEventListener('submit', (e) => {
  e.preventDefault();
  const plate = document.getElementById('plateUpdate').value.trim();
  const newPlate = document.getElementById('newPlate').value.trim();
  fetchApi(`/update/${plate}`, 'PUT', { newPlate }, 'resultUpdateVehicle');
});

// Registrar saída de veículo
document.getElementById('btnExitVehicle').addEventListener('click', () => {
  const plate = document.getElementById('plateExit').value.trim();
  fetchApi(`/exit/${plate}`, 'PATCH', null, 'resultExitVehicle');
});

// Gerar relatório diário
document.getElementById('btnGenerateReport').addEventListener('click', () => {
  fetchApi('/report', 'GET', null, 'resultGenerateReport');
});

// Ver tempo de permanência
document.getElementById('btnCheckTime').addEventListener('click', () => {
  const plate = document.getElementById('plateTime').value.trim();
  fetchApi(`/time/${plate}`, 'GET', null, 'resultCheckTime');
});
