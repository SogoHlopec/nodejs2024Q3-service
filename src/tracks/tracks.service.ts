import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { DbTrack } from './entities/track.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbTrackRepository } from './repositories/db-track.repository';
import { DbFavoritesRepository } from 'src/favorites/repositories/db-favorites.repository';

@Injectable()
export class TracksService {
  constructor(
    private readonly trackRepository: DbTrackRepository,
    private readonly favoriteRepository: DbFavoritesRepository,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<DbTrack> {
    const track = await this.trackRepository.create(createTrackDto);
    return track;
  }

  async findAll(): Promise<DbTrack[]> {
    const tracks = await this.trackRepository.getAll();
    return tracks;
  }

  async findOne(id: string): Promise<DbTrack> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = await this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<DbTrack> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = await this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const trackUpdate = await this.trackRepository.update(id, updateTrackDto);
    return trackUpdate;
  }

  async remove(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = await this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    await this.trackRepository.delete(id);

    const favorites = await this.favoriteRepository.getAll();
    favorites.tracks.forEach((track) => {
      if (track.id === id) {
        this.favoriteRepository.deleteTrack(id);
      }
    });
  }
}
