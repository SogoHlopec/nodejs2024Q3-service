import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryTrackRepository } from './repositories/in-memory-track.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [TracksService, InMemoryTrackRepository],
  exports: [InMemoryTrackRepository],
})
export class TracksModule {}
