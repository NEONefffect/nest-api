import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schemas/user.schemas';
import { Auth } from 'src/auth/auth.decorator';
import { IRequsetUser } from 'src/common/user.interface';


@Auth('User',"Admin")
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Auth('Admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  @Auth('Admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
   @Body() updateUserDto: UpdateUserDto,
   @Req() { user }:IRequsetUser
   ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,
  @Req() { user }:IRequsetUser
  ) {
    return this.usersService.remove(id,user);
  }
}
