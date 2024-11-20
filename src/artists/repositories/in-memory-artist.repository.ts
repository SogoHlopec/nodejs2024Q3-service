import { Injectable } from '@nestjs/common';
import { IArtistRepository } from './artist.repository.interface';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class InMemoryArtistRepository implements IArtistRepository {
  private artists: Artist[] = [];

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist = new Artist(createArtistDto.name, createArtistDto.grammy);
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.getById(id);
    Object.entries(updateArtistDto).forEach(([key, value]) => {
      if (value !== undefined) {
        artist[key] = value;
      }
    });
    return artist;
  }

  delete(id: string): void {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
