import { Request, Response } from 'express';
import { IUserModel } from '../../db/models/user.model.js';
import { ChatService } from '../../services/chat.service.js';

export class ChatHttpHandler {
  protected readonly service: ChatService = new ChatService();

  /**
   * Get the chat ID for the user
   * @GET api/chat/user/:id
   * @access private
   */
  async get(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = req.user as IUserModel;

    const users = [user._id, id];

    let chat = await this.service.get({ users });

    if (!chat) {
      chat = await this.service.create({ users });
    }

    res.sendResponse({
      data: { chat_id: chat._id },
    });
  }

  /**
   * Get a list of chats
   * @GET api/chat
   * @access private
   */
  async list(req: Request, res: Response): Promise<void> {
    const user = req.user as IUserModel;

    const chats = await this.service.list(user._id);

    res.sendResponse({
      data: { chats },
    });
  }
}
