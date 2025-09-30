// Details page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up back button event listeners
    const backToMainLinks = document.querySelectorAll('#back-to-main, #back-to-main-footer');
    backToMainLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof showMainPage === 'function') {
                showMainPage();
            }
        });
    });

    // Set up dropdown toggles for details page
    const detailsDropdownHeaders = document.querySelectorAll('#details-page .dropdown-header');
    detailsDropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Toggle this dropdown
            if (isActive) {
                content.style.display = 'none';
                this.classList.remove('active');
            } else {
                content.style.display = 'block';
                this.classList.add('active');
            }
        });
    });
    
    // Check if we're on the details page and need to load hospital data
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');
    if (hospitalId && document.getElementById('details-page').style.display !== 'none') {
        // If hospitalsData is already loaded, display the details
        if (window.hospitalsData && window.hospitalsData.length > 0) {
            const hospital = window.hospitalsData.find(h => h.RECORD_ID == hospitalId);
            if (hospital) {
                displayHospitalDetails(hospital);
            }
        } else {
            // Wait for hospitalsData to be available
            const checkData = setInterval(() => {
                if (window.hospitalsData && window.hospitalsData.length > 0) {
                    clearInterval(checkData);
                    const hospital = window.hospitalsData.find(h => h.RECORD_ID == hospitalId);
                    if (hospital) {
                        displayHospitalDetails(hospital);
                    }
                }
            }, 100);
        }
    }
});

function showMainPage() {
    const mainPage = document.getElementById('main-page');
    const detailsPage = document.getElementById('details-page');
    
    if (mainPage && detailsPage) {
        mainPage.style.display = 'block';
        detailsPage.style.display = 'none';
        
        // Update URL without page reload
        window.history.pushState({}, '', window.location.pathname);
    }
}

function showDetailsPage(hospitalId) {
    const mainPage = document.getElementById('main-page');
    const detailsPage = document.getElementById('details-page');
    
    if (mainPage && detailsPage) {
        mainPage.style.display = 'none';
        detailsPage.style.display = 'block';
        
        // Update URL without page reload
        window.history.pushState({}, '', `?id=${hospitalId}`);
        
        // Load and display hospital details
        if (window.hospitalsData) {
            const hospital = window.hospitalsData.find(h => h.RECORD_ID == hospitalId);
            if (hospital) {
                displayHospitalDetails(hospital);
            } else {
                document.getElementById('hospitalName').textContent = 'Hospital Not Found';
                document.getElementById('hospitalGrade').textContent = '?';
                document.getElementById('hospitalGrade').className = 'grade-circle';
            }
        }
    }
}

function displayHospitalDetails(hospital) {
    if (!hospital) return;
    
    // Update hospital header
    const hospitalNameElement = document.getElementById('hospitalName');
    const hospitalGradeElement = document.getElementById('hospitalGrade');
    
    if (hospitalNameElement) {
        hospitalNameElement.textContent = hospital.Name;
    }
    if (hospitalGradeElement) {
        hospitalGradeElement.textContent = hospital.TIER_1_GRADE_Lown_Composite;
        hospitalGradeElement.className = `grade-circle grade-${hospital.TIER_1_GRADE_Lown_Composite}`;
    }
    
    // Update hospital information
    const hospitalInfoElement = document.getElementById('hospitalInfo');
    if (hospitalInfoElement) {
        hospitalInfoElement.innerHTML = `
            <div class="info-item">
                <div class="info-label">Address</div>
                <div class="info-value">${hospital.Address}</div>
            </div>
            <div class="info-item">
                <div class="info-label">City</div>
                <div class="info-value">${hospital.City}</div>
            </div>
            <div class="info-item">
                <div class="info-label">State</div>
                <div class="info-value">${hospital.State}</div>
            </div>
            <div class="info-item">
                <div class="info-label">ZIP Code</div>
                <div class="info-value">${hospital.Zip}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Hospital Type</div>
                <div class="info-value">${hospital.TYPE_NonProfit ? 'Nonprofit' : 'For Profit'}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Location Type</div>
                <div class="info-value">${hospital.TYPE_urban ? 'Urban' : 'Rural'}</div>
            </div>
        `;
    }
    
    // Update all metric ratings
    updateMetricRating('BalanceGrowth', hospital.BalanceGrowth);
    updateMetricRating('Transparency', hospital.Transparency);
    updateMetricRating('FiscalHealth', hospital.FiscalHealth);
    updateMetricRating('Staffing', hospital.Staffing);
    updateMetricRating('TaxBenefit', hospital.TaxBenefit);
    updateMetricRating('QualityOfCBS', hospital.QualityOfCBS);
    updateMetricRating('StrategicUse', hospital.StrategicUse);
    updateMetricRating('FinancialBurden', hospital.FinancialBurden);
    updateMetricRating('CharityCare', hospital.CharityCare);
    updateMetricRating('MedicalDebt', hospital.MedicalDebt);
    updateMetricRating('RangeOfServices', hospital.RangeOfServices);
    updateMetricRating('DemographicAlignment', hospital.DemographicAlignment);
    updateMetricRating('WorkforceTraining', hospital.WorkforceTraining);
    updateMetricRating('PayEquityRatio', hospital.PayEquityRatio);
}

function updateMetricRating(metricName, value) {
    const starsElement = document.getElementById(`stars${metricName}`);
    const valueElement = document.getElementById(`value${metricName}`);
    
    if (starsElement && valueElement && typeof getStarRating === 'function' && typeof generateStars === 'function') {
        const rating = getStarRating(value);
        starsElement.innerHTML = generateStars(rating);
        valueElement.textContent = `${value}%`;
    }
}

// Make functions globally available
window.showDetailsPage = showDetailsPage;
window.showMainPage = showMainPage;
window.displayHospitalDetails = displayHospitalDetails;
