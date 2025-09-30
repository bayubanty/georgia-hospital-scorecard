// Details page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up back button event listeners
    const backToMainLinks = document.querySelectorAll('#back-to-main, #back-to-main-footer');
    backToMainLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showMainPage();
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
});

function showMainPage() {
    const mainPage = document.getElementById('main-page');
    const detailsPage = document.getElementById('details-page');
    
    mainPage.style.display = 'block';
    detailsPage.style.display = 'none';
    
    // Update URL without page reload
    window.history.pushState({}, '', window.location.pathname);
}

function showDetailsPage(hospitalId) {
    const mainPage = document.getElementById('main-page');
    const detailsPage = document.getElementById('details-page');
    
    mainPage.style.display = 'none';
    detailsPage.style.display = 'block';
    
    // Update URL without page reload
    window.history.pushState({}, '', `?id=${hospitalId}`);
    
    // Load and display hospital details
    const hospital = window.hospitalsData.find(h => h.RECORD_ID == hospitalId);
    if (hospital) {
        displayHospitalDetails(hospital);
    } else {
        document.getElementById('hospitalName').textContent = 'Hospital Not Found';
        document.getElementById('hospitalGrade').textContent = '?';
        document.getElementById('hospitalGrade').className = 'grade-circle';
    }
}

function displayHospitalDetails(hospital) {
    // Update hospital header
    document.getElementById('hospitalName').textContent = hospital.Name;
    document.getElementById('hospitalGrade').textContent = hospital.TIER_1_GRADE_Lown_Composite;
    document.getElementById('hospitalGrade').className = `grade-circle grade-${hospital.TIER_1_GRADE_Lown_Composite}`;
    
    // Update hospital information
    document.getElementById('hospitalInfo').innerHTML = `
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
    
    if (starsElement && valueElement) {
        const rating = getStarRating(value);
        starsElement.innerHTML = generateStars(rating);
        valueElement.textContent = `${value}%`;
    }
}

function getStarRating(percentage) {
    const stars = Math.ceil(percentage / 20);
    return Math.max(1, Math.min(5, stars));
}

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
