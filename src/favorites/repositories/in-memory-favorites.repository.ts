import { Injectable } from '@nestjs/common';
import { IFavoritesRepository } from './favorites.repository.interface';
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class InMemoryFavoritesRepository implements IFavoritesRepository {
  private favorite: Favorite = new Favorite();

  getAll(): Favorite {
    return this.favorite;
  }

  addTrack(id: string): void {
    this.favorite.tracks.push(id);
  }
  deleteTrack(id: string): void {
    this.favorite.tracks = this.favorite.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
  addAlbum(id: string): void {
    this.favorite.albums.push(id);
  }
  deleteAlbum(id: string): void {
    this.favorite.albums = this.favorite.albums.filter(
      (albumId) => albumId !== id,
    );
  }
  addArtist(id: string): void {
    this.favorite.artists.push(id);
  }
  deleteArtist(id: string): void {
    this.favorite.artists = this.favorite.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
