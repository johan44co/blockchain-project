import { Ledger, Transaction, Block } from '../../../src/core/ledger';

describe('Ledger', () => {
  let ledger: Ledger;

  beforeEach(() => {
    ledger = new Ledger();
  });

  it('should create a genesis block', () => {
    const chain = ledger.getChain();
    expect(chain.length).toBe(1);
    expect(chain[0].index).toBe(0);
  });

  it('should add a block with transactions', () => {
    const transaction: Transaction = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    ledger.addBlock([transaction]);

    const chain = ledger.getChain();
    expect(chain.length).toBe(2);
    expect(chain[1].transactions.length).toBe(1);
    expect(chain[1].transactions[0].id).toBe('tx1');
  });

  it('should store block headers and Merkle roots', () => {
    const transaction1: Transaction = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    const transaction2: Transaction = { id: 'tx2', data: { from: 'address3', to: 'address4', amount: 200 } };
    ledger.addBlock([transaction1, transaction2]);

    const chain = ledger.getChain();
    const block: Block = chain[1];

    expect(block.previousHash).toBe(chain[0].hash);
    expect(block.merkleRoot).toBeDefined();
  });

  it('should maintain an immutable transaction history', () => {
    const transaction1: Transaction = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    const transaction2: Transaction = { id: 'tx2', data: { from: 'address3', to: 'address4', amount: 200 } };
    ledger.addBlock([transaction1]);
    ledger.addBlock([transaction2]);

    const chain = ledger.getChain();
    expect(chain.length).toBe(3);
    expect(chain[1].transactions[0].id).toBe('tx1');
    expect(chain[2].transactions[0].id).toBe('tx2');
  });
});
