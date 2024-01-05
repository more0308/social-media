import { Model } from 'mongoose';
import { AbstractService } from './abstract.service.js';
import ChatModel, { IChatModel } from '../db/models/chat.model.js';

export class ChatService extends AbstractService {
  protected readonly model: Model<IChatModel> = ChatModel;

  /**
   * Get user's chats.
   * @param user - Current user ID.
   */
  public async list(user: string) {
    const chats = await this.model.find({ users: user }).populate('users');

    return chats.map((chat) => {
      chat.users = chat.users.filter((user) => user._id.toString() !== user._id);
      return chat;
    });
  }
}
