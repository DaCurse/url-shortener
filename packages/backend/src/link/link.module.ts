import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkController } from './link.controller';
import { Link } from './link.entity';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [TypeOrmModule, LinkService],
})
export class LinkModule {}
