import { Route } from '../route';

export default class Stream extends Route {
  public init(): void {

    this.socket.on('streaming:get-link', (callback) => {
      console.log('get stream link');
      callback('test');
    });

  }
}
