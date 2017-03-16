// import { GET, Path, PathParam, Return } from 'typescript-rest';

// import * as PlexAPI from 'plex-api';
// const client = new PlexAPI({
//   hostname: '192.168.1.104',
//   username: 'theo.mathieu1@gmail.com',
//   password: 'abab1598',
// });

// import { CardRow, parseToCardRow } from '../../model/card-row';
// import { Trakt } from '../../services/trakt';

// @Path('/plex')
// class PlexRoutes {

//   @GET
//   public get(): Promise<any> {

//     return new Promise<any>((resolve, reject) => {
//       client.query('/').then((result) => {
//         // console.log(result.MediaContainer);

//       }, function (err) {
//           console.error("Could not connect to server", err);
//           resolve('b');
//       });

//       client.query('/library/onDeck').then((onDeck) => {


//           client.query('/library/sections/1/all').then((directories) => {

//             resolve({
//               onDeck: onDeck.MediaContainer.Metadata.map(a => a.grandparentTitle + ' - ' + a.parentTitle),
//               movie1: directories.MediaContainer.Metadata[0].title,
//             });

//           }, function (err) {
//               console.error("Could not connect to server", err);
//           });

//       }, function (err) {
//           console.error("Could not connect to server", err);
//       });

//       // client.query('/library/sections/1/all').then((directories) => {
//       //   // console.log(.map(a => a.title));
//       //   resolve(directories.MediaContainer);
//       // }, function (err) {
//       //     console.error("Could not connect to server", err);
//       // });



//     });

//   }
// }

