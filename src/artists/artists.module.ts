import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryArtistRepository } from './repositories/in-memory-artist.repository';
import { InMemoryTrackRepository } from 'src/tracks/repositories/in-memory-track.repository';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [TracksModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryArtistRepository],
})
export class ArtistsModule {}
