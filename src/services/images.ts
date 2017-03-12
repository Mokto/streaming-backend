// import * as async from 'async';

import * as async from 'async';

import { redis } from './lib/redis';
import { trakt } from './lib/trakt';


export class ImagesService {
  public mapImages(type: string, contents: any[]): Promise<any[]> {

    return new Promise<any[]>((resolve, reject) => {
      console.log('\x1b[35m%s\x1b[0m', 'Getting images...');

      async.map(contents, (content, cb) => {
        this.getImage(type, content.ids, (image) => {
          cb(null, {
            ...content,
            image: image.poster,
          });
        });

      }, (err, contents) => {
        console.log('\x1b[32m%s\x1b[0m', 'Got all images');
        resolve(contents);
      });
    });
  }

  public getImage(type, ids, cb) {

    const key: string = 'image_' + ids.tmdb + '_' + ids.imdb;

    redis.get(key, (err, value) => {

        if (value) {
          return cb(JSON.parse(value));
        }

        trakt.images.get({
          tmdb: ids.tmdb,
          imdb: ids.imdb,
          type: type,
        })
        .then(image => {
          redis.set(key, JSON.stringify(image));
          cb(image);
        });

      });

  }
}
