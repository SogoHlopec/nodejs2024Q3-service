import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsOptional()
  albumId: string | null; // refers to

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
