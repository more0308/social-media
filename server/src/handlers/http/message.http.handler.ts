import { Request, Response } from 'express';
import { IUserModel } from '../../db/models/user.model.js';
import { MessageService } from '../../services/message.service.js';

export class MessageHttpHandler {
  protected readonly service: MessageService = new MessageService();

  /**
   * Create a message
   * @POST api/message
   * @access private
   */
  async create(req: Request, res: Response): Promise<void> {
    const { text, chat } = req.body;
    const user = req.user as IUserModel;

    const message = await this.service.create({
      sender: user._id,
      chat,
      text,
    });

    res.sendResponse({
      data: { message },
    });
  }

  /**
   * Receive all message for chat
   * @GET api/chat/:id
   * @access private
   */
  async list(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const messages = await this.service.list({ chat: id });

    res.sendResponse({
      data: { messages: messages.docs },
    });
  }
}
