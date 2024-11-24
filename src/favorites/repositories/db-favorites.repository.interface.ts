import { DbFavorite } from '../entities/favorite.entity';

export interface IDbFavoritesRepository {
  getAll(): Promise<DbFavorite>;
  addTrack(id: string): Promise<void>;
  deleteTrack(id: string): Promise<void>;
  addAlbum(id: string): Promise<void>;
  deleteAlbum(id: string): Promise<void>;
  addArtist(id: string): Promise<void>;
  deleteArtist(id: string): Promise<void>;
}
