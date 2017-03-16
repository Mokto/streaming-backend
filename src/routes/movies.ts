import { Route } from '../route';

import { Trakt } from '../services/trakt';

// const trakt: Trakt = new Trakt();
// trakt.getMovieDetails("moana-2016", (movie) => {
//   // console.log(movie);
// });

export default class Movies extends Route {

  private trakt: Trakt = new Trakt();

  public init(): void {
    this.socket.on('movies', (data: IMovieRouteParams, callback) => {
      this.trakt.getMoviesByType(data, callback);
    });

    this.socket.on('movie', (traktId, callback) => {
      this.trakt.getMovieDetails(traktId, callback);
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
