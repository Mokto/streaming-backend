import * as Trakt from 'trakt.tv';
import * as imagesPlugin from 'trakt.tv-images';

import { CONFIG } from '../../config';

export const trakt: Trakt = new Trakt({
  client_id: CONFIG.traktClientId,
  client_secret: CONFIG.traktClientSecret,
  redirect_uri: null,
  api_url: null,
  plugins: {
      images: imagesPlugin,
  },
  options: {
      images: {
        tvdbApiKey: CONFIG.tvdbApiKey,
        tmdbApiKey: CONFIG.tmdbApiKey,
        fanartApiKey: CONFIG.fanartApiKey,
        smallerImages: true,
      },
  },
});
