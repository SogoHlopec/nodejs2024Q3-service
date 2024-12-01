import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbAlbum } from './entities/album.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto,
  ): Promise<DbAlbum> {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll(): Promise<DbAlbum[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DbAlbum> {
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ): Promise<DbAlbum> {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.albumsService.remove(id);
  }
}
