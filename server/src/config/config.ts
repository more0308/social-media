import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL,
  db: process.env.DB || '',
  jwt: {
    refreshSecret: process.env.REFRESH_SECRET || 'refreshSecret',
    refreshExpiration: process.env.REFRESH_EXPIRATION || '7days',
    accessSecret: process.env.ACCESS_SECRET || 'testAccessSecret321',
    accessExpiration: process.env.ACCESS_EXPIRATION || '30m',
  },
  cookie: {
    maxAge: 2592000000,
    httpOnly: true,
    signed: true,
    secure: false,
  },
  cloudinaryAPI: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  },
};
