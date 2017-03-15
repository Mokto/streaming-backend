export class Stream {
  public static INIT(socket: SocketIO.Socket): void {

    socket.on('streaming:get-link', (callback) => {
      console.log('get stream link');
      callback('test');
    });

  }
}
