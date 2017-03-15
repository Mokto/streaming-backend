

export class Card {
  public type: string;
  public title: string;
  public description?: string;
  public image: string;
}

export const parseToCard: (movie) => Card  = (movie) => ({
  id: movie.ids.trakt,
  type: 'MOVIE',
  title: movie.title,
  subtitle: '' + movie.year,
  image: movie.image,
});
