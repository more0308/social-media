import { HttpServer } from './http-server.js';
import mongoose from 'mongoose';
import { config } from './config/config.js';

(async () => {
  await mongoose.connect(config.db);
  await HttpServer.init();
})();
