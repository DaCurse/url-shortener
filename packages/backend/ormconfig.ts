import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmNamingStrategy } from './src/config/typeorm-naming.strategy';

const inProd = process.env.NODE_ENV === 'production';
const inTest = process.env.NODE_ENV === 'test';
const dbPath = inProd ? process.env.DB_PATH : join(__dirname, 'data.sqlite');

const baseConfig: Partial<ConnectionOptions> = {
  type: 'sqlite',
  namingStrategy: new TypeOrmNamingStrategy(),
  entities: [join(__dirname, './**/*.entity.{js,ts}')],
  logging: true,
  synchronize: !inProd,
};

const restConfig: Partial<ConnectionOptions> = inTest
  ? {
      database: ':memory:',
      logging: false,
    }
  : {
      database: dbPath,
      migrations: ['migrations/*.js'],
      cli: { migrationsDir: 'migrations' },
    };

export default {
  ...baseConfig,
  ...restConfig,
} as ConnectionOptions;
