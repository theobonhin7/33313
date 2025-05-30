document.getElementById('btnConsultar').addEventListener('click', async () => {
  const plate = document.getElementById('plateInput').value.trim();
  const resultadoEl = document.getElementById('resultado');
  
  if (!plate) {
    alert('Por favor, digite uma placa.');
    return;
  }
  
  resultadoEl.textContent = 'Carregando...';

  const url = `https://cnms-parking-api.net.uztec.com.br/api/v1/check/plate?plate=${encodeURIComponent(plate)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer SUA_CHAVE_API_AQUI', // Troque pela sua chave real
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    resultadoEl.textContent = JSON.stringify(data, null, 2);

  } catch (error) {
    resultadoEl.textContent = `Erro: ${error.message}`;
  }
});
