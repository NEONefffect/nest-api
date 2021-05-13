import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


const saltRounds = 5;


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async login(req): Promise<any>  {
    const { login ,password } = req
    const user = await this.validateUser( login, password )
    return this.generateToken(user)
}

  private async validateUser(login: string, password: string){
    const user = await this.usersService.findOne(login);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
        return user;
    }
    throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
}

  private async generateToken(user) {
    const payload = {login: user.login, id: user.id, role: user.role}
    return {
        token: this.jwtService.sign(payload)
    }
}
async registration(userDto: CreateUserDto) {
  const candidate = await this.usersService.findOne(userDto.login);
  if (candidate) {
      throw new HttpException('Пользователь с таким login существует', HttpStatus.BAD_REQUEST);
  }
  const hashPassword = await bcrypt.hash(userDto.password, saltRounds);
  userDto.password = hashPassword
  const user = await this.usersService.create(userDto)
  return this.generateToken(user)
}
}
