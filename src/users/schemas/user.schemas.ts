import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Posts } from 'src/posts/schemas/post.schemas';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Post } from '@nestjs/common';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  email: string;

  @Prop({ enum: ['User', 'Admin'] })
  role: string;

  @Prop()
  login: string;

  @Prop()
  password: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Posts' })
  posts: any;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
