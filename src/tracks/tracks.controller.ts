import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbTrack } from './entities/track.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createTrackDto: CreateTrackDto,
  ): Promise<DbTrack> {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll(): Promise<DbTrack[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DbTrack> {
    return await this.tracksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ): Promise<DbTrack> {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.tracksService.remove(id);
  }
}
