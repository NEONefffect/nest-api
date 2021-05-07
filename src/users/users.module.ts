import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './schemas/user.schemas';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {name: Users.name, schema: UsersSchema}
    ])
  ]
})
export class UsersModule {}
