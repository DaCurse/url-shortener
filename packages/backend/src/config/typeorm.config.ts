import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { TypeOrmNamingStrategy } from './typeorm-naming.strategy';

const baseConfig: TypeOrmModuleOptions = {
  namingStrategy: new TypeOrmNamingStrategy(),
  entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
  logging: true,
};

const productionConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH,
  synchronize: false,
};

const testConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  logging: false,
  synchronize: true,
};

const defaultConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.join(__dirname, '../../data.sqlite'),
  synchronize: true,
};

const selectedConfig =
  process.env.NODE_ENV === 'production'
    ? productionConfig
    : process.env.NODE_ENV === 'test'
    ? testConfig
    : defaultConfig;

export const typeormConfig = {
  ...baseConfig,
  ...selectedConfig,
} as TypeOrmModuleOptions;
