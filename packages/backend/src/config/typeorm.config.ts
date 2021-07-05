import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { TypeOrmNamingStrategy } from './typeorm-naming.strategy';

const inProd = process.env.NODE_ENV === 'production';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: inProd ? process.env.DB_PATH : path.join('./data.sqlite'),
  namingStrategy: new TypeOrmNamingStrategy(),
  logging: true,
  entities: [path.join(__dirname, '../**/*.entity.js')],
  synchronize: !inProd,
};
