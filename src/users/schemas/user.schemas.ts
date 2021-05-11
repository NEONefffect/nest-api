import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Posts } from 'src/posts/schemas/post.shemas';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }] })
  posts: Posts[];
}
export const UsersSchema = SchemaFactory.createForClass(Users);
