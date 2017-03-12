import * as async from 'async';

import { parseToCard } from '../model/card';
import { CardRow, parseToCardRow } from '../model/card-row';
import { ImagesService } from './images';
import { redis } from './lib/redis';
import { trakt } from './lib/trakt';


export class Trakt {

  private imagesService: ImagesService = new ImagesService();

  public getMoviesByType(params: { type: string, limit?: number, page?: number, genre?: string, period?: string }, callback): void {

    const key: string = 'trakt_' + JSON.stringify(params);

    redis.get(key, (err, value) => {

      if (value) {
        return callback(JSON.parse(value).map(parseToCard));
      }

      trakt.movies[params.type](params).then((movies) => {

        movies = this.formatMovies(movies);

        this.imagesService.mapImages('movie', movies).then((movies) => {

          redis.set(key, JSON.stringify(movies), 'EX', 60 * 60 * 24);
          callback(movies.map(parseToCard));

        });

      });
    });

  }

  private formatMovies(movies: any[]) {
    return movies.map(movie => {
      if (movie.movie) {
        return { ...movie.movie };
      }
      return movie;
    });
  }
}
