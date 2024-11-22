import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponseDto } from './dto/response-favorites.dto';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { DbFavoritesRepository } from './repositories/db-favorites.repository';
import { DbArtistRepository } from 'src/artists/repositories/db-artist.repository';
import { DbTrackRepository } from 'src/tracks/repositories/db-track.repository';
import { DBAlbumRepository } from 'src/albums/repositories/db-album.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: DbFavoritesRepository,
    private readonly artistRepository: DbArtistRepository,
    private readonly trackRepository: DbTrackRepository,
    private readonly albumRepository: DBAlbumRepository,
  ) {}

  async getAll(): Promise<FavoritesResponseDto> {
    const favorite = await this.favoritesRepository.getAll();
    const artists = favorite.artists;
    const albums = favorite.albums;
    const tracks = favorite.tracks;
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string): Promise<{ message: string }> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = await this.trackRepository.getById(id);
    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }

    const favorite = await this.favoritesRepository.getAll();
    const isAlreadyFavorite = favorite.tracks.some((t) => t.id === id);
    if (!isAlreadyFavorite) {
      this.favoritesRepository.addTrack(id);
    }
    return { message: 'Track added to favorites' };
  }

  async deleteTrack(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }

    const favorite = await this.favoritesRepository.getAll();
    const isAlreadyFavorite = favorite.tracks.some((t) => t.id === id);
    if (!isAlreadyFavorite) {
      throw new NotFoundException('Track is not favorite');
    }
    this.favoritesRepository.deleteTrack(id);
  }

  async addAlbum(id: string): Promise<{ message: string }> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }

    const favorite = await this.favoritesRepository.getAll();
    const isAlreadyFavorite = favorite.albums.some((t) => t.id === id);
    if (!isAlreadyFavorite) {
      this.favoritesRepository.addAlbum(id);
    }

    return { message: 'Album added to favorites' };
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }

    const favorite = await this.favoritesRepository.getAll();
    const isAlreadyFavorite = favorite.albums.some((t) => t.id === id);
    if (!isAlreadyFavorite) {
      throw new NotFoundException('Album is not favorite');
    }
    this.favoritesRepository.deleteAlbum(id);
  }

  async addArtist(id: string): Promise<{ message: string }> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }

    const favorite = await this.favoritesRepository.getAll();
    const isAlreadyFavorite = favorite.artists.some((t) => t.id === id);
    if (!isAlreadyFavorite) {
      this.favoritesRepository.addArtist(id);
    }

    return { message: 'Artist added to favorites' };
  }

  async deleteArtist(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }

    const favorite = await this.favoritesRepository.getAll();
    const isAlreadyFavorite = favorite.artists.some((t) => t.id === id);
    if (!isAlreadyFavorite) {
      throw new NotFoundException('Artist is not favorite');
    }
    this.favoritesRepository.deleteArtist(id);
  }
}
