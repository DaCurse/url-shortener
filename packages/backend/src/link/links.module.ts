import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkRepository } from './link.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LinkRepository])],
  controllers: [],
  providers: [],
})
export class LinkModule {}
