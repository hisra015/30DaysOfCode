import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Variables to store chart instances with specific types
let expenseChart: Chart<'pie', number[], string> | null = null;
let incomeVsExpenseChart: Chart<'line', number[], string> | null = null;

document.getElementById("financeForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const incomeInput = (document.getElementById("income") as HTMLInputElement).value;
  const expensesInput = (document.getElementById("expenses") as HTMLInputElement).value;

  const income = parseFloat(incomeInput);
  const expenses = expensesInput.split(",").map((expense) => {
    const [category, amount] = expense.split("=");
    return { category, amount: parseFloat(amount) };
  });

  renderCharts(income, expenses);
});

export function renderCharts(income: number, expenses: { category: string, amount: number }[]) {
  const ctx1 = document.getElementById("expenseChart") as HTMLCanvasElement;
  const ctx2 = document.getElementById("incomeVsExpenseChart") as HTMLCanvasElement;

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
  expenseChart = new Chart<'pie', number[], string>(ctx1, {
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
  incomeVsExpenseChart = new Chart<'line', number[], string>(ctx2, {
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
