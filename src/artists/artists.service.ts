import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { DbArtist } from './entities/artist.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryTrackRepository } from 'src/tracks/repositories/in-memory-track.repository';
import { InMemoryAlbumRepository } from 'src/albums/repositories/in-memory-album.repository';
import { InMemoryFavoritesRepository } from 'src/favorites/repositories/in-memory-favorites.repository';
import { DbArtistRepository } from './repositories/db-artist.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistRepository: DbArtistRepository,
    private readonly trackRepository: InMemoryTrackRepository,
    private readonly albumRepository: InMemoryAlbumRepository,
    private readonly favoriteRepository: InMemoryFavoritesRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<DbArtist> {
    const artist = await this.artistRepository.create(createArtistDto);
    return artist;
  }

  async findAll(): Promise<DbArtist[]> {
    const artists = await this.artistRepository.getAll();
    return artists;
  }

  async findOne(id: string): Promise<DbArtist> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = await this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<DbArtist> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = await this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const artistUpdate = await this.artistRepository.update(
      id,
      updateArtistDto,
    );
    return artistUpdate;
  }

  async remove(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = await this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const tracks = await this.trackRepository.getAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.trackRepository.update(track.id, {
          ...track,
          artistId: null,
        });
      }
    });

    const albums = await this.albumRepository.getAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumRepository.update(album.id, {
          ...album,
          artistId: null,
        });
      }
    });

    const favorites = await this.favoriteRepository.getAll();
    favorites.artists.forEach((artistId) => {
      if (artistId === id) {
        this.favoriteRepository.deleteArtist(id);
      }
    });

    await this.artistRepository.delete(id);
  }
}
