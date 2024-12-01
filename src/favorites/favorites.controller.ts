import { Controller, Post, Param, Delete, Get, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto/response-favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll(): Promise<FavoritesResponseDto> {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string): Promise<{ message: string }> {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    return await this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string): Promise<{ message: string }> {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string): Promise<{ message: string }> {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    return await this.favoritesService.deleteArtist(id);
  }
}
