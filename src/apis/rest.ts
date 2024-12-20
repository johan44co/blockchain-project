import express from 'express';
import { Ledger, Transaction } from '../core/ledger';
import { ProofOfStake } from '../core/consensus';
import { SmartContractVM } from '../core/smartContracts';

const app = express();
app.use(express.json());

const ledger = new Ledger();
const pos = new ProofOfStake();
const vm = new SmartContractVM();

app.get('/chain', (req, res) => {
  res.json(ledger.getChain());
});

app.post('/transactions', (req, res) => {
  const transaction: Transaction = req.body;
  ledger.addBlock([transaction]);
  res.json({ message: 'Transaction added to the ledger' });
});

app.post('/validators', (req, res) => {
  const { address, stake } = req.body;
  pos.addValidator(address, stake);
  res.json({ message: 'Validator added' });
});

app.post('/contracts/deploy', (req, res) => {
  const { id, code } = req.body;
  vm.deployContract(id, code);
  res.json({ message: 'Contract deployed' });
});

app.post('/contracts/execute', (req, res) => {
  const { id, method, args } = req.body;
  const result = vm.executeContract(id, method, args);
  res.json({ result });
});

app.get('/contracts/:id/state', (req, res) => {
  const { id } = req.params;
  const state = vm.getContractState(id);
  res.json(state);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
