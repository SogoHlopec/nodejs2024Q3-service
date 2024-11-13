import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

export interface IAlbumRepository {
  getAll(): Album[];
  getById(id: string): Album;
  create(createAlbumDto: CreateAlbumDto): Album;
  update(id: string, updateAlbumDto: UpdateAlbumDto): Album;
  delete(id: string): void;
}
