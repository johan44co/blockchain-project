import axios from 'axios';

class BlockchainSDK {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getChain() {
    const response = await this.client.get('/chain');
    return response.data;
  }

  async addTransaction(transaction) {
    const response = await this.client.post('/transactions', transaction);
    return response.data;
  }

  async addValidator(address, stake) {
    const response = await this.client.post('/validators', { address, stake });
    return response.data;
  }

  async deployContract(id, code) {
    const response = await this.client.post('/contracts/deploy', { id, code });
    return response.data;
  }

  async executeContract(id, method, args) {
    const response = await this.client.post('/contracts/execute', { id, method, args });
    return response.data;
  }

  async getContractState(id) {
    const response = await this.client.get(`/contracts/${id}/state`);
    return response.data;
  }
}

export default BlockchainSDK;
