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
    
    // Make hospitalsData globally available
    window.hospitalsData = hospitalsData;
    window.filteredHospitals = filteredHospitals;
}

function initApplication() {
    // Display hospitals on main page
    displayHospitals(filteredHospitals);
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize map
    if (typeof initMainMap === 'function') {
        initMainMap();
    }
    
    // Check if we should show details page
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');
    if (hospitalId) {
        showDetailsPage(hospitalId);
    }
}

// ... rest of the functions remain the same until the end ...

// Make these functions globally available
window.showDetailsPage = showDetailsPage;
window.showMainPage = showMainPage;
window.displayHospitals = displayHospitals;
window.updateMapMarkers = updateMapMarkers;

// Helper functions for star ratings (make them available globally)
window.getStarRating = function(percentage) {
    const stars = Math.ceil(percentage / 20);
    return Math.max(1, Math.min(5, stars));
};

window.generateStars = function(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span class="star filled">★</span>';
        } else {
            starsHtml += '<span class="star">☆</span>';
        }
    }
    return starsHtml;
};
