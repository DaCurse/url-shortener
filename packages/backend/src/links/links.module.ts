import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksRepository } from './links.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LinksRepository])],
  controllers: [],
  providers: [],
})
export class LinkModule {}
