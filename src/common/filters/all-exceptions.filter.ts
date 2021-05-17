import { Catch, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const mongoBadRequestCodes = [11000];

    if (mongoBadRequestCodes.includes(exception?.code)) {
      // @ts-ignore
      return response.status(400).json({
        message: `${Object.keys(exception.keyValue).reduce((acc, cur) => {
          return acc + ` ${cur}: ${exception.keyValue[cur]}`;
        }, '')} already exist`,
      });
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'ExceptionFilter',
      );
    }
    super.catch(exception, host);
  }
}
