import mongoose, { Schema, Document, Types } from 'mongoose';

import { IUserModel } from './user.model.js';

export interface IChatModel extends Document {
  users: IUserModel[];
}

const schema = new Schema<IChatModel>(
  {
    users: [
      {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IChatModel>('Chat', schema);
