import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryArtistRepository } from './repositories/in-memory-artist.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { validateUuid } from 'src/users/utils/uuid-validator.util';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryTrackRepository } from 'src/tracks/repositories/in-memory-track.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistRepository: InMemoryArtistRepository,
    private readonly trackRepository: InMemoryTrackRepository,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = this.artistRepository.create(createArtistDto);
    return artist;
  }

  findAll(): Artist[] {
    const artists = this.artistRepository.getAll();
    return artists;
  }

  findOne(id: string): Artist {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const artistUpdate = this.artistRepository.update(id, updateArtistDto);
    return artistUpdate;
  }

  remove(id: string): void {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    console.log('test1');

    try {
      const tracks = this.trackRepository.getAll();
      console.log(tracks);
      tracks.forEach((track) => {
        console.log('test2');

        if (track.artistId === id) {
          console.log('test3');

          this.trackRepository.update(track.id, { ...track, artistId: null });
          console.log(track);
        }
      });
    } catch (error) {
      console.log(error);
    }

    this.artistRepository.delete(id);
  }
}
