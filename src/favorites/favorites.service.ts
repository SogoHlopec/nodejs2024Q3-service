import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponseDto } from './dto/response-favorites.dto';
import { InMemoryFavoritesRepository } from './repositories/in-memory-favorites.repository';
import { InMemoryArtistRepository } from 'src/artists/repositories/in-memory-artist.repository';
import { InMemoryTrackRepository } from 'src/tracks/repositories/in-memory-track.repository';
import { InMemoryAlbumRepository } from 'src/albums/repositories/in-memory-album.repository';
import { validateUuid } from 'src/users/utils/uuid-validator.util';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: InMemoryFavoritesRepository,
    private readonly artistRepository: InMemoryArtistRepository,
    private readonly trackRepository: InMemoryTrackRepository,
    private readonly albumRepository: InMemoryAlbumRepository,
  ) {}

  getAll(): FavoritesResponseDto {
    const favorite = this.favoritesRepository.getAll();
    const artists = favorite.artists.map((artistId) =>
      this.artistRepository.getById(artistId),
    );
    const albums = favorite.albums.map((albumId) =>
      this.albumRepository.getById(albumId),
    );
    const tracks = favorite.tracks.map((trackId) =>
      this.trackRepository.getById(trackId),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string): { message: string } {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    if (!this.favoritesRepository.getAll().tracks.includes(id)) {
      this.favoritesRepository.addTrack(id);
    }
    return { message: 'Track added to favorites' };
  }

  deleteTrack(id: string): void {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }

    if (!this.favoritesRepository.getAll().tracks.includes(id)) {
      throw new NotFoundException('Track is not favorite');
    }
    this.favoritesRepository.deleteTrack(id);
  }

  addAlbum(id: string): { message: string } {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    if (!this.favoritesRepository.getAll().albums.includes(id)) {
      this.favoritesRepository.addAlbum(id);
    }

    return { message: 'Album added to favorites' };
  }

  deleteAlbum(id: string): void {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }

    if (!this.favoritesRepository.getAll().albums.includes(id)) {
      throw new NotFoundException('Album is not favorite');
    }
    this.favoritesRepository.deleteAlbum(id);
  }

  addArtist(id: string): { message: string } {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    if (!this.favoritesRepository.getAll().artists.includes(id)) {
      this.favoritesRepository.addArtist(id);
    }

    return { message: 'Artist added to favorites' };
  }

  deleteArtist(id: string): void {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }

    if (!this.favoritesRepository.getAll().artists.includes(id)) {
      throw new NotFoundException('Artist is not favorite');
    }
    this.favoritesRepository.deleteArtist(id);
  }
}
