import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const originalResponse = exception.getResponse();

    let errorName = 'NOT_FOUND';
    if (typeof originalResponse === 'object') {
      errorName = originalResponse['error'].replace(/\s/g, '_').toUpperCase();
    }

    response.redirect(`/?error=${errorName}`);
  }
}
