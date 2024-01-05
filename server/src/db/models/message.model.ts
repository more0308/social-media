import mongoose, { Schema, Document } from 'mongoose';

import { IUserModel } from './user.model.js';
import { IChatModel } from './chat.model.js';

import mongoosePaginate from 'mongoose-paginate';

export interface IMessageModel extends Document {
  sender: IUserModel;
  readBy: IUserModel[];
  chat: IChatModel;
  text: string;
}

const schema = new Schema<IMessageModel>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    text: { type: String },
  },
  {
    timestamps: true,
  },
);

schema.plugin(mongoosePaginate);

export default mongoose.model<IMessageModel>('Message', schema);
