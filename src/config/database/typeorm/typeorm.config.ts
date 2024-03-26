import { DataSource } from 'typeorm';
require('dotenv').config();

const migrationPath = __filename.endsWith('.ts')
  ? './src/database/migrations/*'
  : './build/database/migrations/*';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  synchronize: process.env.NODE_ENV === 'development',
  migrations: [migrationPath],
});
