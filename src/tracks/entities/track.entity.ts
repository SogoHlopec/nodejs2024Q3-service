import { v4 as uuidv4 } from 'uuid';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}

export class DbTrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
