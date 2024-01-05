import { Request } from 'express';
import { Strategy } from 'passport';

export abstract class AbstractStrategy extends Strategy {
  protected verify: any;
  protected includeReq: boolean;

  abstract get name(): string;

  protected constructor(options: any = {}, verify: any) {
    super();

    switch (Boolean(options) && options.constructor) {
      case Function:
        this.verify = options;
        this.includeReq = false;

        break;
      case Object:
        this.verify = verify;
        this.includeReq = (options && options.includeRequest) || false;

        break;
      default:
        this.verify = verify;
        this.includeReq = false;
    }

    if (!this.verify) {
      throw new TypeError('Strategy requires a verify callback');
    }
  }

  abstract authenticate(req: Request, options: any): any;
}
