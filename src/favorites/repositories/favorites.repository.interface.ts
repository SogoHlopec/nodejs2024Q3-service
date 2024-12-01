import { Favorite } from '../entities/favorite.entity';

export interface IFavoritesRepository {
  getAll(): Favorite;
  addTrack(id: string): void;
  deleteTrack(id: string): void;
  addAlbum(id: string): void;
  deleteAlbum(id: string): void;
  addArtist(id: string): void;
  deleteArtist(id: string): void;
}
