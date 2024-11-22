import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { DbTrackRepository } from './repositories/db-track.repository';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    DbModule,
  ],
  controllers: [TracksController],
  providers: [TracksService, DbTrackRepository],
  exports: [DbTrackRepository],
})
export class TracksModule {}
