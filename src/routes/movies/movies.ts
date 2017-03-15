import SocketIo from 'socket.io';

import { Trakt } from '../../services/trakt';

const trakt: Trakt = new Trakt();
trakt.getMovieDetails("moana-2016", (movie) => {
  // console.log(movie);
});

export class Movies {

  private static trakt: Trakt = new Trakt();

  public static INIT(socket: SocketIO.Socket): void {
    socket.on('movies', (data: IMovieRouteParams, callback) => {
      this.trakt.getMoviesByType(data, callback);
    });

    socket.on('movie', (traktId, callback) => {
      this.trakt.getMovieDetails(traktId, (movie) => {

        console.log(movie.images);

        callback({
          title: movie.title,
          description: movie.tagline,
          year: movie.year,
          text: movie.overview,
          imdbId: movie.ids.imdb,
          localImageResource: 'movie_poster_01',
          price: '$9.99',
          poster: movie.poster,
          background: movie.background,

          // characters: [
          //   {
          //     type: 'CHARACTER',
          //     title: 'Leonardo Di Caprio',
          //     localImageResource: 'face_01',
          //   },
          //   {
          //     type: 'CHARACTER',
          //     title: 'Gerald Butler',
          //     localImageResource: 'face_08',
          //   },
          //   {
          //     type: 'CHARACTER',
          //     title: 'Russle Crow',
          //     localImageResource: 'face_02',
          //   },
          //   {
          //     type: 'CHARACTER',
          //     title: 'Emma Stone',
          //     localImageResource: 'face_03',
          //   },
          //   {
          //     type: 'CHARACTER',
          //     title: 'Natalie Portman',
          //     localImageResource: 'face_04',
          //   },
          //   {
          //     type: 'CHARACTER',
          //     title: 'Jack Gyllanhall',
          //     localImageResource: 'face_05',
          //   },
          //   {
          //     type: 'CHARACTER',
          //     title: 'Ryan Gossling',
          //     localImageResource: 'face_06',
          //   },
          //   {
          //     type: 'CHARACTER',
          //     title: 'Olivia Wilde',
          //     localImageResource: 'face_07',
          //   },
          // ],
          recommended: [
            {
              type: 'MOVIE',
              title: 'The Amazing Spuder-Man',
              description: '$3.99',
              localImageResource: 'card_image_movie_01',
            },
            {
              type: 'MOVIE',
              title: 'American Psycho',
              description: '$3.99',
              localImageResource: 'card_image_movie_02',
            },
            {
              type: 'MOVIE',
              title: 'Big Hero 6',
              description: '$3.99',
              localImageResource: 'card_image_movie_03',
            },
            {
              type: 'MOVIE',
              title: 'Edge of Tomorrow',
              description: '$3.99',
              localImageResource: 'card_image_movie_04',
            },
            {
              type: 'MOVIE',
              title: 'The Hobbit: The Desolation of Smaug',
              description: '$3.99',
              localImageResource: 'card_image_movie_05',
            },
            {
              type: 'MOVIE',
              title: 'Interstellar',
              description: '$3.99',
              localImageResource: 'card_image_movie_06',
            },
            {
              type: 'MOVIE',
              title: 'Jurassic Park',
              description: '$3.99',
              localImageResource: 'card_image_movie_07',
            },
            {
              type: 'MOVIE',
              title: 'The Hunger Games: Mockingjay Part I',
              description: '$3.99',
              localImageResource: 'card_image_movie_08',
            },
            {
              type: 'MOVIE',
              title: 'Planes',
              description: '$3.99',
              localImageResource: 'card_image_movie_09',
            },
          ],
        });
      });
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
