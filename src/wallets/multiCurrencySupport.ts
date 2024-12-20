class MultiCurrencyWallet {
  private balances: Map<string, number>;

  constructor() {
    this.balances = new Map();
  }

  public addCurrency(currency: string): void {
    if (!this.balances.has(currency)) {
      this.balances.set(currency, 0);
    }
  }

  public deposit(currency: string, amount: number): void {
    if (!this.balances.has(currency)) {
      throw new Error(`Currency ${currency} not supported`);
    }
    const currentBalance = this.balances.get(currency) || 0;
    this.balances.set(currency, currentBalance + amount);
  }

  public withdraw(currency: string, amount: number): void {
    if (!this.balances.has(currency)) {
      throw new Error(`Currency ${currency} not supported`);
    }
    const currentBalance = this.balances.get(currency) || 0;
    if (currentBalance < amount) {
      throw new Error(`Insufficient balance for currency ${currency}`);
    }
    this.balances.set(currency, currentBalance - amount);
  }

  public getBalance(currency: string): number {
    if (!this.balances.has(currency)) {
      throw new Error(`Currency ${currency} not supported`);
    }
    return this.balances.get(currency) || 0;
  }

  public getSupportedCurrencies(): string[] {
    return Array.from(this.balances.keys());
  }
}

export { MultiCurrencyWallet };
