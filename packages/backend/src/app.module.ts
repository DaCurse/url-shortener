import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { LinkModule } from './link/link.module';
import { StaticMiddleware } from './middleware/static.middleware';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), LinkModule, RedirectModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StaticMiddleware)
      .exclude('link/(.*)')
      .forRoutes({ path: '/*', method: RequestMethod.GET });
  }
}
