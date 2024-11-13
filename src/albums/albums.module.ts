import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumRepository } from './repositories/in-memory-album.repository';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [TracksModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryAlbumRepository],
  exports: [InMemoryAlbumRepository],
})
export class AlbumsModule {}
