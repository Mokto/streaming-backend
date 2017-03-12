import SocketIo from 'socket.io';

import { Trakt } from '../../services/trakt';

export class Movies {

  private static trakt: Trakt = new Trakt();

  public static INIT(socket: SocketIO.Socket): void {
    socket.on('movies', (data: IMovieRouteParams, callback) => {
      this.trakt.getMoviesByType(data, callback);
    });

  }
}


interface IMovieRouteParams {
  type: string;
  period?: string;
  page: number;
  limit: number;
  genre: string;
}
