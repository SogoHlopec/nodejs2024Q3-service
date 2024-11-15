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
