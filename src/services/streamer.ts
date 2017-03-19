import { AllDebrid } from './alldebrid';
import { Download } from './download';
import { redis } from './lib/redis';
import { Torrent } from './torrent';

export class Streamer {

  private torrent = new Torrent();
  private download = new Download();
  private allDebrid = new AllDebrid();

  public async getLink(imdbId) {

    // console.log('\x1b[33m%s\x1b[0m', 'Getting torrents with imdb ' + imdbId + '...');
    // const torrents = await this.torrent.getAllTorrents(imdbId);
    // console.log('\x1b[33m%s\x1b[0m', 'Got ' + torrents.length + ' torrents !');
    // const torrentsOnDisk = await this.download.downloadTorrents(torrents);
    // console.log('\x1b[33m%s\x1b[0m', 'Downloaded all torrents.');

    const key = 'azdazoidj6+651651azd651az56d';
    // redis.set(key, JSON.stringify(torrentsOnDisk));
    redis.get(key, (err, data) => {
      const torrentsOnDisk = JSON.parse(data);

      const torrent = torrentsOnDisk[Math.floor(Math.random() * torrentsOnDisk.length)];
      this.allDebrid.uploadTorrents([torrent]);
    });


    // return torrents;
  }
}
