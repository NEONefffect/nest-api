import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsEmail,
  IsEnum,
} from 'class-validator';


export class CreateUserDto {
  @Length(3, 20)
  @IsString()
  firstName: string;

  @Length(3, 20)
  @IsString()
  lastName: string;

  @ApiProperty({ format: 'email' })
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

