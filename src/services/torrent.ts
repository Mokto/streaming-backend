import * as promiseRetry from 'promise-retry';
import * as request from 'request';
import * as piratebay from 'thepiratebay';

export class Torrent {
  public async getAllTorrents(imdbId) {
    const t = await Promise.all([
      this.getAllYifiTorrentsPromise(imdbId),
      this.getAllPirateBayTorrentsPromise(imdbId),
    ]);

    return [...t[0], ...t[1]];
  }

  private getAllPirateBayTorrentsPromise(imdbId) {

    return promiseRetry((retry, attemptCount) => {

      console.log('start search tpb');
      return piratebay.search(imdbId, {
        orderBy: 'seeds',
      })
      .then(torrents => {
        console.log('end search tpb', torrents.length);
        if (torrents.length === 0) {
          return retry();
        }
        return torrents;
      })
      .catch(retry);

    }, { retries: 3, minTimeout: 6000 })

    .then(torrents => {
      return torrents
        .filter(this.filterTorrentsByNames)
        .map(torrent => {
          return {
            ...torrent,
            type: 'tpb',
            quality: torrent.name.indexOf('720p') !== -1 ? '720p' : torrent.name.indexOf('1080p') !== -1 ? '1080p' : undefined,
          };
        })
        .filter(t => !!t.quality);
    })
    .catch(() => Promise.resolve([]));

  }

  private getAllYifiTorrentsPromise(imdbId) {


    return new Promise<any[]>((resolve, reject) => {
      console.log('start search yifi');
      request('https://yts.ag/api/v2/list_movies.json?limit=2&query_term=' + imdbId, (error, response, body) => {

        console.log('end search yifi');
        if (error || response.statusCode !== 200) {
          return resolve([]);
        }

        const json = JSON.parse(body);
        if (json.data.movie_count === 0) {
          return resolve([]);
        }

        const result: any[] = json.data.movies[0].torrents
          .filter(t => t.quality === '720p' || t.quality === '1080p')
          .map(torrent => {
            return {
              ...torrent,
              type: 'yifi',
            };
          });

        resolve(result);

      });

    });
  }

  private filterTorrentsByNames(torrent) {
    const invalidKeys = [' 3D ', '.3D.', 'DTS-HD', ' TS ', '.TS.'];
    if (invalidKeys.some(key => torrent.name.indexOf(key) !== -1)) {
      return false;
    }
    return true;
  }

}
