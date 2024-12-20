import { MultiCurrencyWallet } from '../../../src/wallets/multiCurrencySupport';

describe('MultiCurrencyWallet', () => {
  let wallet: MultiCurrencyWallet;

  beforeEach(() => {
    wallet = new MultiCurrencyWallet();
  });

  test('should add a new currency', () => {
    wallet.addCurrency('USD');
    expect(wallet.getSupportedCurrencies()).toContain('USD');
  });

  test('should deposit amount in a currency', () => {
    wallet.addCurrency('USD');
    wallet.deposit('USD', 100);
    expect(wallet.getBalance('USD')).toBe(100);
  });

  test('should withdraw amount from a currency', () => {
    wallet.addCurrency('USD');
    wallet.deposit('USD', 100);
    wallet.withdraw('USD', 50);
    expect(wallet.getBalance('USD')).toBe(50);
  });

  test('should throw error when depositing to unsupported currency', () => {
    expect(() => wallet.deposit('USD', 100)).toThrow('Currency USD not supported');
  });

  test('should throw error when withdrawing from unsupported currency', () => {
    expect(() => wallet.withdraw('USD', 50)).toThrow('Currency USD not supported');
  });

  test('should throw error when withdrawing more than balance', () => {
    wallet.addCurrency('USD');
    wallet.deposit('USD', 100);
    expect(() => wallet.withdraw('USD', 150)).toThrow('Insufficient balance for currency USD');
  });

  test('should return the correct balance for a currency', () => {
    wallet.addCurrency('USD');
    wallet.deposit('USD', 100);
    expect(wallet.getBalance('USD')).toBe(100);
  });

  test('should return the list of supported currencies', () => {
    wallet.addCurrency('USD');
    wallet.addCurrency('EUR');
    expect(wallet.getSupportedCurrencies()).toEqual(['USD', 'EUR']);
  });
});
