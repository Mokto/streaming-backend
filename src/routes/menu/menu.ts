export class Menu {
  public static INIT(socket: SocketIO.Socket): void {

    socket.on('movies-menu', (callback) => {
      console.log('get home menu');
      callback([
        {
          id: 'trakt-lists',
          title: 'Streaming lists',
          cards: [
            {
              id: 'movies-trending',
              params: JSON.stringify({
                route: 'movies',
                type: 'trending',
              }),
              type: 'SQUARE_SINGLE_LINE',
              title: 'Trending',
              localImageResource: 'category_action',
            },
            {
              id: 'movies-popular',
              params: JSON.stringify({
                route: 'movies',
                type: 'popular',
              }),
              type: 'SQUARE_SINGLE_LINE',
              title: 'Popular',
              localImageResource: 'category_animation',
            },
            {
              id: 'movies-watched-monthly',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'monthly',
              }),
              type: 'SQUARE_SINGLE_LINE',
              title: 'Watched (last month)',
              localImageResource: 'category_classics',
            },
            {
              id: 'movies-watched-all',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'all',
              }),
              type: 'SQUARE_SINGLE_LINE',
              title: 'Watched (All time)',
              localImageResource: 'category_classics',
            },
            {
              id: 'movies-watched-yearly',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
              }),
              type: 'SQUARE_SINGLE_LINE',
              title: 'Watched (last year)',
              localImageResource: 'category_classics',
            },
          ],
        },
        {
          id: 'trakt-genres',
          title: 'Streaming genres',
          cards: [
            {
              id: 'action',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'action',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Action',
              footerColor: '#dd004e',
              localImageResource: 'category_action',
            },
            {
              id: 'animation',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'animation',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Animation',
              footerColor: '#c2185b',
              localImageResource: 'category_animation',
            },
            {
              id: 'adventure',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'adventure',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Adventure',
              footerColor: '#9c27b0',
              localImageResource: 'category_classics',
            },
            {
              id: 'comedy',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'comedy',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Comedy',
              footerColor: '#cf4900',
              localImageResource: 'category_comedy',
            },
            {
              id: 'crime',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'crime',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Crime',
              footerColor: '#3f51b5',
              localImageResource: 'category_crime',
            },
            {
              id: 'documentary',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'documentary',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Documentary',
              footerColor: '#02639b',
              localImageResource: 'category_documentary',
            },
            {
              id: 'drama',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'drama',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Drama',
              footerColor: '#2a56c6',
              localImageResource: 'category_drama',
            },
            {
              id: 'anime',
              params: JSON.stringify({
                route: 'movies',
                type: 'watched',
                period: 'yearly',
                genres: 'anime',
              }),
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Anime',
              footerColor: '#333333',
              localImageResource: 'category_classics',
            },
          ],
        },
        {
          id: 'recommendations',
          title: 'Recommendations',
          cards: [
            {
              id: 'action',
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Action',
              footerColor: '#dd004e',
              localImageResource: 'category_action',
            },
          ],
        },
        {
          id: 'watchlist',
          title: 'Watchlist',
          cards: [
            {
              id: 'action',
              type: 'SQUARE_SINGLE_LINE_CENTERED',
              title: 'Action',
              footerColor: '#dd004e',
              localImageResource: 'category_action',
            },
          ],
        },
      ]);
    });

  }
}