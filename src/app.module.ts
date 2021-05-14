import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService
  ],
})
export class AppModule {}
