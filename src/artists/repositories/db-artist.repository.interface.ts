import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { DbArtist } from '../entities/artist.entity';

export interface IDbArtistRepository {
  getAll(): Promise<DbArtist[]>;
  getById(id: string): Promise<DbArtist>;
  create(createArtistDto: CreateArtistDto): Promise<DbArtist>;
  update(id: string, updateArtistDto: UpdateArtistDto): Promise<DbArtist>;
  delete(id: string): Promise<void>;
}
