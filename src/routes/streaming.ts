import { Route } from '../route';

import { Streamer } from '../services/streamer';

import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as request from 'request';
import * as wget from 'wget-improved';

export default class Streaming extends Route {
  private streamer = new Streamer();

  public init (): void {
    this.socket.on('streaming:get-link', (imdbId, callback) => {

      imdbId = 'tt1355644';

      const torrent = this.streamer.getLink(imdbId)
          .then(link => console.log('done'))
          .catch(reason => console.log(reason));

    });
  }
}

