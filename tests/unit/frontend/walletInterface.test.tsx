import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WalletInterface from '../../../src/frontend/walletInterface';

describe('WalletInterface', () => {
  it('renders wallet interface with initial state', () => {
    render(<WalletInterface />);
    expect(screen.getByText('Wallet Interface')).toBeInTheDocument();
  });

  it('adds a currency to the wallet', () => {
    render(<WalletInterface />);
    fireEvent.change(screen.getByPlaceholderText('Currency'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Add Currency'));
    expect(screen.getByText('Currency BTC added.')).toBeInTheDocument();
  });

  it('deposits an amount to the wallet', () => {
    render(<WalletInterface />);
    fireEvent.change(screen.getByPlaceholderText('Currency'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Add Currency'));
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: 100 } });
    fireEvent.click(screen.getByText('Deposit'));
    expect(screen.getByText('Deposited 100 BTC.')).toBeInTheDocument();
  });

  it('withdraws an amount from the wallet', () => {
    render(<WalletInterface />);
    fireEvent.change(screen.getByPlaceholderText('Currency'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Add Currency'));
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: 100 } });
    fireEvent.click(screen.getByText('Deposit'));
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: 50 } });
    fireEvent.click(screen.getByText('Withdraw'));
    expect(screen.getByText('Withdrew 50 BTC.')).toBeInTheDocument();
  });

  it('encrypts a message', () => {
    render(<WalletInterface />);
    fireEvent.change(screen.getByPlaceholderText('Currency'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Add Currency'));
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: 100 } });
    fireEvent.click(screen.getByText('Deposit'));
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: 50 } });
    fireEvent.click(screen.getByText('Withdraw'));
    fireEvent.click(screen.getByText('Encrypt Message'));
    expect(screen.getByText(/Encrypted message:/)).toBeInTheDocument();
  });

  it('decrypts a message', () => {
    render(<WalletInterface />);
    fireEvent.change(screen.getByPlaceholderText('Currency'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Add Currency'));
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: 100 } });
    fireEvent.click(screen.getByText('Deposit'));
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: 50 } });
    fireEvent.click(screen.getByText('Withdraw'));
    fireEvent.click(screen.getByText('Encrypt Message'));
    fireEvent.click(screen.getByText('Decrypt Message'));
    expect(screen.getByText(/Decrypted message:/)).toBeInTheDocument();
  });
});
