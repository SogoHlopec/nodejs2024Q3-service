import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
