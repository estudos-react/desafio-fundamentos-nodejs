import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.calculateIncome();

    const outcome = this.calculateOutcome();

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public calculateIncome(): number {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, { value }: { value: number }) => sum + value, 0);

    return income;
  }

  public calculateOutcome(): number {
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, { value }: { value: number }) => sum + value, 0);

    return outcome;
  }

  public calculateCashValue(): number {
    const income = this.calculateIncome();
    const outcome = this.calculateOutcome();

    return income - outcome;
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
