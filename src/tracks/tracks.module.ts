import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryTrackRepository } from './repositories/in-memory-track.repository';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryTrackRepository],
  exports: [InMemoryTrackRepository],
})
export class TracksModule {}
