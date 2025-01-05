let map, userMarker, routeLayer;

// Localização inicial em São Gonçalo (Rua Humberto de Campos 54, Lindo Parque)
const saoGoncaloLocation = { lat: -22.848, lng: -42.070 };

// Função para inicializar o mapa
async function initMap() {
    map = L.map('map').setView([saoGoncaloLocation.lat, saoGoncaloLocation.lng], 12);

    // Adicionar o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionar marcador para a localização de São Gonçalo
    userMarker = L.marker([saoGoncaloLocation.lat, saoGoncaloLocation.lng]).addTo(map).bindPopup('São Gonçalo - Lindo Parque').openPopup();
}

// Função para calcular a rota simulada (sem API)
function calculateRoute(start, end, fuelPrice) {
    // Simulação de cálculo de rota: valores fictícios
    const distance = Math.random() * 50 + 20; // Distância entre 20 e 70 km
    const duration = distance / 50; // Tempo de viagem (simulado a 50 km/h)

    // Exibir a rota no mapa
    if (routeLayer) {
        map.removeLayer(routeLayer); // Remove a rota anterior
    }

    const coordinates = [
        [start.lat, start.lng],
        [end.lat, end.lng]
    ];

    routeLayer = L.polyline(coordinates, { color: 'blue' }).addTo(map);

    // Cálculos de custo e combustível
    const fuelConsumption = 10; // Agora o carro percorre 10 km/l
    const fuelUsed = distance / fuelConsumption; 

    // O valor gasto para cada 1 km percorrido será o preço do litro dividido por 10
    const costPerKm = fuelPrice / fuelConsumption;
    const totalCost = costPerKm * distance;

    const hours = Math.floor(duration);
    const minutes = Math.floor((duration - hours) * 60);

    // Exibir os resultados no pop-up
    document.getElementById("distanceResult").textContent = `${distance.toFixed(2)} km`;
    document.getElementById("timeResult").textContent = `${hours}h ${minutes}m`;
    document.getElementById("costResult").textContent = `R$ ${totalCost.toFixed(2)}`;
    document.getElementById("fuelResult").textContent = `${fuelUsed.toFixed(2)} litros`;

    // Exibir detalhes do cálculo
    const calculationDetails = `Distância: ${distance.toFixed(2)} km | Tempo: ${hours}h ${minutes}m | Combustível: ${fuelUsed.toFixed(2)} L | Custo: R$ ${totalCost.toFixed(2)}`;
    document.getElementById("calculationDetails").textContent = calculationDetails;

    // Mostrar o pop-up com os resultados
    document.getElementById("resultsPopup").style.display = 'block';
}

// Função para realizar a geocodificação e validar o destino
async function geocodeDestination(destination) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${destination}, RJ&format=json&addressdetails=1&countrycodes=BR&statecode=RJ`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        } else {
            throw new Error("Destino não encontrado. Tente um nome de cidade válido.");
        }
    } catch (error) {
        console.error('Erro na geocodificação:', error);
        alert('Erro ao buscar o destino. Certifique-se de que está dentro do estado do Rio de Janeiro.');
        return null;
    }
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById("resultsPopup").style.display = 'none';
}

// Evento de envio do formulário
document.getElementById("routeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const destination = document.getElementById("destination").value;
    const fuelPrice = parseFloat(document.getElementById("fuelPrice").value);

    if (destination && fuelPrice) {
        geocodeDestination(destination).then(end => {
            if (end) {
                const start = userMarker.getLatLng(); // A localização de São Gonçalo
                calculateRoute(start, end, fuelPrice);
            }
        }).catch(error => {
            alert('Erro na geocodificação: ' + error.message);
        });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Inicializar o mapa ao carregar a página
window.onload = initMap;
