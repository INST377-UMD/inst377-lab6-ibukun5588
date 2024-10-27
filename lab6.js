function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map and set view to US coordinates
    const map = L.map('map').setView([37.0902, -95.7129], 4);

    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const markerInfoDiv = document.getElementById("marker-info");

    // Generate random points
    for (let i = 1; i <= 3; i++) {
        const lat = getRandomInRange(38, 43, 3);
        const lon = getRandomInRange(-88, -94, 3);
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`Marker ${i}: Latitude: ${lat}, Longitude: ${lon}`).openPopup();
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const locality = data.locality || "Unknown";
                markerInfoDiv.innerHTML += `<p><strong>Marker ${i}</strong>: Latitude: ${lat}, Longitude: ${lon}<br>Locality: ${locality}</p>`;
            })
            .catch(error => {
                console.error("Error fetching locality data:", error);
                markerInfoDiv.innerHTML += `<p><strong>Marker ${i}</strong>: Latitude: ${lat}, Longitude: ${lon}<br>Locality: Unable to retrieve</p>`;
            });
    }

    
    setTimeout(() => {
        map.invalidateSize();
    }, 1000);
});
