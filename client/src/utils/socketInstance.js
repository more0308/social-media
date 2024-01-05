import { io } from 'socket.io-client';

const socketClient = io('http://localhost:3001');

export { socketClient };