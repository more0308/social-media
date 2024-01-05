import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';
import express, { NextFunction, Request, Response, Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';

import apiRouter from './routes/api.route.js';
import { HttpException } from './exceptions/http.exception.js';
import { bearerStrategyHandler } from './strategies/bearer.strategy.js';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import { SocketHandler } from './handlers/socket/socket.handler.js';

declare global {
  namespace Express {
    export interface Request {
      _startTime?: number;
      _id?: string;
    }
    export interface Response {
      sendResponse(data: ISuccessResponse): void;
      errorResponse(err: HttpException): void;
    }
  }

  export interface Error {
    status?: number;
  }
}

interface ISuccessResponse {
  status?: number;
  data: any;
  message?: string;
}

export class HttpServer {
  private static app: Application;
  private static httpServer: HTTPServer;
  private static io: SocketIOServer;
  public static async init(): Promise<void> {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.app.set('trust proxy', true);
    passport.use(bearerStrategyHandler());
    this.setupSocketIO();
    this.useCors();
    this.useRequestParsers();
    this.setSendResponse();
    this.useRequestTrace();
    this.useResponseTrace();
    this.useRoutes();
    await new Promise<void>((res): void => {
      this.httpServer.listen(config.port, (): void => {
        console.log(`App listening on port: ${config.port}!`);
        res();
      });
    });
  }

  private static setupSocketIO(): void {
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: config.client_url,
        methods: ['GET', 'POST'],
      },
    });

    new SocketHandler(this.io);
  }

  private static useCors(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Max-Age', '600');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
      res.header('Access-Control-Expose-Headers', 'content-type, authorization, x-request-id');

      switch (req.method) {
        case 'OPTIONS':
          return res.json({ status: true, data: {} });
        case 'GET':
        case 'PUT':
        case 'POST':
        case 'DELETE':
          return next();
        default:
          return res.status(405).json({ status: false, error: 'req_type' });
      }
    });
  }

  private static useRequestParsers(): void {
    this.app.use(passport.initialize());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(config.jwt.refreshSecret));
  }

  private static useRequestTrace(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      req._startTime = Date.now();
      req._id = uuidv4();
      res.setHeader('X-Request-Id', req._id);
      console.log(req._id, 'REQUEST', 'method:', req.method, 'uri:', req.url, 'body:', req.body, 'query:', req.query);
      next();
    });
  }

  private static useResponseTrace(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const { json } = res;
      res.json = (body: any): any => {
        console.log(
          req._id,
          'RESPONSE',
          'has been processed with code:',
          res.statusCode,
          'body:',
          JSON.stringify(body),
        );

        json.apply(res, [body]);
      };
      next();
    });
  }

  private static setSendResponse(): void {
    this.app.use((req, res, next) => {
      res.sendResponse = ({ status = 200, data, message }: ISuccessResponse) => {
        return res.status(status).json({
          status: true,
          data: data,
          message: message,
        });
      };
      res.errorResponse = (err: HttpException) => {
        next(err);
      };
      next();
    });
  }

  private static useRoutes(): void {
    this.app.use('/api', apiRouter);

    this.app.use(() => {
      throw new HttpException('Not Found', 404);
    });

    this.app.use((err: HttpException | Error, req: Request, res: Response, _next: NextFunction) => {
      return res.status(err?.status ?? 500).json({
        status: false,
        data: {},
        message: err.message,
      });
    });
  }
}
