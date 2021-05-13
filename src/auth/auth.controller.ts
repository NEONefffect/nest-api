import { Body, Controller, Post ,Request } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() req) {
        return this.authService.login(req);
  
    }
    
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
