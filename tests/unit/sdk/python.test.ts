import BlockchainSDK from '../../../src/sdk/python';

describe('BlockchainSDK', () => {
  let sdk: BlockchainSDK;

  beforeAll(() => {
    sdk = new BlockchainSDK('http://localhost:3000');
  });

  it('should get the blockchain state', async () => {
    const chain = await sdk.getChain();
    expect(chain).toBeDefined();
    expect(Array.isArray(chain)).toBe(true);
  });

  it('should add a transaction to the ledger', async () => {
    const transaction = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    const response = await sdk.addTransaction(transaction);
    expect(response.message).toBe('Transaction added to the ledger');
  });

  it('should add a validator', async () => {
    const response = await sdk.addValidator('address1', 1000);
    expect(response.message).toBe('Validator added');
  });

  it('should deploy a smart contract', async () => {
    const contract = { id: 'contract1', code: 'function(state, args) { /* contract code */ }' };
    const response = await sdk.deployContract(contract.id, contract.code);
    expect(response.message).toBe('Contract deployed');
  });

  it('should execute a smart contract', async () => {
    const contract = { id: 'contract1', code: 'function(state, args) { return args[0] + args[1]; }' };
    await sdk.deployContract(contract.id, contract.code);
    const response = await sdk.executeContract(contract.id, 'someMethod', [1, 2]);
    expect(response.result).toBe(3);
  });

  it('should get the state of a smart contract', async () => {
    const contract = { id: 'contract1', code: 'function(state, args) { state.value = args[0]; }' };
    await sdk.deployContract(contract.id, contract.code);
    await sdk.executeContract(contract.id, 'someMethod', [42]);
    const state = await sdk.getContractState(contract.id);
    expect(state.value).toBe(42);
  });
});
