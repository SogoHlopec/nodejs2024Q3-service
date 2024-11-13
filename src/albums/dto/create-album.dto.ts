import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  artistId: string | null; // refers to Artist
}
