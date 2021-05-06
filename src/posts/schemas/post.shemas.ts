import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
export type PostDocument = Posts & Document;

@Schema()
export class Posts{

    @Prop({ required: true })
    title: string;

    @Prop()
    content: string;

    @Prop({default : Date.now})
    date : Date;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],required: true })
    // author: User[]


}
export const PostsSchema = SchemaFactory.createForClass(Posts)