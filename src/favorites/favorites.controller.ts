import { Controller, Post, Param, Delete, Get, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto/response-favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll(): FavoritesResponseDto {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string): { message: string } {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string): { message: string } {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): void {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string): { message: string } {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): void {
    return this.favoritesService.deleteArtist(id);
  }
}
