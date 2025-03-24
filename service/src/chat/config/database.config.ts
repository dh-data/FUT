import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '129.204.15.249',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 65432,
  username: process.env.DB_USERNAME || 'daheng',
  password: process.env.DB_PASSWORD || 'daheng@2016Y',
  database: process.env.DB_DATABASE || 'daheng',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  retryAttempts: 10,
  retryDelay: 3000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};