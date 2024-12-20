import { createHash } from 'crypto';

interface Validator {
  address: string;
  stake: number;
}

interface Block {
  index: number;
  timestamp: number;
  transactions: any[];
  previousHash: string;
  hash: string;
  merkleRoot: string;
  validator: string;
}

class ProofOfStake {
  private chain: Block[];
  private validators: Validator[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.validators = [];
  }

  private createGenesisBlock(): Block {
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      hash: '',
      merkleRoot: '',
      validator: ''
    };
    genesisBlock.hash = this.calculateHash(genesisBlock);
    return genesisBlock;
  }

  private calculateHash(block: Block): string {
    return createHash('sha256')
      .update(block.index + block.previousHash + block.timestamp + JSON.stringify(block.transactions) + block.merkleRoot + block.validator)
      .digest('hex');
  }

  private calculateMerkleRoot(transactions: any[]): string {
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

  private calculateTransactionHash(transaction: any): string {
    return createHash('sha256')
      .update(transaction.id + JSON.stringify(transaction.data))
      .digest('hex');
  }

  private calculateHashFromHashes(left: string, right: string): string {
    return createHash('sha256')
      .update(left + right)
      .digest('hex');
  }

  public addValidator(address: string, stake: number): void {
    this.validators.push({ address, stake });
  }

  private selectValidator(): string {
    const totalStake = this.validators.reduce((acc, validator) => acc + validator.stake, 0);
    const random = Math.random() * totalStake;
    let cumulativeStake = 0;

    for (const validator of this.validators) {
      cumulativeStake += validator.stake;
      if (random < cumulativeStake) {
        return validator.address;
      }
    }

    return this.validators[0].address;
  }

  public addBlock(transactions: any[]): void {
    const previousBlock = this.getLatestBlock();
    const validator = this.selectValidator();
    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      transactions: transactions,
      previousHash: previousBlock.hash,
      hash: '',
      merkleRoot: this.calculateMerkleRoot(transactions),
      validator: validator
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

export { ProofOfStake, Validator, Block };
