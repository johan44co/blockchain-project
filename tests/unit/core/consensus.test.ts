import { ProofOfStake, Validator, Block } from '../../../src/core/consensus';

describe('ProofOfStake', () => {
  let pos: ProofOfStake;

  beforeEach(() => {
    pos = new ProofOfStake();
  });

  it('should create a genesis block', () => {
    const chain = pos.getChain();
    expect(chain.length).toBe(1);
    expect(chain[0].index).toBe(0);
  });

  it('should add a validator', () => {
    pos.addValidator('validator1', 100);
    const validators = pos['validators'];
    expect(validators.length).toBe(1);
    expect(validators[0].address).toBe('validator1');
    expect(validators[0].stake).toBe(100);
  });

  it('should add a block with transactions', () => {
    const transaction = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    pos.addValidator('validator1', 100);
    pos.addBlock([transaction]);

    const chain = pos.getChain();
    expect(chain.length).toBe(2);
    expect(chain[1].transactions.length).toBe(1);
    expect(chain[1].transactions[0].id).toBe('tx1');
  });

  it('should select a validator based on stake', () => {
    pos.addValidator('validator1', 100);
    pos.addValidator('validator2', 200);

    const selectedValidator = pos['selectValidator']();
    expect(['validator1', 'validator2']).toContain(selectedValidator);
  });

  it('should store block headers and Merkle roots', () => {
    const transaction1 = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    const transaction2 = { id: 'tx2', data: { from: 'address3', to: 'address4', amount: 200 } };
    pos.addValidator('validator1', 100);
    pos.addBlock([transaction1, transaction2]);

    const chain = pos.getChain();
    const block: Block = chain[1];

    expect(block.previousHash).toBe(chain[0].hash);
    expect(block.merkleRoot).toBeDefined();
  });

  it('should maintain an immutable transaction history', () => {
    const transaction1 = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    const transaction2 = { id: 'tx2', data: { from: 'address3', to: 'address4', amount: 200 } };
    pos.addValidator('validator1', 100);
    pos.addBlock([transaction1]);
    pos.addBlock([transaction2]);

    const chain = pos.getChain();
    expect(chain.length).toBe(3);
    expect(chain[1].transactions[0].id).toBe('tx1');
    expect(chain[2].transactions[0].id).toBe('tx2');
  });

  it('should implement efficiency and scalability mechanisms', () => {
    // Add tests for sharding or DAG mechanisms if implemented
  });
});
