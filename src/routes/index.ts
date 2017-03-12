import { Movies } from './movies/movies';
import { Menu } from './menu/menu';

export class Routes {
  public static INIT(socket: SocketIO.Socket): void {
    Movies.INIT(socket);
    Menu.INIT(socket);
  }
}
