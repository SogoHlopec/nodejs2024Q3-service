import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryAlbumRepository } from './repositories/in-memory-album.repository';
import { Album } from './entities/album.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { InMemoryTrackRepository } from 'src/tracks/repositories/in-memory-track.repository';
import { InMemoryFavoritesRepository } from 'src/favorites/repositories/in-memory-favorites.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumRepository: InMemoryAlbumRepository,
    private readonly trackRepository: InMemoryTrackRepository,
    private readonly favoriteRepository: InMemoryFavoritesRepository,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = this.albumRepository.create(createAlbumDto);
    return album;
  }

  findAll(): Album[] {
    const albums = this.albumRepository.getAll();
    return albums;
  }

  findOne(id: string): Album {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const albumUpdate = this.albumRepository.update(id, updateAlbumDto);
    return albumUpdate;
  }

  remove(id: string): void {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
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

    this.albumRepository.delete(id);
  }
}
