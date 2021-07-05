import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksController } from './links.controller';
import { LinksRepository } from './links.repository';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinksRepository])],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinkModule {}
