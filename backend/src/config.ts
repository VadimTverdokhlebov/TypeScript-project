import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: string,
  host: string,
  databaseURL: string,
  databaseUser: string,
  databasePassword: string,
  user: {
    secretKey: string,
  },
}

const config: IConfig = {

  port: process.env.PORT!,
  host: process.env.HOST!,
  databaseURL: process.env.DATABASE_URI!,
  databaseUser: process.env.DATABASE_USER!,
  databasePassword: process.env.DATABASE_PASSWORD!,
  user: {
    secretKey: process.env.SECRET_KEY!,
  },
};

export default config;
