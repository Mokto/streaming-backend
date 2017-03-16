import * as request from 'request';

export class Torrent {
  public async getAllTorrents(imdbId) {
    return await this.getAllTorrentsPromise(imdbId);
  }

  private getAllTorrentsPromise(imdbId) {
    return new Promise((resolve, reject) => {
      request('https://yts.ag/api/v2/list_movies.json?limit=2&query_term=' + imdbId, function (error, response, body) {

        if (error || response.statusCode !== 200) {
          return reject('Request error');
        }

        const json = JSON.parse(body);
        if (json.data.movie_count === 0) {
          return reject('No torrent found');
        }

        resolve(json.data.movies[0].torrents[0]);

      });

    });
  }


  public async getAllTorrentsTest(imdbId) {
    return await this.getAllTorrentsPromiseTest(imdbId);
  }

  private getAllTorrentsPromiseTest(imdbId) {
    return new Promise((resolve, reject) => {
      request('https://yts.ag/api/v2/list_movies.json?limit=2&query_term=azdajzoidajoiazdop', function (error, response, body) {

        if (error || response.statusCode !== 200) {
          return reject('Request error');
        }

        const json = JSON.parse(body);
        if (json.data.movie_count === 0) {
          return reject('No torrent found');
        }

        resolve(json.data.movies[0].torrents[0]);

      });

    });
  }
}
