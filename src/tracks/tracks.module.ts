import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { DbTrackRepository } from './repositories/db-track.repository';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [TracksService, DbTrackRepository],
  exports: [DbTrackRepository],
})
export class TracksModule {}
