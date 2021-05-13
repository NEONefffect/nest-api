import {
  IsDateString,
  IsMongoId,
  IsString,
  Length,
  MinLength,
  IsEmail,
  IsEnum,
  ArrayContains,
  IsArray,
} from 'class-validator';

import { Posts } from 'src/posts/schemas/post.schemas';

export class CreateUserDto {
  @Length(3, 20)
  @IsString()
  firstName: string;

  @Length(3, 20)
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
  
  @IsEnum(['Admin','User'])
  role: string;

  @Length(6, 15)
  @IsString()
  login: string;

  @Length(6, 15)
  @IsString()
  password: string;
  
}

