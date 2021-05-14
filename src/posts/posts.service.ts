import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash'

import { Posts, PostDocument } from './schemas/post.schemas';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IUser } from 'src/common/user.interface';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>,
  ) { }

  async getAllPosts(): Promise<Posts[]> {
    return this.postModel.find().exec();
  }

  async getPostById(id: string): Promise<Posts> {
    return await this.postModel.findById(id).populate('author').exec()
  }

  async createPost(postDto: CreatePostDto, author: string): Promise<Posts> {
    const newPost = new this.postModel({ ...postDto, author });
    console.log(newPost, postDto)
    return newPost.save();
  }

  async deletePost(id: string, { id: author, role }: IUser): Promise<Posts> {  
    return this.postModel.findOneAndRemove(_.omit({ _id: id, author },
      [role === 'Admin' ? 'author' : '']),   
      );
  
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto, { id: author, role }: IUser) {
    return await this.postModel.findOneAndUpdate(_.omit({ _id: id, author },
      [role === 'Admin' ? 'author' : '']), 
      { $set: updatePostDto }, 
      { new: true, }
      )
  }
}
