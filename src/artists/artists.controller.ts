import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbArtist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
  ): Promise<DbArtist> {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<DbArtist[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DbArtist> {
    return await this.artistsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ): Promise<DbArtist> {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.artistsService.remove(id);
  }
}
