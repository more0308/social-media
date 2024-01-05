import { Socket as ISocket } from 'socket.io';
import { ISocketCommand } from '../../../interface/socketCommand.interface.js';
import { Socket } from '../../../enums/socket.enum.js';

export class StartedWritingCommand implements ISocketCommand {
  constructor(private socket: ISocket) {}

  execute({ chatId, isWrite }: { chatId: string; isWrite: string }): void {
    this.socket.broadcast.to(chatId).emit(Socket.STARTED_WRITING, isWrite);
  }
}
