import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './schemas/user.schemas';
import { PostsModule } from 'src/posts/posts.module';
import { Posts, PostsSchema } from 'src/posts/schemas/post.schemas';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
