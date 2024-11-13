import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryAlbumRepository } from './repositories/in-memory-album.repository';
import { Album } from './entities/album.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumRepository: InMemoryAlbumRepository) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = this.albumRepository.create(createAlbumDto);
    return album;
  }

  findAll(): Album[] {
    const albums = this.albumRepository.getAll();
    return albums;
  }

  findOne(id: string): Album {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const albumUpdate = this.albumRepository.update(id, updateAlbumDto);
    return albumUpdate;
  }

  remove(id: string): void {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.albumRepository.delete(id);
  }
}
