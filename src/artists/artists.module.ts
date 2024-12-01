import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { DbArtistRepository } from './repositories/db-artist.repository';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    DbModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, DbArtistRepository],
  exports: [DbArtistRepository],
})
export class ArtistsModule {}
