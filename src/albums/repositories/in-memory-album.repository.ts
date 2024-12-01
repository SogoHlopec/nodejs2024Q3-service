import { Injectable } from '@nestjs/common';
import { IAlbumRepository } from './album.repository.interface';
import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class InMemoryAlbumRepository implements IAlbumRepository {
  private albums: Album[] = [];

  getAll(): Album[] {
    return this.albums;
  }

  getById(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const Album = this.getById(id);
    Object.entries(updateAlbumDto).forEach(([key, value]) => {
      if (value !== undefined) {
        Album[key] = value;
      }
    });
    return Album;
  }

  delete(id: string): void {
    this.albums = this.albums.filter((Album) => Album.id !== id);
  }
}
