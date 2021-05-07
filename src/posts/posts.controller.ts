import { Controller, Get, Post , HttpCode, HttpStatus, Param, Body, Put, Delete } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Posts } from './schemas/post.shemas';

@Controller('posts')
export class PostsController {

    constructor(private readonly postService:PostsService){}

    @Get()
    getAllPosts():Promise<Posts[]>{
        return this.postService.getAllPosts()  
    }

    @Get(':id')
    getById(@Param('id') id:string):Promise<Posts>{
        return this.postService.getPostById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() CreatePostDto:CreatePostDto):Promise<Posts>{
        return this.postService.createPost(CreatePostDto)
    }

    @Put(':id')
    update(@Body() updatePostDto:UpdatePostDto, @Param('id') id:string): Promise<Posts>{
        return this.postService.updatePost(id, updatePostDto)
    }

    @Delete(':id')
    deletePost(@Param('id') id:string): Promise<Posts>{
        return this.postService.deletePost(id)
    }
}

