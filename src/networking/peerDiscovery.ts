import { createHash } from 'crypto';

interface Peer {
  id: string;
  address: string;
}

class KademliaDHT {
  private peers: Map<string, Peer>;

  constructor() {
    this.peers = new Map();
  }

  public addPeer(id: string, address: string): void {
    const peer: Peer = {
      id: id,
      address: address
    };
    this.peers.set(id, peer);
  }

  public findPeer(id: string): Peer | undefined {
    return this.peers.get(id);
  }

  public removePeer(id: string): void {
    this.peers.delete(id);
  }

  public getClosestPeers(id: string, count: number): Peer[] {
    const sortedPeers = Array.from(this.peers.values()).sort((a, b) => {
      const distanceA = this.calculateDistance(id, a.id);
      const distanceB = this.calculateDistance(id, b.id);
      return distanceA - distanceB;
    });

    return sortedPeers.slice(0, count);
  }

  private calculateDistance(id1: string, id2: string): number {
    const hash1 = createHash('sha256').update(id1).digest('hex');
    const hash2 = createHash('sha256').update(id2).digest('hex');
    let distance = 0;

    for (let i = 0; i < hash1.length; i++) {
      distance += Math.abs(parseInt(hash1[i], 16) - parseInt(hash2[i], 16));
    }

    return distance;
  }
}

export { KademliaDHT, Peer };
