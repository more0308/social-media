import { Socket } from 'socket.io';
import { ISocketCommand } from '../../../interface/socketCommand.interface.js';

export class JoinChatCommand implements ISocketCommand {
  constructor(private socket: Socket) {}

  execute(chatId: string): void {
    this.socket.join(chatId);
  }
}
