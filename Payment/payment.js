document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.getElementById("payment-form");

    function saveTransactions() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function loadTransactions() {
        return JSON.parse(localStorage.getItem("transactions")) || [];
    }

    let transactions = loadTransactions();

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const payee = document.getElementById("payee").value;
        const amount = parseFloat(document.getElementById("payment-amount").value);
        const method = document.getElementById("payment-method").value;
        const date = new Date().toISOString().split("T")[0];

        if (!isNaN(amount) && amount > 0) {
            transactions.push({ name: payee, amount: amount, type: "expense", category: method, date: date });
            saveTransactions();

            alert(`Payment of $${amount} to ${payee} via ${method} successful!`);
            paymentForm.reset();
        } else {
            alert("Please enter a valid amount.");
        }
    });
    
    const burgerMenu = document.getElementById("burger-menu");
    const headerNav = document.getElementById("header-nav");

    burgerMenu.addEventListener("click", function () {
        headerNav.classList.toggle("active");
    });


});
