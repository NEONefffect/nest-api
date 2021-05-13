import {
  IsDateString,
  IsMongoId,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import * as mongoose from 'mongoose';

export class CreatePostDto {
  @Length(3, 256)
  @IsString()
  title: string;

  @MinLength(3)
  @IsString()
  content: string;

  author?:string

}
