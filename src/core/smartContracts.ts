import { createHash } from 'crypto';

interface SmartContract {
  id: string;
  code: string;
  state: any;
}

class SmartContractVM {
  private contracts: Map<string, SmartContract>;

  constructor() {
    this.contracts = new Map();
  }

  public deployContract(id: string, code: string): void {
    const contract: SmartContract = {
      id: id,
      code: code,
      state: {}
    };
    this.contracts.set(id, contract);
  }

  public executeContract(id: string, method: string, args: any[]): any {
    const contract = this.contracts.get(id);
    if (!contract) {
      throw new Error(`Contract with id ${id} not found`);
    }

    const contractFunction = new Function('state', 'args', contract.code);
    const result = contractFunction(contract.state, args);

    return result;
  }

  public getContractState(id: string): any {
    const contract = this.contracts.get(id);
    if (!contract) {
      throw new Error(`Contract with id ${id} not found`);
    }

    return contract.state;
  }
}

export { SmartContractVM, SmartContract };
