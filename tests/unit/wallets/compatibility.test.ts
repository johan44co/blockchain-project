import { WalletCompatibility } from '../../../src/wallets/compatibility';

describe('WalletCompatibility', () => {
  let compatibility: WalletCompatibility;

  beforeEach(() => {
    compatibility = new WalletCompatibility();
  });

  test('should add a hardware wallet', () => {
    compatibility.addHardwareWallet('Ledger Nano S');
    expect(compatibility.getHardwareWallets()).toContain('Ledger Nano S');
  });

  test('should add a mobile app', () => {
    compatibility.addMobileApp('Trust Wallet');
    expect(compatibility.getMobileApps()).toContain('Trust Wallet');
  });

  test('should not add duplicate hardware wallets', () => {
    compatibility.addHardwareWallet('Ledger Nano S');
    compatibility.addHardwareWallet('Ledger Nano S');
    expect(compatibility.getHardwareWallets().length).toBe(1);
  });

  test('should not add duplicate mobile apps', () => {
    compatibility.addMobileApp('Trust Wallet');
    compatibility.addMobileApp('Trust Wallet');
    expect(compatibility.getMobileApps().length).toBe(1);
  });

  test('should return the list of hardware wallets', () => {
    compatibility.addHardwareWallet('Ledger Nano S');
    compatibility.addHardwareWallet('Trezor Model T');
    expect(compatibility.getHardwareWallets()).toEqual(['Ledger Nano S', 'Trezor Model T']);
  });

  test('should return the list of mobile apps', () => {
    compatibility.addMobileApp('Trust Wallet');
    compatibility.addMobileApp('MetaMask');
    expect(compatibility.getMobileApps()).toEqual(['Trust Wallet', 'MetaMask']);
  });
});
