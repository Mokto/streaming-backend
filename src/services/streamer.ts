import { Torrent } from './torrent';

export class Streamer {

  private torrent = new Torrent();

  public async getLink(imdbId) {
    const torrent = await this.torrent.getAllTorrents(imdbId);
    const torrent1 = await this.torrent.getAllTorrentsTest(imdbId);

    console.log(torrent, torrent1);
    return torrent;
  }
}
