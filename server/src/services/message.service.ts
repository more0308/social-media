import { Model } from 'mongoose';
import { AbstractService } from './abstract.service.js';
import MessageModel, { IMessageModel } from '../db/models/message.model.js';

export class MessageService extends AbstractService {
  protected readonly model: Model<IMessageModel> = MessageModel;
}
