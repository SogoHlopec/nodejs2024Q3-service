import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { DbTrack } from '../entities/track.entity';

export interface IDbTrackRepository {
  getAll(): Promise<DbTrack[]>;
  getById(id: string): Promise<DbTrack>;
  create(createTrackDto: CreateTrackDto): Promise<DbTrack>;
  update(id: string, updateTrackDto: UpdateTrackDto): Promise<DbTrack>;
  delete(id: string): Promise<void>;
}
