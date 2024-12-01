import { DbAlbum } from 'src/albums/entities/album.entity';
import { DbArtist } from 'src/artists/entities/artist.entity';
import { DbTrack } from 'src/tracks/entities/track.entity';

export class Favorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export class DbFavorite {
  artists: DbArtist[]; // favorite artists ids
  albums: DbAlbum[]; // favorite albums ids
  tracks: DbTrack[]; // favorite tracks ids
}
