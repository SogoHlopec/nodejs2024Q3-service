import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryArtistRepository } from './repositories/in-memory-artist.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryTrackRepository } from 'src/tracks/repositories/in-memory-track.repository';
import { InMemoryAlbumRepository } from 'src/albums/repositories/in-memory-album.repository';
import { InMemoryFavoritesRepository } from 'src/favorites/repositories/in-memory-favorites.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistRepository: InMemoryArtistRepository,
    private readonly trackRepository: InMemoryTrackRepository,
    private readonly albumRepository: InMemoryAlbumRepository,
    private readonly favoriteRepository: InMemoryFavoritesRepository,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = this.artistRepository.create(createArtistDto);
    return artist;
  }

  findAll(): Artist[] {
    const artists = this.artistRepository.getAll();
    return artists;
  }

  findOne(id: string): Artist {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const artistUpdate = this.artistRepository.update(id, updateArtistDto);
    return artistUpdate;
  }

  remove(id: string): void {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const tracks = this.trackRepository.getAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.trackRepository.update(track.id, { ...track, artistId: null });
      }
    });

    const albums = this.albumRepository.getAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumRepository.update(album.id, { ...album, artistId: null });
      }
    });

    const favorites = this.favoriteRepository.getAll();
    favorites.artists.forEach((artistId) => {
      if (artistId === id) {
        this.favoriteRepository.deleteArtist(id);
      }
    });

    this.artistRepository.delete(id);
  }
}
