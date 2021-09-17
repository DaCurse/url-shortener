import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmNamingStrategy } from './src/config/typeorm-naming.strategy';

const inProd = process.env.NODE_ENV === 'production';
const dbPath = inProd ? process.env.DB_PATH : join(__dirname, 'data.sqlite');

const typeormConfig: ConnectionOptions = {
  type: 'sqlite',
  namingStrategy: new TypeOrmNamingStrategy(),
  entities: [join(__dirname, './**/*.entity.{js,ts}')],
  logging: true,
  database: dbPath,
  synchronize: !inProd,
  migrations: ['migrations/*.js'],
  cli: { migrationsDir: 'migrations' },
};

export default typeormConfig;
