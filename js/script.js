const API_BASE_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1';

// Função genérica para lidar com requisições
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Ocorreu um erro na requisição. Verifique o console para mais detalhes.');
    return null;
  }
}

// Funções específicas
async function verSlots() {
  const data = await fetchAPI('/slots');
  if (data) {
    document.getElementById('slots').textContent = JSON.stringify(data, null, 2);
  }
}

async function listarAtivos() {
  const data = await fetchAPI('/active');
  if (data) {
    document.getElementById('ativos').textContent = JSON.stringify(data, null, 2);
  }
}

async function registrarEntrada() {
  const plate = document.getElementById('entradaPlaca').value.trim();
  const model = document.getElementById('entradaModelo').value.trim();

  if (!plate || !model) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const data = await fetchAPI('/entry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plate, model }),
  });

  if (data) {
    document.getElementById('entrada').textContent = JSON.stringify(data, null, 2);
  }
}

async function checkVeiculo() {
  const plate = document.getElementById('checkPlaca').value.trim();

  if (!plate) {
    alert('Por favor, insira a placa.');
    return;
  }

  const data = await fetchAPI(`/check/${plate}`);
  if (data) {
    document.getElementById('check').textContent = JSON.stringify(data, null, 2);
  }
}

async function registrarSaida() {
  const plate = document.getElementById('saidaPlaca').value.trim();

  if (!plate) {
    alert('Por favor, insira a placa.');
    return;
  }

  const data = await fetchAPI(`/exit/${plate}`, { method: 'PATCH' });
  if (data) {
    document.getElementById('saida').textContent = JSON.stringify(data, null, 2);
  }
}

async function cancelarRegistro() {
  const plate = document.getElementById('cancelarPlaca').value.trim();

  if (!plate) {
    alert('Por favor, insira a placa.');
    return;
  }

  const data = await fetchAPI(`/cancel/${plate}`, { method: 'DELETE' });
  if (data) {
    document.getElementById('cancelar').textContent = JSON.stringify(data, null, 2);
  }
}

async function verTempo() {
  const plate = document.getElementById('tempoPlaca').value.trim();

  if (!plate) {
    alert('Por favor, insira a placa.');
    return;
  }

  const data = await fetchAPI(`/time/${plate}`);
  if (data) {
    document.getElementById('tempo').textContent = JSON.stringify(data, null, 2);
  }
}

async function atualizarVeiculo() {
  const oldPlate = document.getElementById('updatePlaca').value.trim();
  const newPlate = document.getElementById('novaPlaca').value.trim();

  if (!oldPlate || !newPlate) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const data = await fetchAPI(`/update/${oldPlate}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plate: newPlate }),
  });

  if (data) {
    document.getElementById('update').textContent = JSON.stringify(data, null, 2);
  }
}

async function gerarRelatorio() {
  const data = await fetchAPI('/report');
  if (data) {
    document.getElementById('relatorio').textContent = JSON.stringify(data, null, 2);
  }
}
