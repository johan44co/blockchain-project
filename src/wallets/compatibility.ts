class WalletCompatibility {
  private hardwareWallets: string[];
  private mobileApps: string[];

  constructor() {
    this.hardwareWallets = [];
    this.mobileApps = [];
  }

  public addHardwareWallet(wallet: string): void {
    if (!this.hardwareWallets.includes(wallet)) {
      this.hardwareWallets.push(wallet);
    }
  }

  public addMobileApp(app: string): void {
    if (!this.mobileApps.includes(app)) {
      this.mobileApps.push(app);
    }
  }

  public getHardwareWallets(): string[] {
    return this.hardwareWallets;
  }

  public getMobileApps(): string[] {
    return this.mobileApps;
  }
}

export { WalletCompatibility };
