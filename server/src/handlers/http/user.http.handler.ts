import { Request, Response } from 'express';
import { IUserModel } from '../../db/models/user.model.js';
import { UserService } from '../../services/user.service.js';

export class UserHttpHandler {
  protected readonly service: UserService = new UserService();

  /**
   * Get user information via login
   * @GET api/user/:login
   * @access private
   */
  public async get(req: Request, res: Response): Promise<void> {
    const { login } = req.params;
    const user = req.user as IUserModel;

    const userDetail = await this.service.getUserDetails(login, user._id);
    const userPosts = await this.service.getUserPosts(userDetail);

    res.sendResponse({ data: { user: userDetail, userPosts } });
  }

  /**
   * Get users by login
   * @GET api/user
   * @access private
   */
  public async list(req: Request, res: Response): Promise<void> {
    const { query } = req.query;
    const user = req.user as IUserModel;

    const users = await this.service.getUsers(query as string, user._id);

    res.sendResponse({ data: { users } });
  }

  /**
   * Follow user
   * @POST api/user/follow
   * @access private
   */
  public async follow(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    const user = req.user as IUserModel;

    await this.service.follow(user._id, id);

    res.sendResponse({ data: {}, message: 'Followed successfully' });
  }

  /**
   * Unfollow user
   * @POST api/user/unfollow
   * @access private
   */
  public async unfollow(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    const user = req.user as IUserModel;

    await this.service.unfollow(user._id, id);

    res.sendResponse({ data: {}, message: 'Unfollowed successfully' });
  }
}
