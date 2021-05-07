import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schemas';


@Injectable()
export class AuthService {
    constructor(private userModel: Model<UserDocument>) {}

    async validateUser(login: string, password: string): Promise<any> {
      const user = await this.userModel.findOne({login:login});
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
}
