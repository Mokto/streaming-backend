import { Route } from '../route';

import { movieMenu } from '../config/movie-menu';

export default class Menu extends Route {
  public init(): void {
    this.socket.on('menu:movies', (callback) => {
      callback(movieMenu);
    });
  }
}
