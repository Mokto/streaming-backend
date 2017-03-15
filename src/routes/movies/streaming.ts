
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const wget = require('wget-improved');



export class Streaming {
  public static INIT(socket: SocketIO.Socket): void {
    socket.on('stream', (imdbId, callback) => {
      console.log(imdbId);

      getTorrentFromImdbId(imdbId, (torrent) => {

        const output = './torrents/' + imdbId + '.torrent';

        wget.download(torrent.url, output).on('end', function() {

          upload(output, function() {
            getFile(torrent, (links) => {
              console.log(links);
              links.forEach(link => {
                downloadFile(link, (uptoboxLink) => {
                  debrid(uptoboxLink, (link) => {
                    callback(link);
                    console.log(link);
                  });
                });
              });
            });
          });

        });
      });
    });
  }
}

const allDebridUsername = 'moktoo';
const allDebridPassword = 'abab1598';
const cookie = '65f67b34ed12eaf3f943af8d';
const torrentLink = 'https://yts.ag/torrent/download/298400F2032241DAB34836BC2165C30788211C9F';


let baseRequest = request.defaults({
   headers: {
      Cookie: 'uid=65f67b34ed12eaf3f943af8d',
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
/*
console.log('starting phantomjs');
var phantomjs = require('phantomjs-prebuilt')
var program = phantomjs.exec('./phantomjs-script.js', torrentLink, cookie)
program.stdout.pipe(process.stdout)
program.stderr.pipe(process.stderr)
program.on('exit', code => {
  console.log('exited');
  // do something on end
})
*/

/*
var request = require('request');
*/

/*
var phantomjs = require('phantomjs-prebuilt')
var webdriverio = require('webdriverio')
var wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }
var async = require('async');

phantomjs.run('--webdriver=4444').then(program => {
  console.log('running phantomjs')

  let browser = webdriverio.remote(wdOpts).init()
    .url('https://alldebrid.com/torrent/')
    .getUrl()
    .then(url => {
      console.log(url);

      browser = browser
            .setCookie({name: 'uid', value: '65f67b34ed12eaf3f943af8d', domain: '.alldebrid.com'})
            .getText('#top')
            .then((title) => {
              console.log(title);
              program.kill();
            }, err => {
              console.log(err.seleniumStack.orgStatusMessage);
              program.kill();
            });

    }, err => {
      console.log(err);
      program.kill();
    });

});
*/

/*
const uploadTorrent = function(torrent) {

  console.log(torrent);
    // .url('https://alldebrid.com/api.php?action=info_user&login=moktoo&pw=abab1598&format=json')

  phantomjs.run('--webdriver=4444').then(program => {
    console.log('running phantomjs')
    const browser = webdriverio.remote(wdOpts).init();

    async.series([
      (callback) => {
        browser.url('https://alldebrid.com/torrent/')
//            .setCookie({name: 'uid', value: '65f67b34ed12eaf3f943af8d', domain: '.alldebrid.com'})
            .getText('#top').then(title => {

            console.log('title', title);
            callback();
          });
      }
    ], () => {
browser.url('https://alldebrid.com/torrent/')
      .getText('#top').then(title => {

         var allCookies = browser.getCookie()
    console.log(allCookies);
        console.log(title);

        if (title.indexOf('Sign in')) {

          browser.url('http://alldebrid.com/register/')
          .getText('ul.login_form').then(title => {

            console.log('SUBMIT');
            browser.setValue('input.login_login', allDebridUsername);
            browser.setValue('input.login_password', allDebridPassword);
            browser.submitForm('#loginForm').then(() => {
              console.log('done');

         var allCookies = browser.getCookie().then(cookie => {
           console.log('cookie', cookie);
         });
    console.log(allCookies);
     var url = browser.getUrl().then((val) => {
       console.log('val', val)
     });
    console.log(url);
              browser
                .url('https://alldebrid.com/torrent/')
                .getText('#top').then(title => {
                  console.log(title);
                  program.kill();
                });

            });

          });
        }
      });
    });

  });

};

uploadTorrent({
  url: 'https://yts.ag/torrent/download/298400F2032241DAB34836BC2165C30788211C9F'
});
*/