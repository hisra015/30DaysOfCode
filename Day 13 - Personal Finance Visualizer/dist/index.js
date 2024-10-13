var _a;
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// Variables to store chart instances with specific types
let expenseChart = null;
let incomeVsExpenseChart = null;
(_a = document.getElementById("financeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
    e.preventDefault();
    const incomeInput = document.getElementById("income").value;
    const expensesInput = document.getElementById("expenses").value;
    const income = parseFloat(incomeInput);
    const expenses = expensesInput.split(",").map((expense) => {
        const [category, amount] = expense.split("=");
        return { category, amount: parseFloat(amount) };
    });
    renderCharts(income, expenses);
});
export function renderCharts(income, expenses) {
    const ctx1 = document.getElementById("expenseChart");
    const ctx2 = document.getElementById("incomeVsExpenseChart");
    const expenseLabels = expenses.map((expense) => expense.category);
    const expenseData = expenses.map((expense) => expense.amount);
    const totalExpenses = expenseData.reduce((a, b) => a + b, 0);
    // Destroy existing charts if they exist
    if (expenseChart) {
        expenseChart.destroy();
    }
    if (incomeVsExpenseChart) {
        incomeVsExpenseChart.destroy();
    }
    // Create new Pie chart for expenses breakdown with explicit types
    expenseChart = new Chart(ctx1, {
        type: "pie",
        data: {
            labels: expenseLabels,
            datasets: [
                {
                    data: expenseData,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                    ],
                },
            ],
        },
    });
    // Create new Line chart for income vs expenses with explicit types
    incomeVsExpenseChart = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                    label: 'Income vs Expenses',
                    data: [income, totalExpenses],
                    borderColor: '#36A2EB',
                    fill: false,
                }],
        },
    });
}
