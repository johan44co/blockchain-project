import { Communication } from '../../../src/networking/communication';

describe('Communication', () => {
  let communication: Communication;
  const url = 'ws://localhost:8080';

  beforeEach(() => {
    communication = new Communication(url);
  });

  test('should connect to the server', (done) => {
    communication['ws'].on('open', () => {
      expect(communication['ws'].readyState).toBe(WebSocket.OPEN);
      done();
    });
  });

  test('should send a message', (done) => {
    const message = 'Hello, server!';
    communication['ws'].on('open', () => {
      communication.sendMessage(message);
    });

    communication['ws'].on('message', (data) => {
      expect(data).toBe(message);
      done();
    });
  });

  test('should receive a message', (done) => {
    const message = 'Hello, client!';
    communication['ws'].on('open', () => {
      communication['ws'].send(message);
    });

    communication['ws'].on('message', (data) => {
      expect(data).toBe(message);
      done();
    });
  });

  test('should handle connection close', (done) => {
    communication['ws'].on('close', () => {
      expect(communication['ws'].readyState).toBe(WebSocket.CLOSED);
      done();
    });

    communication['ws'].close();
  });

  test('should handle connection error', (done) => {
    const error = new Error('Connection error');
    communication['ws'].on('error', (err) => {
      expect(err).toBe(error);
      done();
    });

    communication['ws'].emit('error', error);
  });
});
