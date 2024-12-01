import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { DbTrack } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { IDbTrackRepository } from './db-track.repository.interface';

@Injectable()
export class DbTrackRepository implements IDbTrackRepository {
  constructor(private readonly prisma: DbService) {}

  async getAll(): Promise<DbTrack[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async getById(id: string): Promise<DbTrack> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (track) {
      return track;
    }
  }

  async create(createTrackDto: CreateTrackDto): Promise<DbTrack> {
    const newTrack = await this.prisma.track.create({
      data: {
        name: createTrackDto.name,
        duration: createTrackDto.duration,
        artistId: createTrackDto.artistId,
        albumId: createTrackDto.albumId,
      },
    });
    return newTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<DbTrack> {
    const track = await this.prisma.track.update({
      where: { id },
      data: {
        name: updateTrackDto.name,
        duration: updateTrackDto.duration,
        artistId: updateTrackDto.artistId,
        albumId: updateTrackDto.albumId,
      },
    });
    return track;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.track.delete({
      where: { id },
    });
  }
}
