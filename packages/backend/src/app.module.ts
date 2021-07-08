import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { LinkModule } from './link/link.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), LinkModule],
})
export class AppModule {}
