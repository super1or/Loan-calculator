// Listener for submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loader').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results

function calculateResults() {
    // UI variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show results
        document.getElementById('results').style.display = 'block';
        // Hide loader
        document.getElementById('loader').style.display = 'none';
    } else {
        showError('Please check your numbers input');
    }
}

// Display Error
function showError(error) {
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loader').style.display = 'none';

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add a div
    const errorDiv = document.createElement('div');
    // Add a class
    errorDiv.className = 'alert alert-danger';
    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error above heading
    card.insertBefore(errorDiv, heading);
    // Clear error after awhile
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}