import jwt from 'jsonwebtoken';
import httpError from 'http-errors';
import { config } from '../config/config.js';
import { AbstractService } from './abstract.service.js';
import { Model } from 'mongoose';
import UserModel, { IUserModel } from '../db/models/user.model.js';
export class AuthenticateService extends AbstractService {
  protected readonly model: Model<IUserModel> = UserModel;

  /**
   * Generate token
   * @param {object} payload - Data to be encrypted
   * @param {string} secretSignature - The secret key
   * @param {string} tokenLife - Amount of time before token deactivation
   */
  public generateToken = (payload: object, secretSignature: string, tokenLife: string) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretSignature, { expiresIn: tokenLife }, (error, token) => {
        if (error) {
          return reject(httpError.Unauthorized(error.message));
        }

        resolve(token);
      });
    });
  };

  /**
   * Generate refresh token
   * @param {string} userId
   * @returns Promise<token>
   */
  public async refreshToken(userId: string) {
    return this.generateToken({ id: userId }, config.jwt.refreshSecret, config.jwt.refreshExpiration);
  }

  /**
   * Generate access token
   * @param {string} userId
   * @returns Promise<token>
   */
  public async accessToken(userId: string) {
    return this.generateToken({ id: userId }, config.jwt.accessSecret, config.jwt.accessExpiration);
  }

  /**
   * Generate auth token
   * @param {string} userId
   * @returns Promise<tokens>
   */
  public async authToken(userId: string) {
    const [ac_token, rf_token] = await Promise.all([this.accessToken(userId), this.refreshToken(userId)]);
    return {
      ac_token,
      rf_token,
    };
  }
}
