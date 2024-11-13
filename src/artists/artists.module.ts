import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryArtistRepository } from './repositories/in-memory-artist.repository';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [TracksModule, AlbumsModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryArtistRepository],
})
export class ArtistsModule {}
