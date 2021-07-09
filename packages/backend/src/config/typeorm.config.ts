import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { TypeOrmNamingStrategy } from './typeorm-naming.strategy';

const productionConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH,
  namingStrategy: new TypeOrmNamingStrategy(),
  logging: true,
  entities: [path.join(__dirname, '../**/*.entity.js')],
  synchronize: false,
};

const testConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  namingStrategy: new TypeOrmNamingStrategy(),
  entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
  synchronize: true,
};

const defaultConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.join(__dirname, '../../data.sqlite'),
  namingStrategy: new TypeOrmNamingStrategy(),
  logging: true,
  entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
  synchronize: true,
};

export const typeormConfig =
  process.env.NODE_ENV === 'production'
    ? productionConfig
    : process.env.NODE_ENV === 'test'
    ? testConfig
    : defaultConfig;
