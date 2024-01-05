import mongoose, { Schema, Document, Types } from 'mongoose';

import { IUserModel } from './user.model.js';

export interface IPostModel extends Document {
  user: IUserModel;
  description: string;
  images: Types.ObjectId[];
  likes: Types.ObjectId[];
}

const schema = new Schema<IPostModel>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    images: [
      {
        type: Types.ObjectId,
        ref: 'Image',
        required: true,
      },
    ],
    likes: [
      {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IPostModel>('Post', schema);
