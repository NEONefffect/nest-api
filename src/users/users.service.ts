import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Users, UserDocument } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PostDocument, Posts } from 'src/posts/schemas/post.schemas';
import { IUser } from 'src/common/interface/user.interface';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>,
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<Users | Error> {
    try {
      const user = await this.userModel.findById(id);
      const post = await this.postModel.find({ author: user.id });
      user.posts = post;
      return user;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    return this.userModel.findOneAndUpdate(
      _.omit({ _id: id, login: user.login }, [
        user.role === 'Admin' ? 'login' : '',
      ]),
      { $set: updateUserDto },
      { new: true },
    );
  }

  async remove(id: string, user: IUser) {
    return this.userModel.findOneAndDelete(
      _.omit({ _id: id, login: user.login }, [
        user.role === 'Admin' ? 'login' : '',
      ]),
    );
  }

  async findOne(login: string): Promise<Users> {
    return this.userModel.findOne({ login: login });
  }
}
