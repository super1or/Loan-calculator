// Listener for submit
document.querySelector('#loan-form').addEventListener('submit', calculateResults);

// Cacl Res

function calculateResults(e) {
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
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(0);
        totalPayment.value = (monthly*calculatedPayments).toFixed(0);
        totalInterest.value = ((monthly*calculatedInterest)-principal).toFixed(0);
    } else {
        console.log('Please, check your numbers');
    }

    e.preventDefault();
}