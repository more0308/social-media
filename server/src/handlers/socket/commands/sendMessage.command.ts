import { Socket as ISocket } from 'socket.io';
import { ISocketCommand } from '../../../interface/socketCommand.interface.js';
import { Socket } from '../../../enums/socket.enum.js';

export class SendMessageCommand implements ISocketCommand {
  constructor(private socket: ISocket) {}

  execute({ chatId, message }: { chatId: string; message: string }): void {
    this.socket.broadcast.to(chatId).emit(Socket.NEW_MESSAGE, message);
  }
}
