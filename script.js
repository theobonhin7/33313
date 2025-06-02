    const API = 'http://cnms-parking-api.net.uztec.com.br/api/v1';

    async function verSlots() {
      const res = await fetch(`${API}/slots`);
      const data = await res.json();
      document.getElementById('slots').textContent = JSON.stringify(data, null, 2);
    }

    async function listarAtivos() {
      const res = await fetch(`${API}/active`);
      const data = await res.json();
      document.getElementById('ativos').textContent = JSON.stringify(data, null, 2);
    }

    async function registrarEntrada() {
      const plate = document.getElementById('entradaPlaca').value.trim();
      const model = document.getElementById('entradaModelo').value.trim();

      if (plate.length === 0) {
        alert('Por favor, digite ao menos um caractere na placa.');
        document.getElementById('entradaPlaca').focus();
        return;
      }
      if (model.length === 0) {
        alert('Por favor, digite o modelo do carro.');
        document.getElementById('entradaModelo').focus();
        return;
      }

      const res = await fetch(`${API}/entry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plate, model })
      });
      const data = await res.json();
      document.getElementById('entrada').textContent = JSON.stringify(data, null, 2);
    }

    async function checkVeiculo() {
      const plate = document.getElementById('checkPlaca').value;
      const res = await fetch(`${API}/check/${plate}`);
      const data = await res.json();
      document.getElementById('check').textContent = JSON.stringify(data, null, 2);
    }

    async function registrarSaida() {
      const plate = document.getElementById('saidaPlaca').value;
      const res = await fetch(`${API}/exit/${plate}`, { method: 'PATCH' });
      const data = await res.json();
      document.getElementById('saida').textContent = JSON.stringify(data, null, 2);
    }

    async function cancelarRegistro() {
      const plate = document.getElementById('cancelarPlaca').value;
      const res = await fetch(`${API}/cancel/${plate}`, { method: 'DELETE' });
      const data = await res.json();
      document.getElementById('cancelar').textContent = JSON.stringify(data, null, 2);
    }

    async function verTempo() {
      const plate = document.getElementById('tempoPlaca').value;
      const res = await fetch(`${API}/time/${plate}`);
      const data = await res.json();
      document.getElementById('tempo').textContent = JSON.stringify(data, null, 2);
    }

    async function atualizarVeiculo() {
      const oldPlate = document.getElementById('updatePlaca').value;
      const newPlate = document.getElementById('novaPlaca').value;
      const res = await fetch(`${API}/update/${oldPlate}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plate: newPlate })
      });
      const data = await res.json();
      document.getElementById('update').textContent = JSON.stringify(data, null, 2);
    }

    async function gerarRelatorio() {
      const res = await fetch(`${API}/report`);
      const data = await res.json();
      document.getElementById('relatorio').textContent = JSON.stringify(data, null, 2);
    }