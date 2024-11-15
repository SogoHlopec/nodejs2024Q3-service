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
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body(new ValidationPipe()) createTrackDto: CreateTrackDto): Track {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll(): Track[] {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Track {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.tracksService.remove(id);
  }
}
