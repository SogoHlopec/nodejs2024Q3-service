import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbAlbum } from './entities/album.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { DBAlbumRepository } from './repositories/db-album.repository';
import { DbTrackRepository } from 'src/tracks/repositories/db-track.repository';
import { DbFavoritesRepository } from 'src/favorites/repositories/db-favorites.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumRepository: DBAlbumRepository,
    private readonly trackRepository: DbTrackRepository,
    private readonly favoriteRepository: DbFavoritesRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<DbAlbum> {
    const album = await this.albumRepository.create(createAlbumDto);
    return album;
  }

  async findAll(): Promise<DbAlbum[]> {
    const albums = await this.albumRepository.getAll();
    return albums;
  }

  async findOne(id: string): Promise<DbAlbum> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = await this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<DbAlbum> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = await this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const albumUpdate = await this.albumRepository.update(id, updateAlbumDto);
    return albumUpdate;
  }

  async remove(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = await this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const tracks = await this.trackRepository.getAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.trackRepository.update(track.id, { ...track, albumId: null });
      }
    });

    const favorites = await this.favoriteRepository.getAll();
    favorites.albums.forEach((album) => {
      if (album.id === id) {
        this.favoriteRepository.deleteAlbum(id);
      }
    });

    await this.albumRepository.delete(id);
  }
}
