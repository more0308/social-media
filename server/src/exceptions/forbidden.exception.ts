import { HttpException } from './http.exception.js';

export class ForbiddenException extends HttpException {
  message: string;

  constructor(message = 'Forbidden') {
    super(message, 403);
    this.message = message;
  }
}
