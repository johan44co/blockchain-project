import { SmartContractVM } from '../../../src/core/smartContracts';

describe('SmartContractVM', () => {
  let vm: SmartContractVM;

  beforeEach(() => {
    vm = new SmartContractVM();
  });

  it('should deploy a smart contract', () => {
    const contractId = 'contract1';
    const contractCode = 'function(state, args) { state.value = args[0]; return state.value; }';
    vm.deployContract(contractId, contractCode);

    const state = vm.getContractState(contractId);
    expect(state).toEqual({});
  });

  it('should execute a smart contract method', () => {
    const contractId = 'contract1';
    const contractCode = 'function(state, args) { state.value = args[0]; return state.value; }';
    vm.deployContract(contractId, contractCode);

    const result = vm.executeContract(contractId, 'someMethod', [42]);
    expect(result).toBe(42);

    const state = vm.getContractState(contractId);
    expect(state.value).toBe(42);
  });

  it('should throw an error if contract not found', () => {
    expect(() => {
      vm.executeContract('nonexistent', 'someMethod', []);
    }).toThrowError('Contract with id nonexistent not found');
  });

  it('should maintain the state of the contract', () => {
    const contractId = 'contract1';
    const contractCode = 'function(state, args) { state.value = args[0]; return state.value; }';
    vm.deployContract(contractId, contractCode);

    vm.executeContract(contractId, 'someMethod', [42]);
    vm.executeContract(contractId, 'someMethod', [84]);

    const state = vm.getContractState(contractId);
    expect(state.value).toBe(84);
  });
});
