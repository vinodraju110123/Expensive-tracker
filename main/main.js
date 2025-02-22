document.addEventListener("DOMContentLoaded", function () {
    const expenseModal = document.getElementById("expense-modal");
    const incomeModal = document.getElementById("income-modal");
    const addExpenseBtn = document.getElementById("new-expense-btn");
    const addIncomeBtn = document.getElementById("new-income-btn");
    const closeExpenseBtn = document.getElementById("close-modal-btn");
    const closeIncomeBtn = document.getElementById("close-income-modal-btn");

    const transactionHistory = document.getElementById("transaction-history");
    const burgerMenu = document.getElementById("burger-menu");
    const headerNav = document.getElementById("header-nav");

    function saveTransactions() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function loadTransactions() {
        const savedTransactions = localStorage.getItem("transactions");
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    }

    let transactions = loadTransactions();
    let totalIncome = transactions.filter(tx => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
    let totalExpenses = transactions.filter(tx => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);

    function updateBalance() {
        document.getElementById("expenses-inc").innerHTML = `<span>$</span> ${totalIncome}`;
        document.getElementById("expenses-exp").innerHTML = `<span>$</span> ${totalExpenses}`;
        let netBalance = totalIncome - totalExpenses;
        document.getElementById("expenses-bal").innerHTML = `<span>$</span> ${netBalance}`;

        // Alert if net balance is negative
        if (netBalance < 0) {
            alert("Warning! Your net balance is negative.");
        }
    }

    function renderTransactionHistory() {
        transactionHistory.innerHTML = "";
        transactions.forEach(tx => {
            const transactionItem = document.createElement("div");
            transactionItem.classList.add("transaction-item", tx.type);
            transactionItem.innerHTML = `
                <p><strong>${tx.name}</strong> - ${tx.type === "income" ? "Income" : tx.category}</p>
                <p>${tx.date} | <span class="${tx.type}-text">${tx.type === "income" ? "+$" : "-$"}${tx.amount}</span></p>
            `;
            transactionHistory.appendChild(transactionItem);
        });
    }

    if (addExpenseBtn && expenseModal) {
        addExpenseBtn.addEventListener("click", () => expenseModal.classList.add("show"));
    }
    if (addIncomeBtn && incomeModal) {
        addIncomeBtn.addEventListener("click", () => incomeModal.classList.add("show"));
    }
    if (closeExpenseBtn && expenseModal) {
        closeExpenseBtn.addEventListener("click", () => expenseModal.classList.remove("show"));
    }
    if (closeIncomeBtn && incomeModal) {
        closeIncomeBtn.addEventListener("click", () => incomeModal.classList.remove("show"));
    }

    window.addEventListener("click", function (event) {
        if (event.target === expenseModal) expenseModal.classList.remove("show");
        if (event.target === incomeModal) incomeModal.classList.remove("show");
    });

    const incomeForm = document.getElementById("income-form");
    if (incomeForm) {
        incomeForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const incomeSource = document.getElementById("income-source").value;
            const incomeAmount = parseFloat(document.getElementById("income-amount").value);
            const incomeDate = document.getElementById("income-date").value;

            if (!isNaN(incomeAmount) && incomeAmount > 0) {
                totalIncome += incomeAmount;
                transactions.push({ name: incomeSource, amount: incomeAmount, type: "income", date: incomeDate });
                saveTransactions();

                updateBalance();
                renderTransactionHistory();

                // Show success alert
                alert("Income added successfully!");
            }

            incomeForm.reset();
            incomeModal.classList.remove("show");
        });
    }

    const expenseForm = document.getElementById("expense-form");
    if (expenseForm) {
        expenseForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const expenseName = document.getElementById("expense-name").value;
            const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
            const expenseCategory = document.getElementById("expense-category").value;
            const expenseDate = document.getElementById("expense-date").value;

            if (!isNaN(expenseAmount) && expenseAmount > 0) {
                totalExpenses += expenseAmount;
                transactions.push({ name: expenseName, amount: expenseAmount, type: "expense", category: expenseCategory, date: expenseDate });
                saveTransactions();

                updateBalance();
                renderTransactionHistory();
            }

            expenseForm.reset();
            expenseModal.classList.remove("show");
        });
    }

    let userName = document.getElementById("user1");
    let user = JSON.parse(localStorage.getItem("user"));
    if (userName && user) {
        userName.innerHTML = `HEY HI! ${user.username}`;
    }

    if (burgerMenu && headerNav) {
        burgerMenu.addEventListener("click", () => {
            headerNav.classList.toggle("active");
        });
    }

    renderTransactionHistory();
    updateBalance();
});
