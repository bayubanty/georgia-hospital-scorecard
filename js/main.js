// Global variables
let hospitalsData = [];
let filteredHospitals = [];
let activeDropdown = null;

// Initialize the main application
document.addEventListener('DOMContentLoaded', function() {
    // Load hospital data
    loadHospitalData();
    
    // Initialize the application
    initApplication();
});

function loadHospitalData() {
    // In a real application, this would be an API call
    // For now, we'll use the sample data
    hospitalsData = [
        {
            "RECORD_ID": 110001,
            "Name": "Hamilton Medical Center",
            "State": "GA",
            "City": "Dalton",
            "Address": "1200 MEMORIAL DRIVE",
            "Zip": 30720,
            "Lat": 34.773,
            "Lng": -84.971,
            "TYPE_NonProfit": 1,
            "TYPE_ForProfit": 0,
            "TYPE_urban": 1,
            "TYPE_rural": 0,
            "TIER_1_GRADE_Lown_Composite": "C",
            "BalanceGrowth": 78,
            "Transparency": 65,
            "FiscalHealth": 82,
            "Staffing": 71,
            "TaxBenefit": 89,
            "QualityOfCBS": 76,
            "StrategicUse": 68,
            "FinancialBurden": 45,
            "CharityCare": 92,
            "MedicalDebt": 38,
            "RangeOfServices": 85,
            "DemographicAlignment": 72,
            "WorkforceTraining": 88,
            "PayEquityRatio": 63
        },
        {
            "RECORD_ID": 110002,
            "Name": "Upson Regional Medical Center",
            "State": "GA",
            "City": "Thomaston",
            "Address": "801 W GORDON STREET",
            "Zip": 30286,
            "Lat": 32.888,
            "Lng": -84.327,
            "TYPE_NonProfit": 1,
            "TYPE_ForProfit": 0,
            "TYPE_urban": 0,
            "TYPE_rural": 1,
            "TIER_1_GRADE_Lown_Composite": "B",
            "BalanceGrowth": 85,
            "Transparency": 72,
            "FiscalHealth": 88,
            "Staffing": 79,
            "TaxBenefit": 92,
            "QualityOfCBS": 81,
            "StrategicUse": 75,
            "FinancialBurden": 58,
            "CharityCare": 95,
            "MedicalDebt": 52,
            "RangeOfServices": 78,
            "DemographicAlignment": 85,
            "WorkforceTraining": 90,
            "PayEquityRatio": 70
        },
        {
            "RECORD_ID": 110003,
            "Name": "Memorial Satilla Health",
            "State": "GA",
            "City": "Waycross",
            "Address": "1900 TEBEAU STREET",
            "Zip": 31501,
            "Lat": 31.214,
            "Lng": -82.355,
            "TYPE_NonProfit": 0,
            "TYPE_ForProfit": 1,
            "TYPE_urban": 0,
            "TYPE_rural": 1,
            "TIER_1_GRADE_Lown_Composite": "B",
            "BalanceGrowth": 82,
            "Transparency": 68,
            "FiscalHealth": 85,
            "Staffing": 76,
            "TaxBenefit": 87,
            "QualityOfCBS": 79,
            "StrategicUse": 72,
            "FinancialBurden": 62,
            "CharityCare": 88,
            "MedicalDebt": 55,
            "RangeOfServices": 82,
            "DemographicAlignment": 78,
            "WorkforceTraining": 85,
            "PayEquityRatio": 65
        },
        {
            "RECORD_ID": 110004,
            "Name": "Atlanta Urban Medical",
            "State": "GA",
            "City": "Atlanta",
            "Address": "123 PEACHTREE ST",
            "Zip": 30303,
            "Lat": 33.755,
            "Lng": -84.390,
            "TYPE_NonProfit": 1,
            "TYPE_ForProfit": 0,
            "TYPE_urban": 1,
            "TYPE_rural": 0,
            "TIER_1_GRADE_Lown_Composite": "A",
            "BalanceGrowth": 95,
            "Transparency": 88,
            "FiscalHealth": 92,
            "Staffing": 90,
            "TaxBenefit": 96,
            "QualityOfCBS": 91,
            "StrategicUse": 89,
            "FinancialBurden": 82,
            "CharityCare": 98,
            "MedicalDebt": 75,
            "RangeOfServices": 94,
            "DemographicAlignment": 90,
            "WorkforceTraining": 95,
            "PayEquityRatio": 85
        },
        {
            "RECORD_ID": 110005,
            "Name": "Metro For-Profit Hospital",
            "State": "GA",
            "City": "Atlanta",
            "Address": "456 METRO AVE",
            "Zip": 30305,
            "Lat": 33.830,
            "Lng": -84.382,
            "TYPE_NonProfit": 0,
            "TYPE_ForProfit": 1,
            "TYPE_urban": 1,
            "TYPE_rural": 0,
            "TIER_1_GRADE_Lown_Composite": "D",
            "BalanceGrowth": 45,
            "Transparency": 38,
            "FiscalHealth": 52,
            "Staffing": 42,
            "TaxBenefit": 35,
            "QualityOfCBS": 48,
            "StrategicUse": 40,
            "FinancialBurden": 25,
            "CharityCare": 55,
            "MedicalDebt": 20,
            "RangeOfServices": 60,
            "DemographicAlignment": 45,
            "WorkforceTraining": 58,
            "PayEquityRatio": 35
        }
    ];

    filteredHospitals = [...hospitalsData];
}

function initApplication() {
    // Display hospitals on main page
    displayHospitals(filteredHospitals);
    
    // Add event listeners
    setupEventListeners();
    
    // Check if we should show details page
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');
    if (hospitalId) {
        showDetailsPage(hospitalId);
    }
}

function setupEventListeners() {
    // Add toggle functionality to all dropdowns
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown-content').forEach(item => {
                item.classList.remove('show');
            });
            document.querySelectorAll('.dropdown-header').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open this dropdown if it wasn't active
            if (!isActive) {
                content.classList.add('show');
                this.classList.add('active');
            }
        });
    });

    // Add change event to hospital type checkboxes
    const hospitalTypeCheckboxes = document.querySelectorAll('input[name="hospitalType"]');
    hospitalTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // If "All" is checked, uncheck others
            if (this.value === '' && this.checked) {
                hospitalTypeCheckboxes.forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
            } 
            // If any other is checked, uncheck "All"
            else if (this.checked) {
                document.querySelector('input[name="hospitalType"][value=""]').checked = false;
            }
            
            // If nothing is checked, check "All"
            const anyChecked = Array.from(hospitalTypeCheckboxes).some(cb => cb.checked);
            if (!anyChecked) {
                document.querySelector('input[name="hospitalType"][value=""]').checked = true;
            }
        });
    });

    // Apply filters button
    document.getElementById('sidebarSearchBtn').addEventListener('click', function() {
        applyAllFilters();
    });

    // Location search button
    document.getElementById('locationSearchBtn').addEventListener('click', function() {
        searchByLocation();
    });

    // Reset filters button
    document.getElementById('sidebarResetBtn').addEventListener('click', function() {
        resetAllFilters();
    });

    // Download button
    document.getElementById('downloadBtn').addEventListener('click', function() {
        downloadResults();
    });

    // Add click event to details buttons
    document.getElementById('hospitalResults').addEventListener('click', function(e) {
        if (e.target.classList.contains('details-button')) {
            const hospitalId = e.target.getAttribute('data-id');
            
            if (e.target.textContent === 'View Full Details') {
                // Navigate to details page
                showDetailsPage(hospitalId);
            } else {
                // Toggle inline details
                const hospital = hospitalsData.find(h => h.RECORD_ID == hospitalId);
                const row = e.target.closest('tr');
                const detailsRow = row.nextElementSibling;
                
                // If this dropdown is already open, close it
                if (activeDropdown === detailsRow) {
                    detailsRow.style.display = 'none';
                    activeDropdown = null;
                    e.target.textContent = 'View Details';
                    return;
                }
                
                // Close any open dropdown
                if (activeDropdown) {
                    activeDropdown.style.display = 'none';
                    activeDropdown.previousElementSibling.querySelector('.details-button').textContent = 'View Details';
                }
                
                // If this row doesn't have a details row, create one
                if (!detailsRow || !detailsRow.classList.contains('hospital-details-dropdown')) {
                    const newRow = document.createElement('tr');
                    newRow.classList.add('hospital-details-dropdown');
                    newRow.innerHTML = `<td colspan="3"><div class="details-content"></div></td>`;
                    row.parentNode.insertBefore(newRow, row.nextSibling);
                    showHospitalDetailsInline(hospital, newRow.querySelector('.details-content'));
                    activeDropdown = newRow;
                } else {
                    detailsRow.style.display = 'table-row';
                    activeDropdown = detailsRow;
                }
                
                e.target.textContent = 'Hide Details';
            }
        }
    });
}

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function searchByLocation() {
    const zipCode = document.getElementById('zipCodeInput').value.trim();
    const radius = document.getElementById('radiusSelect').value;
    
    if (!zipCode || !radius) {
        showToast("Please enter a ZIP code and select a radius");
        return;
    }
    
    // Show loading indicator
    document.getElementById('resultsLoading').style.display = 'block';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // In a real application, you would geocode the ZIP code to get coordinates
        const centerLat = 33.7490;
        const centerLng = -84.3880;
        
        // Clear previous location circle
        if (window.locationCircle) {
            window.mainMap.removeLayer(window.locationCircle);
        }
        
        // Add circle to map showing search area
        window.locationCircle = L.circle([centerLat, centerLng], {
            color: '#6fb353',
            fillColor: '#6fb353',
            fillOpacity: 0.2,
            radius: radius * 1609.34 // Convert miles to meters
        }).addTo(window.mainMap);
        
        // Filter hospitals by proximity to the center point
        filteredHospitals = hospitalsData.filter(hospital => {
            // Calculate distance using simple Euclidean distance
            const latDiff = hospital.Lat - centerLat;
            const lngDiff = hospital.Lng - centerLng;
            const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Approx miles
            
            return distance <= radius;
        });
        
        displayHospitals(filteredHospitals);
        updateMapMarkers(filteredHospitals);
        
        // Center map on the search location
        window.mainMap.setView([centerLat, centerLng], 9);
        
        // Hide loading indicator
        document.getElementById('resultsLoading').style.display = 'none';
        
        showToast(`Found ${filteredHospitals.length} hospitals within ${radius} miles`);
    }, 800);
}

function applyAllFilters() {
    // Show loading indicator
    document.getElementById('resultsLoading').style.display = 'block';
    
    setTimeout(() => {
        // Get selected hospital types from checkboxes
        const typeCheckboxes = document.querySelectorAll('input[name="hospitalType"]:checked');
        const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);
        
        // If "All Hospital Types" is selected or no specific types are selected, show all
        const showAllTypes = selectedTypes.includes('') || selectedTypes.length === 0;
        
        // Get selected metrics from dropdowns
        const metricFilters = getSelectedMetrics();
        
        filteredHospitals = hospitalsData.filter(hospital => {
            // Type matching logic
            let typeMatch = showAllTypes;
            
            if (!showAllTypes) {
                typeMatch = selectedTypes.some(type => {
                    switch(type) {
                        case 'rural': return hospital.TYPE_rural === 1;
                        case 'urban': return hospital.TYPE_urban === 1;
                        case 'nonprofit': return hospital.TYPE_NonProfit === 1;
                        case 'forprofit': return hospital.TYPE_ForProfit === 1;
                        default: return false;
                    }
                });
            }
            
            // Apply metric filters if any are selected
            let metricMatch = true;
            if (metricFilters.length > 0) {
                // Check if hospital meets any of the selected metric criteria
                metricMatch = metricFilters.some(metric => {
                    // For demo purposes, we'll assume hospitals with scores above 70 meet the criteria
                    const metricValue = hospital[metric.id.replace('f', '')];
                    return metricValue !== undefined && metricValue > 70;
                });
            }
            
            return typeMatch && metricMatch;
        });

        displayHospitals(filteredHospitals);
        updateMapMarkers(filteredHospitals);
        
        // Hide loading indicator
        document.getElementById('resultsLoading').style.display = 'none';
        
        showToast(`Applied filters to ${filteredHospitals.length} hospitals`);
    }, 500);
}

function getSelectedMetrics() {
    const selectedMetrics = [];
    
    // Get all checked metric checkboxes
    const checkedBoxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    
    checkedBoxes.forEach(checkbox => {
        selectedMetrics.push({
            category: checkbox.getAttribute('data-category'),
            id: checkbox.id
        });
    });
    
    return selectedMetrics;
}

function resetAllFilters() {
    // Reset hospital type checkboxes
    document.querySelectorAll('input[name="hospitalType"]').forEach(cb => {
        cb.checked = false;
    });
    document.querySelector('input[name="hospitalType"][value=""]').checked = true;
    
    // Reset location search
    document.getElementById('zipCodeInput').value = '';
    document.getElementById('radiusSelect').value = '';
    
    // Remove location circle from map
    if (window.locationCircle) {
        window.mainMap.removeLayer(window.locationCircle);
        window.locationCircle = null;
    }
    
    // Reset metric checkboxes
    document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Close all dropdowns
    document.querySelectorAll('.dropdown-content').forEach(item => {
        item.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-header').forEach(item => {
        item.classList.remove('active');
    });
    
    // Reset to show all hospitals
    filteredHospitals = [...hospitalsData];
    displayHospitals(filteredHospitals);
    
    // Update map with all hospitals
    updateMapMarkers(filteredHospitals);
    
    // Reset map view
    window.mainMap.setView([32.6782, -83.2226], 7);
    
    showToast("All filters have been reset");
}

function downloadResults() {
    // Create CSV content
    let csvContent = "Name,City,Type,Grade\n";
    
    filteredHospitals.forEach(hospital => {
        const type = hospital.TYPE_NonProfit ? "Nonprofit" : "For Profit";
        const location = hospital.TYPE_urban ? "Urban" : "Rural";
        csvContent += `"${hospital.Name}",${hospital.City},${type} (${location}),${hospital.TIER_1_GRADE_Lown_Composite}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "georgia_hospitals_filtered.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    showToast("Download started");
}

function displayHospitals(hospitals) {
    const resultsContainer = document.getElementById('hospitalResults');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsCount.textContent = `Viewing ${hospitals.length} results`;
    
    let html = '';
    
    if (hospitals.length === 0) {
        html = `<tr><td colspan="3" style="text-align: center; padding: 30px;">No hospitals match your search criteria</td></tr>`;
    } else {
        hospitals.forEach((hospital) => {
            // Determine grade class for color coding
            const gradeClass = `grade-${hospital.TIER_1_GRADE_Lown_Composite}`;
            
            html += `
            <tr>
                <td><span class="grade-circle ${gradeClass}">${hospital.TIER_1_GRADE_Lown_Composite}</span></td>
                <td>
                    <a href="#" class="hospital-link" data-id="${hospital.RECORD_ID}">${hospital.Name}</a><br>
                    ${hospital.Address}, ${hospital.City}, ${hospital.State} ${hospital.Zip}
                </td>
                <td>
                    <button class="details-button" data-id="${hospital.RECORD_ID}">View Details</button>
                    <button class="details-button" data-id="${hospital.RECORD_ID}" style="background-color: #0053a1; margin-left: 5px;">View Full Details</button>
                </td>
            </tr>
            `;
        });
    }
    
    resultsContainer.innerHTML = html;
    
    // Add event listeners to hospital links and full details buttons
    document.querySelectorAll('.hospital-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const hospitalId = this.getAttribute('data-id');
            showDetailsPage(hospitalId);
        });
    });
    
    document.querySelectorAll('.details-button').forEach(button => {
        if (button.textContent === 'View Full Details') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const hospitalId = this.getAttribute('data-id');
                showDetailsPage(hospitalId);
            });
        }
    });
    
    // Clear any active dropdown when results change
    if (activeDropdown) {
        activeDropdown.style.display = 'none';
        activeDropdown = null;
    }
}

function showHospitalDetailsInline(hospital, container) {
    // Function to convert percentage to star rating (1-5 stars)
    function getStarRating(percentage) {
        const stars = Math.ceil(percentage / 20);
        return Math.max(1, Math.min(5, stars));
    }
    
    // Function to generate star HTML
    function generateStars(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<span class="star filled">★</span>';
            } else {
                starsHtml += '<span class="star">☆</span>';
            }
        }
        return starsHtml;
    }
    
    // Set hospital details
    container.innerHTML = `
    <div class="details-grid">
        <div class="details-section">
            <h4>Hospital Information</h4>
            <p><strong>Type:</strong> ${hospital.TYPE_NonProfit ? 'Nonprofit' : 'For Profit'}</p>
            <p><strong>Location:</strong> ${hospital.TYPE_urban ? 'Urban' : 'Rural'}</p>
        </div>
        <div class="details-section">
            <h4>Location Details</h4>
            <p><strong>Address:</strong> ${hospital.Address}</p>
            <p><strong>City:</strong> ${hospital.City}</p>
            <p><strong>State:</strong> ${hospital.State}</p>
            <p><strong>ZIP:</strong> ${hospital.Zip}</p>
        </div>
    </div>
    <div class="metric-bars">
        <h4>Performance Metrics</h4>
        <div class="star-rating">
            <div class="metric-name">Balance Growth</div>
            <div class="stars">${generateStars(getStarRating(hospital.BalanceGrowth))}</div>
            <div class="metric-value">${hospital.BalanceGrowth}%</div>
        </div>
        <div class="star-rating">
            <div class="metric-name">Transparency</div>
            <div class="stars">${generateStars(getStarRating(hospital.Transparency))}</div>
            <div class="metric-value">${hospital.Transparency}%</div>
        </div>
        <div class="star-rating">
            <div class="metric-name">Charity Care</div>
            <div class="stars">${generateStars(getStarRating(hospital.CharityCare))}</div>
            <div class="metric-value">${hospital.CharityCare}%</div>
        </div>
    </div>
    <div style="text-align: center; margin-top: 15px;">
        <button class="details-button" data-id="${hospital.RECORD_ID}" style="background-color: #0053a1;">View Full Details Page</button>
    </div>
    `;
    
    // Add event listener to the full details button
    container.querySelector('.details-button').addEventListener('click', function() {
        const hospitalId = this.getAttribute('data-id');
        showDetailsPage(hospitalId);
    });
}

// These functions will be implemented in details.js
function showDetailsPage(hospitalId) {
    // Implementation in details.js
}

function showMainPage() {
    // Implementation in details.js
}
