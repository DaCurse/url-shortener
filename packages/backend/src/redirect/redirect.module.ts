import { Module } from '@nestjs/common';
import { LinkModule } from '../link/link.module';
import { LinkService } from '../link/link.service';

@Module({
  imports: [LinkModule],
  controllers: [],
  providers: [LinkService],
})
export class RedirectModule {}
