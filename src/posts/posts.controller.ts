import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Posts } from './schemas/post.schemas';
import { IRequsetUser } from '../common/interface/user.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Auth('Admin', 'User')
@ApiTags('Posts')
@Controller('posts')
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Posts> {
    return this.postService.getPostById(id);
  }

  @Post()
  create(
    @Body() CreatePostDto: CreatePostDto,
    @Req() { user }: IRequsetUser,
  ): Promise<Posts> {
    const userId = user.id;
    return this.postService.createPost(CreatePostDto, userId);
  }

  @Put(':id')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
    @Req() { user }: IRequsetUser,
  ): Promise<Posts> {
    return this.postService.updatePost(id, updatePostDto, user);
  }

  @Delete(':id')
  deletePost(
    @Param('id') id: string,
    @Req() { user }: IRequsetUser,
  ): Promise<Posts> {
    return this.postService.deletePost(id, user);
  }
}
