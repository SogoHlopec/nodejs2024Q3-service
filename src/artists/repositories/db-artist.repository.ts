import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { DbArtist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IDbArtistRepository } from './db-artist.repository.interface';

@Injectable()
export class DbArtistRepository implements IDbArtistRepository {
  constructor(private readonly prisma: DbService) {}

  async getAll(): Promise<DbArtist[]> {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async getById(id: string): Promise<DbArtist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<DbArtist> {
    const newArtist = await this.prisma.artist.create({
      data: {
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
    });
    return newArtist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<DbArtist> {
    const artist = await this.prisma.artist.update({
      where: { id },
      data: {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      },
    });
    return artist;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
