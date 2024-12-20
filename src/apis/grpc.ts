import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
import { Ledger, Transaction } from '../core/ledger';
import { ProofOfStake } from '../core/consensus';
import { SmartContractVM } from '../core/smartContracts';

const PROTO_PATH = __dirname + '/blockchain.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const blockchainProto = grpc.loadPackageDefinition(packageDefinition).blockchain;

const ledger = new Ledger();
const pos = new ProofOfStake();
const vm = new SmartContractVM();

function getChain(call, callback) {
  callback(null, { chain: ledger.getChain() });
}

function addTransaction(call, callback) {
  const transaction: Transaction = call.request;
  ledger.addBlock([transaction]);
  callback(null, { message: 'Transaction added to the ledger' });
}

function addValidator(call, callback) {
  const { address, stake } = call.request;
  pos.addValidator(address, stake);
  callback(null, { message: 'Validator added' });
}

function deployContract(call, callback) {
  const { id, code } = call.request;
  vm.deployContract(id, code);
  callback(null, { message: 'Contract deployed' });
}

function executeContract(call, callback) {
  const { id, method, args } = call.request;
  const result = vm.executeContract(id, method, args);
  callback(null, { result });
}

function getContractState(call, callback) {
  const { id } = call.request;
  const state = vm.getContractState(id);
  callback(null, state);
}

function main() {
  const server = new grpc.Server();
  server.addService(blockchainProto.Blockchain.service, {
    getChain: getChain,
    addTransaction: addTransaction,
    addValidator: addValidator,
    deployContract: deployContract,
    executeContract: executeContract,
    getContractState: getContractState
  });
  const PORT = process.env.PORT || '50051';
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
  console.log(`Server running on port ${PORT}`);
  server.start();
}

main();
