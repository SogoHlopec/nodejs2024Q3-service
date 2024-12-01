import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { DBAlbumRepository } from './repositories/db-album.repository';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    DbModule,
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, DBAlbumRepository],
  exports: [DBAlbumRepository],
})
export class AlbumsModule {}
