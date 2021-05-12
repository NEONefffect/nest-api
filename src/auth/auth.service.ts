import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (user && user.password === password) {
       return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { login: user.login, id: user.id , role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
