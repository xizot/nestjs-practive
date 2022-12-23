import { config } from 'dotenv';
config();
const dbConfig: Record<string, any> = {
  databaseConnection: process.env.DATABASE_CONNECTION || 'mysql',
  databaseHost: process.env.DATABASE_HOST,
  databasePort: parseInt(process.env.DATABASE_PORT) || 3306,
  databaseUsername: process.env.DATABASE_USERNAME,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_DB_NAME,
};

export default dbConfig;
