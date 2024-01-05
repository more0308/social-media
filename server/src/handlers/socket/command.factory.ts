import { Socket as ISocket } from 'socket.io';
import { JoinChatCommand } from './commands/joinChat.command.js';
import { SendMessageCommand } from './commands/sendMessage.command.js';
import { Socket } from '../../enums/socket.enum.js';
import { ISocketCommand } from '../../interface/socketCommand.interface.js';
import { StartedWritingCommand } from './commands/startedWriting.command.js';

export class CommandFactory {
  static createCommand(commandName: string, socket: ISocket): ISocketCommand {
    switch (commandName) {
      case Socket.JOIN_CHAT:
        return new JoinChatCommand(socket);
      case Socket.SEND_MESSAGE:
        return new SendMessageCommand(socket);
      case Socket.STARTED_WRITING:
        return new StartedWritingCommand(socket);
      default:
        throw new Error('Unknown command');
    }
  }
}
