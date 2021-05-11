import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts, PostsSchema } from './schemas/post.schemas';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
  ],
})
export class PostsModule {}
