import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';

export interface ITrackRepository {
  getAll(): Track[];
  getById(id: string): Track;
  create(createTrackDto: CreateTrackDto): Track;
  update(id: string, updateTrackDto: UpdateTrackDto): Track;
  delete(id: string): void;
}
