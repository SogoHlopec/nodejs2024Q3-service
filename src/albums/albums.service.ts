import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbAlbum } from './entities/album.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { InMemoryTrackRepository } from 'src/tracks/repositories/in-memory-track.repository';
import { InMemoryFavoritesRepository } from 'src/favorites/repositories/in-memory-favorites.repository';
import { DBAlbumRepository } from './repositories/db-album.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumRepository: DBAlbumRepository,
    private readonly trackRepository: InMemoryTrackRepository,
    private readonly favoriteRepository: InMemoryFavoritesRepository,
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

    const tracks = this.trackRepository.getAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.trackRepository.update(track.id, { ...track, albumId: null });
      }
    });

    const favorites = this.favoriteRepository.getAll();
    favorites.albums.forEach((albumId) => {
      if (albumId === id) {
        this.favoriteRepository.deleteAlbum(id);
      }
    });

    await this.albumRepository.delete(id);
  }
}
