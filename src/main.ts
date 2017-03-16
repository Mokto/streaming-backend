import * as domain from 'domain';
import * as http from 'http';
import * as fs from 'fs';
import * as SocketIO from 'socket.io';

// import { Routes } from './routes';

const routes = [];
fs.readdirSync(__dirname + '/routes').forEach(function(file) {
    const fileName = file.substr(0, file.indexOf('.'));
    routes.push(require('./routes/' + fileName).default);
});


const createServer = () => {

  const server: http.Server = http.createServer();
  const io: SocketIO.Server = SocketIO.listen(server);

  io.sockets.on('connection', (socket: SocketIO.Socket) => {

    console.log('\x1b[35m%s\x1b[0m', 'Client connected');
    routes.forEach(Route => {
      const route = new Route(socket);
      route.init();
    });

    socket.on('disconnect', () => {
      console.log('\x1b[32m%s\x1b[0m', 'Client disconnected');
    });
  });

  server.listen(8080);
  console.log('Socket.io Server listening on port 8080!');
};



const d = domain.create();

d.on('error', (err: Error) => {
  console.error(err.message);
});

d.run(createServer);
