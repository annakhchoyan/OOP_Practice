class Expense {
  #category;
  #amount;
  #description;
  #dateTime;

  constructor(category, amount, description, dateTime) {
    this.#category = category;
    this.#amount = amount;
    this.#description = description;
    this.#dateTime = dateTime;
  }

  get category() {
    return this.#category;
  }

  get amount() {
    return this.#amount;
  }

  get description() {
    return this.#description;
  }

  get dateTime() {
    return this.#dateTime;
  }
}

class ExpenseTracker {
  #expenses;
  #printSpendingReport;

  constructor() {
    this.#expenses = [];
  }

  get expenses() {
    return this.#expenses;
  }

  get printSpendingReport() {
    return this.#printSpendingReport;
  }

  addExpense(category, amount, description, dateTime) {
    const expense = new Expense(category, amount, description, dateTime);
    this.expenses.push(expense);
  }

  getExpenseSummariesByCategory() {
    const summaries = {};

    this.#expenses.forEach(expense => {
      const category = expense.category;
      if (!summaries[category]) {
        summaries[category] = 0;
      }
      summaries[category] += expense.amount;
    });

    return summaries;
  }

  generateMonthlySpendingReport() {
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    console.log('Monthly Spending Report:');
    this.printSpendingReport(oneMonthAgo, today);
  }

  printSpendingReport(startDate, endDate) {
    const filteredExpenses = this.#expenses.filter(
      expense => expense.dateTime >= startDate && expense.dateTime <= endDate
    );

    if (filteredExpenses.length === 0) {
      console.log('No expenses found in the specified time period.');
      return;
    }

    filteredExpenses.forEach(expense => {
      console.log(`Expense: ${expense.description}`);
      console.log(`Category: ${expense.category}`);
      console.log(`Amount: $${expense.amount}`);
      console.log(`Date/Time: ${expense.dateTime.toLocaleString()}`);
      console.log('---');
    });
  }
}

const expenseTracker = new ExpenseTracker();

const now = new Date();
expenseTracker.addExpense('Food', 15.99, 'Lunch', now);
expenseTracker.addExpense('Transportation', 10.5, 'Bus fare', now);
expenseTracker.addExpense('Shopping', 39.99, 'New shirt', now);
expenseTracker.addExpense('Food', 8.75, 'Coffee', now);

console.log('All Expenses:');
expenseTracker.expenses.forEach((expense, index) => {
  console.log(`Expense ${index + 1}:`);
  console.log(`Category: ${expense.category}`);
  console.log(`Amount: $${expense.amount}`);
  console.log(`Description: ${expense.description}`);
  console.log(`Date/Time: ${expense.dateTime.toLocaleString()}`);
  console.log('---');
});

console.log('Expense Summaries by Category:');

const summaries = expenseTracker.getExpenseSummariesByCategory();

Object.entries(summaries).forEach(([category, totalAmount]) => {
  console.log(`Category: ${category}`);
  console.log(`Total Amount: $${totalAmount}`);
  console.log('---');
});

expenseTracker.generateMonthlySpendingReport();

