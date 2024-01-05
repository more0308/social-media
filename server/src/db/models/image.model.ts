import mongoose, { Schema, Document } from 'mongoose';

export interface IImageModel extends Document {
  publish_id: string;
  url: string;
}

const schema = new Schema<IImageModel>(
  {
    publish_id: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IImageModel>('Image', schema);
