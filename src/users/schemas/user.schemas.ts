import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ enum: ['User', 'Admin'] })
  role: string;

  @Prop({ unique: true })
  login: string;

  @Prop()
  password: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Posts' })
  posts: any;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
