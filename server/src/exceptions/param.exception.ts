import { HttpException } from './http.exception.js';

export class ParamException extends HttpException {
  message: string;

  constructor(message = 'Missing parameters') {
    super(message, 400);
    this.message = message;
  }
}
