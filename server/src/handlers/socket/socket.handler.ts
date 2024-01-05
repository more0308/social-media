import { Server as SocketIOServer, Socket as ISocket } from 'socket.io';
import { CommandFactory } from './command.factory.js';
import { Socket } from '../../enums/socket.enum.js';

export class SocketHandler {
  constructor(private io: SocketIOServer) {
    this.setupSocketIO();
  }

  private setupSocketIO(): void {
    this.io.on('connection', (socket: ISocket) => {
      socket.on(Socket.JOIN_CHAT, (data) => {
        const command = CommandFactory.createCommand(Socket.JOIN_CHAT, socket);
        command.execute(data);
      });

      socket.on(Socket.SEND_MESSAGE, (data) => {
        const command = CommandFactory.createCommand(Socket.SEND_MESSAGE, socket);
        command.execute(data);
      });

      socket.on(Socket.STARTED_WRITING, (data) => {
        const command = CommandFactory.createCommand(Socket.STARTED_WRITING, socket);
        command.execute(data);
      });
    });
  }
}
