import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Posts } from 'src/posts/schemas/post.schemas';
import { Document , Types  } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users extends Document {
 
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

  @Prop({ type: [Types.ObjectId], ref: 'Posts' } )
  posts: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
