import request from 'supertest';
import express from 'express';
import { Ledger, Transaction } from '../../core/ledger';
import { ProofOfStake } from '../../core/consensus';
import { SmartContractVM } from '../../core/smartContracts';
import restAPI from '../../apis/rest';

const app = express();
app.use(express.json());
app.use('/', restAPI);

describe('REST API', () => {
  let ledger: Ledger;
  let pos: ProofOfStake;
  let vm: SmartContractVM;

  beforeEach(() => {
    ledger = new Ledger();
    pos = new ProofOfStake();
    vm = new SmartContractVM();
  });

  it('should get the blockchain state', async () => {
    const response = await request(app).get('/chain');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(ledger.getChain());
  });

  it('should add a transaction to the ledger', async () => {
    const transaction: Transaction = { id: 'tx1', data: { from: 'address1', to: 'address2', amount: 100 } };
    const response = await request(app).post('/transactions').send(transaction);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Transaction added to the ledger');
  });

  it('should add a validator', async () => {
    const validator = { address: 'address1', stake: 1000 };
    const response = await request(app).post('/validators').send(validator);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validator added');
  });

  it('should deploy a smart contract', async () => {
    const contract = { id: 'contract1', code: 'function(state, args) { /* contract code */ }' };
    const response = await request(app).post('/contracts/deploy').send(contract);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Contract deployed');
  });

  it('should execute a smart contract', async () => {
    const contract = { id: 'contract1', code: 'function(state, args) { return args[0] + args[1]; }' };
    await request(app).post('/contracts/deploy').send(contract);
    const execution = { id: 'contract1', method: 'someMethod', args: [1, 2] };
    const response = await request(app).post('/contracts/execute').send(execution);
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(3);
  });

  it('should get the state of a smart contract', async () => {
    const contract = { id: 'contract1', code: 'function(state, args) { state.value = args[0]; }' };
    await request(app).post('/contracts/deploy').send(contract);
    await request(app).post('/contracts/execute').send({ id: 'contract1', method: 'someMethod', args: [42] });
    const response = await request(app).get('/contracts/contract1/state');
    expect(response.status).toBe(200);
    expect(response.body.value).toBe(42);
  });
});
