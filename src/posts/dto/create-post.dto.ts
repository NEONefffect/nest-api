import {
  IsDateString,
  IsMongoId,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @Length(3, 256)
  @IsString()
  title: string;

  @MinLength(3)
  @IsString()
  content: string;

  @IsMongoId()
  author: string;

  @IsDateString()
  date: Date;
}
