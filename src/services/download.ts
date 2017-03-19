
import * as wget from 'wget-improved';

export class Download {
  public async downloadTorrents(torrents) {
    return await Promise.all(torrents.map(this.downloadTorrentPromise));
  }

  public downloadTorrentPromise(torrent) {
    return new Promise((resolve, reject) => {

      if (torrent.type === 'tpb') {
        resolve(torrent);
      }

      const output = './torrents/' + torrent.hash + '.torrent';
      wget.download(torrent.url, output).on('end', () => {
        resolve({
          ...torrent,
          path: output,
        });
      });
    });
  }
}
