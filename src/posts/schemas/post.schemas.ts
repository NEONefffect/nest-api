import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  author: MongooseSchema.Types.ObjectId | string;
}
export const PostsSchema = SchemaFactory.createForClass(Posts);
