import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { DbFavoritesRepository } from './repositories/db-favorites.repository';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    DbModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, DbFavoritesRepository],
  exports: [DbFavoritesRepository],
})
export class FavoritesModule {}
