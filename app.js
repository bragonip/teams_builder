let players = [];  // Lista temporal para almacenar los jugadores

// Función para agregar un jugador
document.getElementById('addPlayerBtn').addEventListener('click', function() {
  const playerName = document.getElementById('playerName').value;

  if (playerName) {
    players.push(playerName);  // Agregar el nombre del jugador a la lista
    updatePlayerList();        // Actualizar la lista visualmente
    document.getElementById('playerName').value = '';  // Limpiar el campo
  }
});

// Función para actualizar la lista de jugadores en el HTML
function updatePlayerList() {
  const playerList = document.getElementById('playerList');
  playerList.innerHTML = '';  // Limpiar la lista

  players.forEach((player, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${player}`;
    playerList.appendChild(listItem);
  });
}

// Función para exportar la lista de jugadores como CSV
document.getElementById('exportCsvBtn').addEventListener('click', function() {
  if (players.length > 0) {
    const csvContent = "data:text/csv;charset=utf-8," + players.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'jugadores.csv');
    document.body.appendChild(link);  // Necesario para Firefox
    link.click();
    document.body.removeChild(link);
  } else {
    alert('No hay jugadores para exportar.');
  }
});

// Función para importar jugadores desde un archivo CSV
document.getElementById('importCsvBtn').addEventListener('click', function() {
  const fileInput = document.getElementById('importCsvFile');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const csvContent = e.target.result;
      const rows = csvContent.split('\n');
      rows.forEach(row => {
        if (row.trim()) {  // Asegurarse de que la fila no esté vacía
          players.push(row.trim());  // Agregar el jugador a la lista
        }
      });
      updatePlayerList();  // Actualizar la lista visualmente
    };
    reader.readAsText(file);
  } else {
    alert('Por favor, selecciona un archivo CSV.');
  }
});
