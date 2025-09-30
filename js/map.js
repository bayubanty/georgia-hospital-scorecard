// Map functionality
let mainMap = null;
let markers = [];
let locationCircle = null;
let markerLayerGroup = L.layerGroup();

// Make these available globally
window.mainMap = mainMap;
window.locationCircle = locationCircle;
window.markerLayerGroup = markerLayerGroup;

function initMainMap() {
    // Check if map container exists
    const mapContainer = document.getElementById('mainMap');
    if (!mapContainer) {
        console.log('Map container not found');
        return;
    }
    
    // Create a map centered on Georgia
    mainMap = L.map('mainMap').setView([32.6782, -83.2226], 7);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mainMap);
    
    // Add marker layer group to map
    markerLayerGroup.addTo(mainMap);
    
    // Update global reference
    window.mainMap = mainMap;
    
    // Add markers for all hospitals if data is available
    if (window.filteredHospitals && window.filteredHospitals.length > 0) {
        updateMapMarkers(window.filteredHospitals);
    } else {
        // Wait for data to be available
        const checkData = setInterval(() => {
            if (window.filteredHospitals && window.filteredHospitals.length > 0) {
                clearInterval(checkData);
                updateMapMarkers(window.filteredHospitals);
            }
        }, 100);
    }
}

function updateMapMarkers(hospitals) {
    if (!markerLayerGroup || !mainMap) {
        console.log('Map not initialized');
        return;
    }
    
    // Clear existing markers
    markerLayerGroup.clearLayers();
    markers = [];
    
    // Add new markers for each hospital
    hospitals.forEach((hospital) => {
        // Determine marker color based on grade
        let markerColor;
        switch(hospital.TIER_1_GRADE_Lown_Composite) {
            case 'A': markerColor = '#2ecc71'; break;
            case 'B': markerColor = '#57d68d'; break;
            case 'C': markerColor = '#ffe135'; break;
            case 'D': markerColor = '#ffd700'; break;
            case 'F': markerColor = '#e74c3c'; break;
            default: markerColor = '#0078c8';
        }
        
        // Create a custom icon
        const hospitalIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${hospital.TIER_1_GRADE_Lown_Composite}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        // Add marker to map
        const marker = L.marker([hospital.Lat, hospital.Lng], {icon: hospitalIcon})
            .addTo(markerLayerGroup)
            .bindPopup(`
                <b>${hospital.Name}</b><br>
                ${hospital.Address}, ${hospital.City}<br>
                Grade: ${hospital.TIER_1_GRADE_Lown_Composite}
                <br><br>
                <button onclick="window.showDetailsPage(${hospital.RECORD_ID})" style="background: #f48810; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">View Details</button>
            `);
        
        markers.push(marker);
    });
    
    // Adjust map view to show all markers if there are any
    if (hospitals.length > 0) {
        const group = new L.featureGroup(markers);
        mainMap.fitBounds(group.getBounds().pad(0.1));
    }
}

// Make functions globally available
window.initMainMap = initMainMap;
window.updateMapMarkers = updateMapMarkers;
