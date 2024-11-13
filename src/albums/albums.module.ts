import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumRepository } from './repositories/in-memory-album.repository';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryAlbumRepository],
})
export class AlbumsModule {}
