import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { LinksModule } from './links/links.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), LinksModule],
})
export class AppModule {}
