import { PostService } from '../../services/post.service.js';
import { Request, Response } from 'express';
import { IUserModel } from '../../db/models/user.model.js';
import { ParamException } from '../../exceptions/param.exception.js';
import { ImageService } from '../../services/image.service.js';

export class PostHttpHandler {
  protected readonly service: PostService = new PostService();
  protected readonly imageService: ImageService = new ImageService();

  /**
   * Create a post
   * @POST api/post
   * @access private
   */
  async create(req: Request, res: Response): Promise<void> {
    if (!Array.isArray(req.files)) {
      return res.errorResponse(new ParamException());
    }

    const { description } = req.body;

    const images = await this.imageService.uploads(req.files);
    const imageIds = await this.imageService.save(images);

    await this.service.create({
      user: req.user,
      description,
      images: imageIds,
    });

    res.sendResponse({
      data: {},
      message: 'Successful post creation',
    });
  }

  /**
   * Get a post
   * @GET api/post/:id
   * @access private
   */
  async get(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const post = await this.service.getPostById(id);

    res.sendResponse({
      data: { post },
    });
  }

  /**
   * Get posts
   * @GET api/post
   * @access private
   */
  async list(req: Request, res: Response): Promise<void> {
    const posts = await this.service.getRecentPosts();

    res.sendResponse({
      data: { posts },
    });
  }

  /**
   * Like the post
   * @POST api/post/like
   * @access private
   */
  async like(req: Request, res: Response): Promise<void> {
    const user = req.user as IUserModel;
    const { post_id } = req.body;

    await this.service.likePost(post_id, user._id);

    res.sendResponse({
      data: {},
      message: 'Successful liked',
    });
  }

  /**
   * Dislike the post
   * @POST api/post/dislike
   * @access private
   */
  async dislike(req: Request, res: Response): Promise<void> {
    const { post_id } = req.body;
    const user = req.user as IUserModel;

    await this.service.dislikePost(post_id, user._id);

    res.sendResponse({
      data: {},
      message: 'Successful disliked',
    });
  }
}
