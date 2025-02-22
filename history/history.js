document.addEventListener("DOMContentLoaded", function () {
    const transactionHistory = document.getElementById("transaction-history");
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function renderTransaction(item) {
        const transactionDiv = document.createElement("div");
        transactionDiv.classList.add("transaction-item", item.type);
        transactionDiv.innerHTML = `
            <p><strong>${item.name}</strong> ${item.category ? "- " + item.category : ""}</p>
            <p>${item.date} | <span class="${item.type === "income" ? "income-text" : "expense-text"}">
                ${item.type === "income" ? "+$" : "-$"}${item.amount}
            </span></p>
        `;
        transactionHistory.appendChild(transactionDiv);
    }

    transactions.forEach(renderTransaction);

    // Chart.js - Expense & Income Summary
    const incomeData = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const expenseData = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const ctx = document.getElementById("chartCanvas").getContext("2d");

    new Chart(ctx, {
        type: "doughnut",  // Changed to Doughnut for better visualization
        data: {
            labels: ["Income", "Expenses"],
            datasets: [{
                data: [incomeData, expenseData],
                backgroundColor: ["#00b894", "#d63031"],
                hoverBackgroundColor: ["#008060", "#a62424"],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const burgerMenu = document.getElementById("burger-menu");
    const headerNav = document.getElementById("header-nav");

    burgerMenu.addEventListener("click", function () {
        headerNav.classList.toggle("active");
    });

});
