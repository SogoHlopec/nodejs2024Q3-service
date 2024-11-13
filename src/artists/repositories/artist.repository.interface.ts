import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

export interface IArtistRepository {
  getAll(): Artist[];
  getById(id: string): Artist;
  create(createArtistDto: CreateArtistDto): Artist;
  update(id: string, updateArtistDto: UpdateArtistDto): Artist;
  delete(id: string): void;
}
