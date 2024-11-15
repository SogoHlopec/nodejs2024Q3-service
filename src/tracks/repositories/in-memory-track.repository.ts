import { Injectable } from '@nestjs/common';
import { Track } from '../entities/track.entity';
import { ITrackRepository } from './track.repository.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class InMemoryTrackRepository implements ITrackRepository {
  private tracks: Track[] = [];

  getAll(): Track[] {
    return this.tracks;
  }

  getById(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = new Track(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.getById(id);
    Object.entries(updateTrackDto).forEach(([key, value]) => {
      if (value !== undefined) {
        track[key] = value;
      }
    });
    return track;
  }

  delete(id: string): void {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
