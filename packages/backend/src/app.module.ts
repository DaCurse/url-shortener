import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { LinkModule } from './link/link.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), LinkModule, RedirectModule],
})
export class AppModule {}
