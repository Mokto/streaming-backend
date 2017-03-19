import * as fs from 'fs';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { CONFIG } from '../config/credentials';

export class AllDebrid {
  private baseRequest: request = request.defaults({
    headers: {
        Cookie: 'uid=' + CONFIG.allDebridCookie,
    },
  });
  private interval;

  public uploadTorrents(torrents: any[]) {

    const torrent = torrents[0];

    const formData = {
      uid: '65f67b34ed12eaf3f943af8d',
      domain: 'https://alldebrid.com/torrent/',
      magnet: torrent.type === 'tpb' ? torrent.magnetLink : undefined,
      uploadedfile: torrent.type === 'yifi' ? fs.createReadStream(torrent.path) : undefined,
      splitfile: 0,
      quick: 1,
    };

    // this.baseRequest.post({
    //   url: 'https://upload.alldebrid.com/uploadtorrent.php',
    //   formData,
    // });

    this.checkTorrentsState();
    this.interval = setInterval(this.checkTorrentsState, 5000);

  }

  private debrid(link, callback) {
    this.baseRequest.get('https://alldebrid.com/service.php?link=' + link + '&json=true&jd=true', (err, httpResponse, body) => {
      if (err) {
        return console.error('upload failed:', err);
      }
      callback(JSON.parse(body).link);
    });
  }

  private checkTorrentsState = () => {
      const url = 'https://alldebrid.com/api/torrent.php?json=true&randval=' + Math.random() + '&_=1489866945298';
      this.baseRequest.get(url, (err, httpResponse, body) =>{
        if (err) {
          return console.log(err);
        }
        const results = JSON.parse(body)
          .map(link => {
            const name = link[3];
            const htmlLinks = link[10];
            const links = htmlLinks.substring(htmlLinks.indexOf('value=\'') + 7, htmlLinks.indexOf(',;,\'')).split(',;,');
            links.splice(links.length - 1, 1);
            const deleteLink = link[11];
            return {
              name: name.substring(name.indexOf('>') + 1, name.lastIndexOf('<')),
              status: link[4],
              downloaded: link[5],
              size: link[6],
              speed: link[8],
              links: links,
              delete: deleteLink.substring(deleteLink.indexOf('href=') + 6, deleteLink.lastIndexOf('\'>')),
            };
          });
        console.log(results[0]);
      });
  }
}
