import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthException } from '../../exceptions/auth.exception.js';
import UserModel from '../../db/models/user.model.js';
import { AuthenticateService } from '../../services/authenticate.service.js';
import { config } from '../../config/config.js';

export class AuthenticateHttpHandler {
  protected readonly service: AuthenticateService = new AuthenticateService();

  /**
   * User authorization in the system
   * @POST api/auth/login
   * @access public
   */
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const userModel = await this.service.get({ email });

    if (userModel === null || !(await userModel.validPassword(password))) {
      return res.errorResponse(new AuthException());
    }

    const { ac_token, rf_token } = await this.service.authToken(userModel._id);

    res.cookie('_apprftoken', rf_token, config.cookie);

    res.sendResponse({
      data: {
        user: userModel,
        access_token: ac_token,
      },
    });
  }

  /**
   * User registration in the system
   * @POST api/auth/register
   * @access public
   */
  public async register(req: Request, res: Response): Promise<void> {
    const { email, password, name, login } = req.body;

    const candidate = await this.service.get({ email });

    if (candidate !== null) {
      return res.errorResponse(new AuthException('Email already exists'));
    }

    const hashPassword = await new UserModel().setHashPassword(password);
    const newUser = await this.service.create({
      name,
      email,
      password: hashPassword,
      login,
    });

    const { ac_token, rf_token } = await this.service.authToken(newUser._id);

    res.cookie('_apprftoken', rf_token, config.cookie);

    res.sendResponse({
      data: {
        user: newUser,
        access_token: ac_token,
      },
    });
  }

  /**
   * Refresh token update
   * @POST api/auth/token/refresh
   * @access public
   */
  public async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.signedCookies._apprftoken;

    if (!refreshToken) {
      return res.errorResponse(new AuthException());
    }

    const payload = jwt.verify(refreshToken, config.jwt.refreshSecret);
    if (typeof payload !== 'object' || payload === null) {
      return res.errorResponse(new AuthException());
    }

    const { id } = payload as JwtPayload;

    const userModel = await this.service.get({ _id: id });
    if (userModel === null) {
      return res.errorResponse(new AuthException());
    }

    const { ac_token, rf_token } = await this.service.authToken(userModel._id);

    res.cookie('_apprftoken', rf_token, config.cookie);

    res.sendResponse({
      data: {
        user: userModel,
        access_token: ac_token,
      },
    });
  }

  /**
   * Log out
   * @POST api/auth/logout
   * @access private
   */
  public async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('_apprftoken');

    res.sendResponse({
      data: {},
      message: 'Success logout',
    });
  }
}
