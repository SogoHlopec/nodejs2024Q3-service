import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { DbAlbum } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { IDbAlbumRepository } from './db-album.repository.interface';

@Injectable()
export class DBAlbumRepository implements IDbAlbumRepository {
  constructor(private readonly prisma: DbService) {}

  async getAll(): Promise<DbAlbum[]> {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async getById(id: string): Promise<DbAlbum> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<DbAlbum> {
    const newAlbum = await this.prisma.album.create({
      data: {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId,
      },
    });
    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<DbAlbum> {
    const album = await this.prisma.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId,
      },
    });
    return album;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
