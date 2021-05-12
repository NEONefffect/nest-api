import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Posts, PostDocument } from './schemas/post.schemas';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IUser } from 'src/common/user.interface';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>,
  ) {}

  async getAllPosts(): Promise<Posts[]> {
    return this.postModel.find().exec();
  }

  async getPostById(id: string): Promise<Posts> {
    return this.postModel.findById(id);
  }

  async createPost(postDto: CreatePostDto): Promise<Posts> {
    const newPost = new this.postModel(postDto);
    console.log(newPost,postDto)
    return newPost.save();
  }

  async deletePost(id: string, user:IUser): Promise<Posts> {
    const post = await this.getPostById(id)
    if(post.author.toString() === user.userId || user.role === 'Admin'){
      return this.postModel.findByIdAndRemove(id);
    }
    
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto ,user:IUser) {
    const post = await this.getPostById(id)
    if(post.author.toString() === user.userId || user.role === 'Admin'){
      return this.postModel.findByIdAndUpdate(id, updatePostDto);
    }
     
  }
}
