import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './configure.root';
import { CommonModule } from './common/common.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule,
    configModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
