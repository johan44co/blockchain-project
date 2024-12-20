import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Explorer from '../../../src/frontend/explorer';

jest.mock('axios');

describe('Explorer', () => {
  it('renders blockchain explorer with fetched chain data', async () => {
    const mockChain = [
      {
        index: 0,
        timestamp: Date.now(),
        transactions: [],
        previousHash: '0',
        hash: 'hash0',
        merkleRoot: 'merkleRoot0'
      },
      {
        index: 1,
        timestamp: Date.now(),
        transactions: [
          { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } }
        ],
        previousHash: 'hash0',
        hash: 'hash1',
        merkleRoot: 'merkleRoot1'
      }
    ];

    axios.get.mockResolvedValue({ data: mockChain });

    render(<Explorer />);

    expect(await screen.findByText('Blockchain Explorer')).toBeInTheDocument();
    expect(await screen.findByText('Block 0')).toBeInTheDocument();
    expect(await screen.findByText('Block 1')).toBeInTheDocument();
    expect(await screen.findByText('ID: tx1')).toBeInTheDocument();
    expect(await screen.findByText('Data: {"from":"address1","to":"address2","amount":100}')).toBeInTheDocument();
  });

  it('handles error when fetching chain data', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching the blockchain'));

    render(<Explorer />);

    expect(await screen.findByText('Error fetching the blockchain')).toBeInTheDocument();
  });
});
