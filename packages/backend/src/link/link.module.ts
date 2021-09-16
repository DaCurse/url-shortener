import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { throttlerConfig } from '../config/throttler.config';
import { LinkController } from './link.controller';
import { Link } from './link.entity';
import { LinkService } from './link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    ThrottlerModule.forRoot(throttlerConfig),
  ],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [TypeOrmModule, LinkService],
})
export class LinkModule {}
