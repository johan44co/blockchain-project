import { createHash } from 'crypto';

interface Transaction {
  id: string;
  data: any;
}

interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  merkleRoot: string;
}

class Ledger {
  private chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  private createGenesisBlock(): Block {
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      hash: '',
      merkleRoot: ''
    };
    genesisBlock.hash = this.calculateHash(genesisBlock);
    return genesisBlock;
  }

  private calculateHash(block: Block): string {
    return createHash('sha256')
      .update(block.index + block.previousHash + block.timestamp + JSON.stringify(block.transactions) + block.merkleRoot)
      .digest('hex');
  }

  private calculateMerkleRoot(transactions: Transaction[]): string {
    if (transactions.length === 0) return '';
    if (transactions.length === 1) return this.calculateTransactionHash(transactions[0]);

    const newLevel: string[] = [];
    for (let i = 0; i < transactions.length; i += 2) {
      const left = this.calculateTransactionHash(transactions[i]);
      const right = i + 1 < transactions.length ? this.calculateTransactionHash(transactions[i + 1]) : left;
      newLevel.push(this.calculateHashFromHashes(left, right));
    }

    return this.calculateMerkleRoot(newLevel.map(hash => ({ id: hash, data: null })));
  }

  private calculateTransactionHash(transaction: Transaction): string {
    return createHash('sha256')
      .update(transaction.id + JSON.stringify(transaction.data))
      .digest('hex');
  }

  private calculateHashFromHashes(left: string, right: string): string {
    return createHash('sha256')
      .update(left + right)
      .digest('hex');
  }

  public addBlock(transactions: Transaction[]): void {
    const previousBlock = this.getLatestBlock();
    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      transactions: transactions,
      previousHash: previousBlock.hash,
      hash: '',
      merkleRoot: this.calculateMerkleRoot(transactions)
    };
    newBlock.hash = this.calculateHash(newBlock);
    this.chain.push(newBlock);
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public getChain(): Block[] {
    return this.chain;
  }
}

export { Ledger, Transaction, Block };
