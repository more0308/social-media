import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, Types } from 'mongoose';

const passwordSaltRounds = 10;

export interface IUserModel extends Document {
  name: string;
  login: string;
  email: string;
  password: string;
  avatar: string;
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  likes: Types.ObjectId[];

  validPassword(password: string): Promise<boolean>;
  setHashPassword(password: string): Promise<string>;
}

const schema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      max: 100,
      trim: true,
      required: true,
    },
    login: {
      type: String,
      max: 100,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      max: 100,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-IdxG0rzm3CjlqMbgKqMSGHrXds3WGp4n8DdPY3BPA&s',
    },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
  },
);

schema.method('validPassword', function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
});

schema.method('setHashPassword', function (password: string): Promise<string> {
  return new Promise((resolve, reject) =>
    bcrypt.genSalt(
      passwordSaltRounds,
      (err, salt) =>
        (err && reject(err)) ||
        bcrypt.hash(password, salt, (err, hash) => (err && reject(err)) || resolve((this.password = hash))),
    ),
  );
});
export default mongoose.model<IUserModel>('User', schema);
