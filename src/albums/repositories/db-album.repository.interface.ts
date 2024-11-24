import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { DbAlbum } from '../entities/album.entity';

export interface IDbAlbumRepository {
  getAll(): Promise<DbAlbum[]>;
  getById(id: string): Promise<DbAlbum>;
  create(createAlbumDto: CreateAlbumDto): Promise<DbAlbum>;
  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<DbAlbum>;
  delete(id: string): Promise<void>;
}
