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
          .then(link => console.log('streaming route', link))
          .catch(reason => console.log(reason));


      // this.torrent.getAllTorrents(imdbId, (torrent) => {
      //   callback('got torrent');

      //   const output = './torrents/' + imdbId + '.torrent';

      //   wget.download(torrent.url, output).on('end', function() {

      //     upload(output, function() {
      //       getFile(torrent, (links) => {

      //         callback('links ok');
      //         console.log(links);
      //         links.forEach(link => {
      //           downloadFile(link, (uptoboxLink) => {
      //             debrid(uptoboxLink, (link) => {
      //               callback(link);
      //               console.log(link);
      //             });
      //           });
      //         });
      //       });
      //     });

      //   });
      // });
    });
  }
}

const cookie = '65f67b34ed12eaf3f943af8d';
const torrentLink = 'https://yts.ag/torrent/download/298400F2032241DAB34836BC2165C30788211C9F';


let baseRequest = request.defaults({
   headers: {
      Cookie: 'uid='+cookie,
  },
});

const upload = function(torrentUrl, callback) {
  console.log('./torrent/' + torrentUrl);
  let formData = {
    uid: '65f67b34ed12eaf3f943af8d',
    domain: 'https://alldebrid.com/torrent/',
    uploadedfile: fs.createReadStream(torrentUrl),
    splitfile: 0,
    quick: 1,
  };

  // Multipart/form-data
  baseRequest.post({url: 'https://upload.alldebrid.com/uploadtorrent.php', formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.log(err);
    }
    console.log('Upload successful!');
    callback();
  });
};

const getFile = (torrent, callback) => {
  baseRequest.get('https://alldebrid.com/torrent/', (err, httpResponse, body) => {
    if (err) {
      return console.error('upload failed:', err);
    }
    // Console.log('Upload successful!  Server responded with:', body);

    let $ = cheerio.load(body);
    const tr = $('#torrent tbody tr:contains('+torrent.size+')');

    const name = tr.find('.torrent_filename').text();
    const status = tr.find('td:nth-child(5)').text();
    const linksStr = tr.find('.display_link').attr('value');
    const links = linksStr.split(',;,');
    links.splice(links.length - 1, 1);

    console.log(name, status, linksStr)

    callback(links);
  });
};

const downloadFile = (uptoboxLink, callback) => {
  request.get(uptoboxLink, function (err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    // Console.log('Upload successful!  Server responded with:', body);

    let $ = cheerio.load(body);
    const title = $('.para_title').text();
    if (title.indexOf('KB') > -1) {
      return null;
    }
    console.log('download', title, uptoboxLink);

    callback(uptoboxLink);

  });
};

const debrid = (link, callback) => {
  baseRequest.get('https://alldebrid.com/service.php?link=' + link + '&json=true&jd=true', function (err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    callback(JSON.parse(body).link);
  });
};

const get = (torrentLink, callback) => {
  wget({
      url:  torrentLink,
      dest: './torrents/',
  },
  function (error, response, body) {
      if (error) {
          console.log(error);            // Error encountered
      } else {
        callback();
        console.log('done', response);
      }
  },
  );
};




const getTorrentFromImdbId = (imdbId, callback) => {
  request('https://yts.ag/api/v2/list_movies.json?limit=2&query_term=' + imdbId, function (error, response, body) {

  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);

    info.data.movies[0].torrents.forEach(torrent => {

      console.log(torrent.quality + ' ' + torrent.size);

    });

    callback(info.data.movies[0].torrents[1]);

    // request.post('https://upload.alldebrid.com/uploadtorrent.php', {form:{key:'value'}})

  }

});
}
