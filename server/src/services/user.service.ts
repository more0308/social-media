import { AbstractService } from './abstract.service.js';
import { Model } from 'mongoose';
import UserModel, { IUserModel } from '../db/models/user.model.js';
import PostModel, { IPostModel } from '../db/models/post.model.js';

export class UserService extends AbstractService {
  protected readonly model: Model<IUserModel> = UserModel;
  protected readonly postModel: Model<IPostModel> = PostModel;

  /**
   * Getting user details.
   * @param {string} login - User login.
   * @param {string} userId - Current user ID.
   * @returns Promise<Object> -  User data and posts.
   */
  public async getUserDetails(login: string, userId: string) {
    const pipeline = [
      { $match: { login: login } },
      {
        $addFields: {
          is_following: { $in: [userId, '$followers'] },
          followers_count: { $size: '$followers' },
          following_count: { $size: '$following' },
        },
      },
      { $limit: 1 },
    ];

    const result = await this.model.aggregate(pipeline);
    return result[0];
  }

  /**
   * Retrieving user posts.
   * @param {string} userId - Current user ID.
   * @returns Promise<Object> - User data and posts.
   */
  public async getUserPosts(userId: string) {
    return this.postModel.find({ user: userId }).populate({
      path: 'images',
      select: 'url',
    });
  }

  /**
   * Getting a list of users.
   * @param {string} query - Search query.
   * @param {string} userId - Current user ID.
   * @returns Promise<Array> - List of users.
   */
  public async getUsers(query: string, userId: string) {
    return this.model.find({ _id: { $ne: userId }, login: { $regex: query, $options: 'i' } }).limit(10);
  }

  /**
   * User follow.
   * @param {string} userId - Current user ID.
   * @param {string} targetId - Target user ID.
   */
  public async follow(userId: string, targetId: string) {
    await this.model.findByIdAndUpdate(userId, { $addToSet: { following: targetId } });
    await this.model.findByIdAndUpdate(targetId, { $addToSet: { followers: userId } });
  }

  /**
   * Stop follow a user.
   * @param {string} userId - Current user ID.
   * @param {string} targetId - Target user ID.
   */
  public async unfollow(userId: string, targetId: string) {
    await this.model.findByIdAndUpdate(userId, { $pull: { following: targetId } });
    await this.model.findByIdAndUpdate(targetId, { $pull: { followers: userId } });
  }
}
