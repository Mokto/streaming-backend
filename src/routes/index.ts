import { Movies } from './movies/movies';
import { Menu } from './menu/menu';
import { Stream } from './stream/stream';
import { Streaming } from './movies/streaming';

export class Routes {
  public static INIT(socket: SocketIO.Socket): void {
    Movies.INIT(socket);
    Menu.INIT(socket);
    Stream.INIT(socket);
    Streaming.INIT(socket);
  }
}
