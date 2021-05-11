import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard.t';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Posts } from './schemas/post.schemas';

@UseGuards(JwtAuthGuard)
@ApiTags('Posts')
@Controller('posts')
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
  create(@Body() CreatePostDto: CreatePostDto ,@Req() req  ): Promise<Posts> {
    CreatePostDto.author = req.user.userId
    return this.postService.createPost(CreatePostDto);
  }

  @Put(':id')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
    @Req() req : Request
  ): Promise<Posts> {
    return this.postService.updatePost(id, updatePostDto ,req);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): Promise<Posts> {
    return this.postService.deletePost(id);
  }
}
function Rec() {
  throw new Error('Function not implemented.');
}

