import { Module } from '@nestjs/common';
import { LinkModule } from '../link/link.module';
import { LinkService } from '../link/link.service';
import { RedirectController } from './redirect.controller';

@Module({
  imports: [LinkModule],
  controllers: [RedirectController],
  providers: [LinkService],
})
export class RedirectModule {}
