import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryTrackRepository } from './repositories/in-memory-track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly trackRepository: InMemoryTrackRepository) {}

  create(createTrackDto: CreateTrackDto): Track {
    const track = this.trackRepository.create(createTrackDto);
    return track;
  }

  findAll(): Track[] {
    const tracks = this.trackRepository.getAll();
    return tracks;
  }

  findOne(id: string): Track {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const trackUpdate = this.trackRepository.update(id, updateTrackDto);
    return trackUpdate;
  }

  remove(id: string) {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    this.trackRepository.delete(id);
  }
}
