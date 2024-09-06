document.getElementById('converter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('result');

    if (!amount || amount <= 0) {
        resultDiv.innerHTML = `<p class="error">Please enter a valid amount.</p>`;
        return;
    }

    // Show loading state with Materialize preloader
    resultDiv.innerHTML = '<div class="preloader-wrapper small active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';

    // Your API key from ExchangeRate-API
    const apiKey = '3336c027febb10200c973b39';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === "error") {
                resultDiv.innerHTML = `<p class="error">Error: ${data['error-type']}</p>`;
                return;
            }

            const exchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);

            resultDiv.innerHTML = `
                <p>${amount} ${fromCurrency} = <strong>${convertedAmount} ${toCurrency}</strong></p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error">Something went wrong. Please try again later.</p>`;
        });
});
