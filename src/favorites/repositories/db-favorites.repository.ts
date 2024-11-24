import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../../db/db.service';
import { DbFavorite } from '../entities/favorite.entity';
import { IDbFavoritesRepository } from './db-favorites.repository.interface';

@Injectable()
export class DbFavoritesRepository implements IDbFavoritesRepository {
  constructor(private readonly prisma: DbService) {
    this.init();
  }

  private async init(): Promise<void> {
    const favorite = await this.prisma.favorite.findFirst({});
    if (!favorite) {
      await this.prisma.favorite.create({
        data: { id: uuidv4() },
      });
    }
  }

  private async getFavoriteId(): Promise<string> {
    const favorite = await this.prisma.favorite.findFirst({});
    return favorite.id;
  }

  async getAll(): Promise<DbFavorite> {
    const favorite = await this.prisma.favorite.findFirst({
      include: { artists: true, albums: true, tracks: true },
    });
    return {
      artists: favorite?.artists || [],
      albums: favorite?.albums || [],
      tracks: favorite?.tracks || [],
    };
  }

  async addTrack(id: string): Promise<void> {
    await this.prisma.favorite.update({
      where: { id: await this.getFavoriteId() },
      data: {
        tracks: {
          connect: { id },
        },
      },
    });
  }
  async deleteTrack(id: string): Promise<void> {
    await this.prisma.favorite.update({
      where: { id: await this.getFavoriteId() },
      data: {
        tracks: {
          disconnect: { id },
        },
      },
    });
  }

  async addAlbum(id: string): Promise<void> {
    await this.prisma.favorite.update({
      where: { id: await this.getFavoriteId() },
      data: {
        albums: {
          connect: { id },
        },
      },
    });
  }
  async deleteAlbum(id: string): Promise<void> {
    await this.prisma.favorite.update({
      where: { id: await this.getFavoriteId() },
      data: {
        albums: {
          disconnect: { id },
        },
      },
    });
  }

  async addArtist(id: string): Promise<void> {
    await this.prisma.favorite.update({
      where: { id: await this.getFavoriteId() },
      data: {
        artists: {
          connect: { id },
        },
      },
    });
  }
  async deleteArtist(id: string): Promise<void> {
    await this.prisma.favorite.update({
      where: { id: await this.getFavoriteId() },
      data: {
        artists: {
          disconnect: { id },
        },
      },
    });
  }
}
