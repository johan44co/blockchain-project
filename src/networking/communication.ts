import WebSocket from 'ws';

class Communication {
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      console.log('Connected to the server');
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      console.log('Received message:', data);
    });

    this.ws.on('close', () => {
      console.log('Disconnected from the server');
    });

    this.ws.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  }

  public sendMessage(message: string): void {
    this.ws.send(message);
  }
}

export { Communication };
