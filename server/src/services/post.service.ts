import { Model } from 'mongoose';
import { AbstractService } from './abstract.service.js';
import PostModel, { IPostModel } from '../db/models/post.model.js';

export class PostService extends AbstractService {
  protected readonly model: Model<IPostModel> = PostModel;

  /**
   * Get post by ID.
   * @param {string} postId - Post ID.
   */
  public async getPostById(postId: string) {
    return this.model
      .findById(postId)
      .populate({
        path: 'images',
        select: 'url',
      })
      .populate({
        path: 'user',
        select: 'login',
      });
  }

  /**
   * Get latest posts.
   */
  public async getRecentPosts() {
    return this.model
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate({
        path: 'images',
        select: 'url',
      })
      .populate({
        path: 'user',
        select: 'login',
      });
  }

  /**
   * Like the post.
   * @param {string} postId - Post ID.
   * @param {string} userId - Current user ID.
   */
  public async likePost(postId: string, userId: string) {
    await this.model.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
  }

  /**
   * Dislike the post.
   * @param {string} postId - Post ID.
   * @param {string} userId - Current user ID.
   */
  public async dislikePost(postId: string, userId: string) {
    await this.model.findByIdAndUpdate(postId, { $pull: { likes: userId } });
  }
}
