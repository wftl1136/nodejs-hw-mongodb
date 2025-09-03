import dotenv from 'dotenv';
import { getEnvVariable } from './utils/getEnvVariable.js';

dotenv.config();

export const config = {
port: Number(getEnvVariable('PORT', 3000)),
db: {
  user: getEnvVariable('MONGODB_USER'),
  pass: getEnvVariable('MONGODB_PASSWORD'),
  url: getEnvVariable('MONGODB_URL'),
  name: getEnvVariable('MONGODB_DB'),
}
};

export const MONGODB_URI = `mongodb+srv://${config.db.user}:${config.db.pass}@${config.db.url}/${config.db.name}?retryWrites=true&w=majority`;