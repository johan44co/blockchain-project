import { KademliaDHT, Peer } from '../../../src/networking/peerDiscovery';

describe('KademliaDHT', () => {
  let dht: KademliaDHT;

  beforeEach(() => {
    dht = new KademliaDHT();
  });

  test('should add a peer', () => {
    const peer: Peer = { id: 'peer1', address: 'address1' };
    dht.addPeer(peer.id, peer.address);
    expect(dht.findPeer(peer.id)).toEqual(peer);
  });

  test('should find a peer by id', () => {
    const peer: Peer = { id: 'peer1', address: 'address1' };
    dht.addPeer(peer.id, peer.address);
    const foundPeer = dht.findPeer(peer.id);
    expect(foundPeer).toEqual(peer);
  });

  test('should remove a peer', () => {
    const peer: Peer = { id: 'peer1', address: 'address1' };
    dht.addPeer(peer.id, peer.address);
    dht.removePeer(peer.id);
    expect(dht.findPeer(peer.id)).toBeUndefined();
  });

  test('should get closest peers', () => {
    const peer1: Peer = { id: 'peer1', address: 'address1' };
    const peer2: Peer = { id: 'peer2', address: 'address2' };
    const peer3: Peer = { id: 'peer3', address: 'address3' };
    dht.addPeer(peer1.id, peer1.address);
    dht.addPeer(peer2.id, peer2.address);
    dht.addPeer(peer3.id, peer3.address);

    const closestPeers = dht.getClosestPeers('peer1', 2);
    expect(closestPeers.length).toBe(2);
  });

  test('should calculate distance between ids', () => {
    const distance = dht['calculateDistance']('peer1', 'peer2');
    expect(distance).toBeGreaterThan(0);
  });
});
