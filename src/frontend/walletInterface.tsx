import React, { useState } from 'react';
import { MultiCurrencyWallet } from '../wallets/multiCurrencySupport';
import { Encryption } from '../wallets/encryption';
import { WalletCompatibility } from '../wallets/compatibility';

const WalletInterface: React.FC = () => {
  const [wallet] = useState(new MultiCurrencyWallet());
  const [encryption] = useState(new Encryption());
  const [compatibility] = useState(new WalletCompatibility());
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleAddCurrency = () => {
    try {
      wallet.addCurrency(currency);
      setMessage(`Currency ${currency} added.`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeposit = () => {
    try {
      wallet.deposit(currency, amount);
      setMessage(`Deposited ${amount} ${currency}.`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleWithdraw = () => {
    try {
      wallet.withdraw(currency, amount);
      setMessage(`Withdrew ${amount} ${currency}.`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleEncrypt = () => {
    const encryptedMessage = encryption.encrypt(message);
    setMessage(`Encrypted message: ${encryptedMessage}`);
  };

  const handleDecrypt = () => {
    const decryptedMessage = encryption.decrypt(message);
    setMessage(`Decrypted message: ${decryptedMessage}`);
  };

  return (
    <div>
      <h1>Wallet Interface</h1>
      <div>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="Currency"
        />
        <button onClick={handleAddCurrency}>Add Currency</button>
      </div>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div>
        <button onClick={handleEncrypt}>Encrypt Message</button>
        <button onClick={handleDecrypt}>Decrypt Message</button>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default WalletInterface;
