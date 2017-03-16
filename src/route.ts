export class Route {
  protected socket: SocketIO.Socket;

  constructor(socket: SocketIO.Socket) {
    this.socket = socket;
  }
}
